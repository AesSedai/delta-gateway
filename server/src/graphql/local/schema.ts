import { makeExecutableSchema } from "@graphql-tools/schema"
import { BREAK, DocumentNode, GraphQLError, Kind, SelectionSetNode, visit } from "graphql"
import { ExecutionResult } from "graphql-ws"
import { hasuraSchema as rawHasuraSchema, wsExecutor } from "../hasura/schema"

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
                deltas: [delta]!
                # patch: [RFC4627Patch]
            }

            type Subscription {
                live: LiveSubscription!
                greetings: String!
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

                    try {
                        const iterable = await wsExecutor({
                            document: op,
                            variables: info.variableValues
                        })

                        for await (const result of iterable as AsyncIterable<ExecutionResult>) {
                            if (result.errors != null) {
                                throw result.errors[0]
                            } else {
                                yield {
                                    live: {
                                        query: result.data,
                                        deltas: [
                                            {
                                                rev: "0",
                                                patch: "5"
                                            }
                                        ]
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
            },
            greetings: {
                subscribe: async function* sayHiIn5Languages() {
                    for (const hi of ["Hi", "Bonjour", "Hola", "Ciao", "Zdravo"]) {
                        yield { greetings: hi }
                        await new Promise((resolve) => setTimeout(resolve, 1000)) // wait 1 second
                    }
                }
            }
        }
    }
})
