import { makeExecutableSchema } from "@graphql-tools/schema"
import { BREAK, DocumentNode, GraphQLError, Kind, SelectionSetNode, visit } from "graphql"
import { ExecutionResult } from "graphql-ws"
import hasha from "hasha"
import _ from "lodash"
import { instance } from "../../utils/jsondiffpatch"
import { hasuraSchema as rawHasuraSchema, wsExecutor } from "../hasura/schema"

const cache: any = {}

export const schema = makeExecutableSchema({
    typeDefs: [
        rawHasuraSchema,
        /* GraphQL */ `
            schema {
                subscription: Subscription
            }
            type delta {
                rev: String!
                patch: String!
                hash: String!
            }

            type LiveSubscription {
                query: subscription_root
                deltas: [delta!]
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
                                }
                                return BREAK
                            }
                        }
                    })

                    // construct subscription document to forward
                    const op: DocumentNode = {
                        kind: Kind.DOCUMENT,
                        definitions: [
                            {
                                kind: Kind.OPERATION_DEFINITION,
                                operation: "subscription",
                                variableDefinitions: info.operation.variableDefinitions,
                                selectionSet: selectionSet!
                            }
                        ]
                    }

                    // initialize rev + docHash (todo: accept rev variable?)
                    let rev = 0
                    const docHash = hasha(JSON.stringify(info.operation), { algorithm: "md5" })
                    const lastRevKey = `${docHash}:lastrev`

                    try {
                        const iterable = await wsExecutor({
                            document: op,
                            variables: info.variableValues
                        })

                        for await (const result of iterable as AsyncIterable<ExecutionResult>) {
                            if (result.errors != null) {
                                throw result.errors[0]
                            } else {
                                const source = rev === 0 ? {} : cache[`${docHash}:${cache[lastRevKey]}`].fromServer
                                const patch = instance.diff(source, result.data)

                                if (patch != null) {
                                    cache[lastRevKey] = rev
                                    cache[`${docHash}:${rev}`] = {
                                        fromServer: result.data,
                                        patch: patch
                                    }

                                    rev += 1

                                    yield {
                                        live: {
                                            query: instance.patch(_.cloneDeep(source), patch),
                                            deltas: [
                                                {
                                                    rev: rev - 1,
                                                    patch: JSON.stringify(patch)
                                                }
                                            ]
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
})
