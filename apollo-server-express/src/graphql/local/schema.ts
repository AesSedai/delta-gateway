import { makeExecutableSchema } from "@graphql-tools/schema"
import { IResolvers } from "@graphql-tools/utils"
import deepdash from "deepdash"
import {
    BREAK,
    DocumentNode,
    GraphQLError,
    isCompositeType,
    Kind,
    SelectionSetNode,
    TypeInfo,
    VariableDefinitionNode,
    visit,
    visitWithTypeInfo
} from "graphql"
import { ExecutionResult } from "graphql-ws"
import hasha from "hasha"
import lodash from "lodash"
import { DateTime } from "luxon"
import { instance } from "../../utils/jsondiffpatch"
import { hasuraGraphQLSchemaAdmin, hasuraGraphQLSchemaUser, httpExecutor, wsExecutor } from "../hasura/schema"
import { LiveSubscription } from "./graphql"

const _ = deepdash(lodash)
const history_var = "history__ts"

const resolvers: IResolvers = {
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

                // ugly way to inject the `value_from` and `value_to` clauses for history schema query
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

                // The history schema has to be all array relations, but the original schema can include object relations
                // So, we need to compare the incoming query to the history query using the full hasura schema
                // to identify what history query return values are arrays that need to be objects
                const hasuraTypeInfo = new TypeInfo(info.schema)
                const hasuraTypesMap: any = {}
                visit(
                    op,
                    visitWithTypeInfo(hasuraTypeInfo, {
                        enter(node, key, parent, path, ancestors) {
                            hasuraTypeInfo.enter(node)
                        },
                        leave(node, key, parent, path, ancestors) {
                            hasuraTypeInfo.leave(node)
                        },
                        SelectionSet: {
                            enter(node, key, parent, path, ancestors) {
                                const type = hasuraTypeInfo.getType()
                                if (
                                    type != null &&
                                    !isCompositeType(type) &&
                                    parent != null &&
                                    parent.hasOwnProperty("name")
                                ) {
                                    // we've guaranteed that the "name" property is available, ts is just unhappy
                                    // @ts-expect-error
                                    let modified = parent.name.value
                                    let jsType = modified

                                    const joinedPath = path.join(" ")
                                    if (type.toString().includes("[")) {
                                        jsType = `${jsType}[]`
                                    }

                                    // there's got to be a better way to do this, but this works for now
                                    const longestMatch = Object.keys(hasuraTypesMap).reduce((acc, key) => {
                                        if (key.length >= acc.length && joinedPath.includes(key)) {
                                            acc = key
                                        }
                                        return acc
                                    }, "")

                                    hasuraTypesMap[joinedPath] = {
                                        type: modified,
                                        jsType:
                                            longestMatch.length > 0
                                                ? `${hasuraTypesMap[longestMatch].jsType}.${jsType}`
                                                : jsType
                                    }
                                }
                            }
                        }
                    })
                )

                const historyTypesMap: any = {}
                visit(
                    historyOp,
                    visitWithTypeInfo(hasuraTypeInfo, {
                        enter(node, key, parent, path, ancestors) {
                            hasuraTypeInfo.enter(node)
                        },
                        leave(node, key, parent, path, ancestors) {
                            hasuraTypeInfo.leave(node)
                        },
                        SelectionSet: {
                            enter(node, key, parent, path, ancestors) {
                                const type = hasuraTypeInfo.getType()
                                if (
                                    type != null &&
                                    !isCompositeType(type) &&
                                    parent != null &&
                                    parent.hasOwnProperty("name")
                                ) {
                                    // we've guaranteed that the "name" property is available, ts is just unhappy
                                    // @ts-expect-error
                                    let modified = parent.name.value.replace("history_", "")
                                    let jsType = modified

                                    const joinedPath = path.join(" ")
                                    if (type.toString().includes("[")) {
                                        jsType = `${jsType}[]`
                                    }

                                    // there's got to be a better way to do this, but this works for now
                                    const longestMatch = Object.keys(historyTypesMap).reduce((acc, key) => {
                                        if (key.length >= acc.length && joinedPath.includes(key)) {
                                            acc = key
                                        }
                                        return acc
                                    }, "")

                                    historyTypesMap[joinedPath] = {
                                        type: modified,
                                        jsType:
                                            longestMatch.length > 0
                                                ? `${historyTypesMap[longestMatch].jsType}.${jsType}`
                                                : jsType
                                    }
                                }
                            }
                        }
                    })
                )

                // Collect the differences between the two
                const diffs = _.reduce(
                    hasuraTypesMap,
                    function (result, value, key) {
                        return _.isEqual(value, historyTypesMap[key]) ? result : result.concat(value.jsType)
                    },
                    [] as string[]
                )

                // initialize latest
                let latest = "2022-01-01T00:00:00.000000+00:00"
                if (info.variableValues.lastUpdated != null) {
                    latest = info.variableValues.lastUpdated
                }
                const docHash = hasha(JSON.stringify(info.operation), { algorithm: "md5" })
                const varValues = _.omit(info.variableValues, "lastUpdated")

                try {
                    const iterable = await wsExecutor({
                        document: op,
                        variables: varValues, //info.variableValues
                        context: context
                    })

                    for await (const result of iterable as AsyncIterable<ExecutionResult>) {
                        if (result.errors != null) {
                            console.log("result error", result.errors)
                            throw result.errors[0]
                        } else {
                            const history = (await httpExecutor({
                                document: historyOp,
                                variables: { ...varValues, [history_var]: latest },
                                context: context
                            })) as ExecutionResult

                            if (history.data != null) {
                                const renamedKeys = _.mapKeysDeep(history.data, (value, key) => {
                                    return typeof key === "string" ? key.replace("history_", "") : key
                                })

                                // Rename the default __typename properties from the history schema to remove "history_xyz" prepend
                                // Also, do object / array replacement to match the incoming query format
                                const renamedTypes = _.mapValuesDeep(renamedKeys, (value, key, parent, context) => {
                                    if (key === "__typename" && typeof value === "string") {
                                        value = value.replace("history_", "")
                                    }

                                    if (diffs.length > 0 && context != null && context.path != null) {
                                        let path = ""
                                        if (_.isArray(context.path)) {
                                            path = context.path.join("").replaceAll(/\[\d+\]/gm, "[]")
                                        } else {
                                            path = context.path.replaceAll(/\[\d+\]/gm, "[]")
                                        }
                                        if (diffs.includes(path)) {
                                            // length should either be 0 (empty relation) or 1 (populated relation)
                                            if (value.length > 0) {
                                                if (value[0].hasOwnProperty("__typename")) {
                                                    value[0].__typename = value[0].__typename.replace("history_", "")
                                                }
                                                return value[0]
                                            } else {
                                                return null
                                            }
                                        }
                                    }
                                    return value
                                })

                                const source = latest == "2022-01-01T00:00:00.000000+00:00" ? {} : renamedTypes
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

export const localSchemaAdmin = makeExecutableSchema({
    typeDefs: [
        hasuraGraphQLSchemaAdmin,
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
    resolvers: resolvers
})

export const localSchemaUser = makeExecutableSchema({
    typeDefs: [
        hasuraGraphQLSchemaUser,
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
    resolvers: resolvers
})