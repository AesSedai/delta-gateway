import { makeExecutableSchema } from "@graphql-tools/schema"
import deepdash from "deepdash"
import { BREAK, DocumentNode, GraphQLError, Kind, SelectionSetNode, VariableDefinitionNode, visit } from "graphql"
import { ExecutionResult } from "graphql-ws"
import hasha from "hasha"
import lodash from "lodash"
import { DateTime } from "luxon"
import { instance } from "../../utils/jsondiffpatch"
import { hasuraSchema as rawHasuraSchema, httpExecutor, wsExecutor } from "../hasura/schema"
import { LiveSubscription } from "./graphql"

const _ = deepdash(lodash)
const history_var = "history__ts"

export const schema = makeExecutableSchema({
    typeDefs: [
        rawHasuraSchema,
        /* GraphQL */ `
            schema {
                subscription: Subscription
            }

            type delta {
                lastUpdated: timestamptz!
                patch: String!
                hash: String!
            }

            type LiveSubscription {
                id: String!
                query: subscription_root
                delta(lastUpdated: timestamptz): delta!
            }

            type Subscription {
                live: LiveSubscription!
            }
        `
    ],
    resolvers: {
        Subscription: {
            live: {
                subscribe: async function* (obj, args, context, info) {
                    let selectionSet: SelectionSetNode = {
                        kind: "SelectionSet",
                        selections: []
                    }

                    // find the `query` key in the AST and pluck out the selectionSet to forward to hasura
                    visit(info.operation, {
                        Field(node) {
                            if (node.name.value === "query") {
                                if (node.selectionSet != null) {
                                    selectionSet = node.selectionSet
                                    if (selectionSet.selections.length > 1) {
                                        // has __typename been automatically added? Bad apollo client.
                                        selectionSet.selections = [selectionSet.selections[0]]
                                    }
                                }
                                return BREAK
                            }
                        }
                    })

                    const selectionPaths: (string | number)[][] = []

                    const historySelection = visit(_.cloneDeep(selectionSet), {
                        SelectionSet: {
                            enter(node, key, parent, path, ancestors) {
                                selectionPaths.push([...path].slice(0, -1))
                            }
                        },
                        Name: {
                            enter(node, key, parent, path, ancestors) {
                                // rewrite name for first field to be "history_${name}"
                                if (_.isEqual(path, ["selections", 0, "name"])) {
                                    return {
                                        ...node,
                                        value: `history_${node.value}`
                                    }
                                }
                            }
                        }
                    })

                    let whereConstruct = {
                        kind: "Argument",
                        name: {
                            kind: "Name",
                            value: "where"
                        },
                        value: {
                            kind: "ObjectValue",
                            fields: [
                                {
                                    kind: "ObjectField",
                                    name: {
                                        kind: "Name",
                                        value: "valid_from"
                                    },
                                    value: {
                                        kind: "ObjectValue",
                                        fields: [
                                            {
                                                kind: "ObjectField",
                                                name: {
                                                    kind: "Name",
                                                    value: "_lte"
                                                },
                                                value: {
                                                    kind: "Variable",
                                                    name: {
                                                        kind: "Name",
                                                        value: history_var
                                                    }
                                                }
                                            }
                                        ]
                                    }
                                },
                                {
                                    kind: "ObjectField",
                                    name: {
                                        kind: "Name",
                                        value: "_or"
                                    },
                                    value: {
                                        kind: "ListValue",
                                        values: [
                                            {
                                                kind: "ObjectValue",
                                                fields: [
                                                    {
                                                        kind: "ObjectField",
                                                        name: {
                                                            kind: "Name",
                                                            value: "valid_to"
                                                        },
                                                        value: {
                                                            kind: "ObjectValue",
                                                            fields: [
                                                                {
                                                                    kind: "ObjectField",
                                                                    name: {
                                                                        kind: "Name",
                                                                        value: "_is_null"
                                                                    },
                                                                    value: {
                                                                        kind: "BooleanValue",
                                                                        value: true
                                                                    }
                                                                }
                                                            ]
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                kind: "ObjectValue",
                                                fields: [
                                                    {
                                                        kind: "ObjectField",
                                                        name: {
                                                            kind: "Name",
                                                            value: "valid_to"
                                                        },
                                                        value: {
                                                            kind: "ObjectValue",
                                                            fields: [
                                                                {
                                                                    kind: "ObjectField",
                                                                    name: {
                                                                        kind: "Name",
                                                                        value: "_gt"
                                                                    },
                                                                    value: {
                                                                        kind: "Variable",
                                                                        name: {
                                                                            kind: "Name",
                                                                            value: history_var
                                                                        }
                                                                    }
                                                                }
                                                            ]
                                                        }
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                }
                            ]
                        }
                    }

                    selectionPaths.forEach((path) => {
                        if (path.length > 0) {
                            const selections = _.get(historySelection, path)
                            selections.arguments.push(whereConstruct)
                        }
                    })

                    // console.log("updated by", JSON.stringify(info.operation.variableDefinitions, null, 2))
                    // remove our lastUpdated var, keep the remaining ones
                    const varDefs = (info.operation.variableDefinitions || []).filter((def) => {
                        return def.variable.name.value !== "lastUpdated"
                    })

                    const historyVarDefs: VariableDefinitionNode = {
                        kind: "VariableDefinition",
                        variable: {
                            kind: "Variable",
                            name: {
                                kind: "Name",
                                value: history_var
                            }
                        },
                        type: {
                            kind: "NonNullType",
                            type: {
                                kind: "NamedType",
                                name: {
                                    kind: "Name",
                                    value: "timestamptz"
                                }
                            }
                        },
                        directives: []
                    }

                    // construct subscription document to forward
                    const op: DocumentNode = {
                        kind: Kind.DOCUMENT,
                        definitions: [
                            {
                                kind: Kind.OPERATION_DEFINITION,
                                operation: "subscription",
                                variableDefinitions: varDefs, //info.operation.variableDefinitions,
                                selectionSet: selectionSet
                            }
                        ]
                    }

                    const historyOp: DocumentNode = {
                        kind: Kind.DOCUMENT,
                        definitions: [
                            {
                                kind: Kind.OPERATION_DEFINITION,
                                operation: "query",
                                variableDefinitions: varDefs.concat([historyVarDefs]), //info.operation.variableDefinitions,
                                selectionSet: historySelection
                            }
                        ]
                    }

                    // initialize rev + docHash (todo: accept rev variable?)
                    let latest = "2022-01-01T00:00:00.000000+00:00"
                    if (info.variableValues.lastUpdated != null) {
                        latest = info.variableValues.lastUpdated
                    }
                    const docHash = hasha(JSON.stringify(info.operation), { algorithm: "md5" })
                    const varValues = _.omit(info.variableValues, "lastUpdated")

                    try {
                        const iterable = await wsExecutor({
                            document: op,
                            variables: varValues //info.variableValues
                        })

                        for await (const result of iterable as AsyncIterable<ExecutionResult>) {
                            if (result.errors != null) {
                                console.log("result error", result.errors)
                                throw result.errors[0]
                            } else {
                                const history = await httpExecutor({
                                    document: historyOp,
                                    variables: { ...varValues, [history_var]: latest }
                                })

                                const renamedKeys = _.mapKeysDeep(history, (value, key) => {
                                    return typeof key === "string" ? key.replace("history_", "") : key
                                })

                                const renamedTypes = _.mapValuesDeep(renamedKeys, (value, key) => {
                                    if (key === "__typename" && typeof value === "string") {
                                        return value.replace("history_", "")
                                    } else {
                                        return value
                                    }
                                })

                                const source = latest == "2022-01-01T00:00:00.000000+00:00" ? {} : renamedTypes.data
                                const patch = instance.diff(source, result.data)

                                if (patch != null) {
                                    // find newest updatedAt
                                    const oldLatest = latest
                                    latest = _.reduceDeep(
                                        result.data,
                                        (acc, value, key, parent, ctx) => {
                                            if (key === "updated_at" && value > acc) return value
                                            return acc
                                        },
                                        latest
                                    )

                                    // the entire set has been deleted, so we need to give latest a tiny "bump" to prevent
                                    // re-sending the delete-all patch
                                    if (oldLatest === latest) {
                                        latest = DateTime.now().plus(1).toISO()
                                    }

                                    let ret: LiveSubscription = {
                                        id: docHash,
                                        __typename: "LiveSubscription",
                                        // query: instance.patch(_.cloneDeep(source), patch),
                                        delta: {
                                            __typename: "delta",
                                            lastUpdated: latest,
                                            patch: JSON.stringify(patch),
                                            hash: ""
                                        }
                                    }

                                    yield {
                                        live: ret
                                    }
                                }
                            }
                        }
                    } catch (err) {
                        if (err instanceof Error) {
                            throw new GraphQLError(err.message)
                        } else {
                            throw err
                        }
                    }
                }
            }
        }
    }
})
