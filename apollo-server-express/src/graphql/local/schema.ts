import { makeExecutableSchema } from "@graphql-tools/schema"
import deepdash from "deepdash"
import { BREAK, DocumentNode, GraphQLError, Kind, SelectionSetNode, visit } from "graphql"
import { ExecutionResult } from "graphql-ws"
import hasha from "hasha"
import lodash from "lodash"
import { sdk } from "../../utils/gqlClient"
import { instance } from "../../utils/jsondiffpatch"
import { hasuraSchema as rawHasuraSchema, wsExecutor } from "../hasura/schema"
import { LiveSubscription } from "./graphql"

const _ = deepdash(lodash)

const cache: any = {}

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

                    // console.log("updated by", JSON.stringify(info.operation.variableDefinitions, null, 2))
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

                    // console.log("op", JSON.stringify(op, null, 2))
                    // console.log("doc", print(op))

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
                                const history = await sdk.getAuthorHistory({
                                    ts: latest,
                                    limit: info.variableValues.limit
                                })

                                console.log("data", JSON.stringify(result.data, null, 2))

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

                                console.log("history", JSON.stringify(renamedTypes, null, 2))

                                const key = `${docHash}:${latest}`
                                const source = cache[key] == null ? {} : cache[key]
                                console.log("source", source)
                                const patch = instance.diff(source, result.data)

                                // console.log("result data", result.data)
                                if (patch != null) {
                                    // find newest updatedAt
                                    latest = _.reduceDeep(
                                        result.data,
                                        (acc, value, key, parent, ctx) => {
                                            if (key === "updated_at" && value > acc) return value
                                            return acc
                                        },
                                        latest
                                    )

                                    // persist result to db
                                    const response = await sdk.insertCache({
                                        result: {
                                            lastUpdated: latest,
                                            query: docHash,
                                            result: result.data,
                                            patch: patch
                                        }
                                    })

                                    const key = `${docHash}:${latest}`
                                    cache[key] = result.data

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
