import { makeExecutableSchema } from "@graphql-tools/schema"
import { IResolvers } from "@graphql-tools/utils"
import deepdash from "deepdash"
import { BREAK, DocumentNode, GraphQLError, Kind, SelectionSetNode, visit } from "graphql"
import { ExecutionResult } from "graphql-ws"
import hasha from "hasha"
import lodash from "lodash"
import { DateTime } from "luxon"
import { instance } from "../../utils/jsondiffpatch"
import { hasuraGraphQLSchemaAdmin, hasuraGraphQLSchemaUser, httpExecutor, wsExecutor } from "../hasura/schema"
import { LiveSubscription } from "./graphql"

const _ = deepdash(lodash)

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

                const historySelection = _.cloneDeep(selectionSet)
                // @ts-expect-error
                historySelection.selections[0].name.value = `history_${historySelection.selections[0].name.value}`

                // remove our lastUpdated var, keep the remaining ones
                const varDefs = (info.operation.variableDefinitions || []).filter((def) => {
                    return def.variable.name.value !== "lastUpdated"
                })

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

                // construct history document to forward
                const historyOp: DocumentNode = {
                    kind: Kind.DOCUMENT,
                    definitions: [
                        {
                            kind: Kind.OPERATION_DEFINITION,
                            operation: "query",
                            variableDefinitions: varDefs, //info.operation.variableDefinitions,
                            selectionSet: historySelection
                        }
                    ]
                }

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
                            // add our timestamp to the query headers
                            // also, make sure our role is correct since `admin` role has no permission restrictions
                            const timestampContext = context
                            if (context.hasOwnProperty("headers")) {
                                context.headers["x-hasura-timestamp"] = latest
                                context.headers["x-hasura-role"] = "user"
                            } else if (
                                context.hasOwnProperty("connectionParams") &&
                                context.connectionParams.hasOwnProperty("headers")
                            ) {
                                context.connectionParams.headers["x-hasura-timestamp"] = latest
                                context.connectionParams.headers["x-hasura-role"] = "user"
                            }

                            const history = (await httpExecutor({
                                document: historyOp,
                                variables: varValues,
                                context: timestampContext
                            })) as ExecutionResult

                            if (history.data != null) {
                                const renamedKeys = _.mapKeysDeep(history.data, (value, key) => {
                                    return typeof key === "string" ? key.replace("history_", "") : key
                                })

                                // Rename the default __typename properties from the history schema to remove "history_xyz" prepend
                                const renamedTypes = _.mapValuesDeep(renamedKeys, (value, key, parent, context) => {
                                    if (key === "__typename" && typeof value === "string") {
                                        return value.replace("history_", "")
                                    } else {
                                        return value
                                    }
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
