import { delegateToSchema } from "@graphql-tools/delegate"
import { makeExecutableSchema } from "@graphql-tools/schema"
import { stitchSchemas } from "@graphql-tools/stitch"
import { ExecutionResult } from "graphql-ws"
import { hasuraSchema as rawHasuraSchema, schema as hasuraSchema, wsExecutor } from "../hasura/schema"
import { GraphQLResolveInfo } from "graphql"

const localt = makeExecutableSchema({
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
                # rev: String!
            }

            type Subscription {
                live: LiveSubscription!
                greetings: String!
            }
        `
    ],
    resolvers: {
        LiveSubscription: {
            query: {
                subscribe: async function* (obj, args, context, info) {
                    // console.log("OBJ", JSON.stringify(obj, null, 2), "\n\n")
                    // console.log("ARGS", JSON.stringify(args, null, 2), "\n\n")
                    // console.log("CONTEXT", context, "\n\n")
                    // console.log("INFO", JSON.stringify(info, null, 2), "\n\n")

                    // TArgs, TContext, TRoot, TExtensions

                    // wsExecutor

                    // return delegateToSchema({
                    //     schema: hasuraSchema,
                    //     operation: "subscription",
                    //     fieldName: "authors",
                    //     args: args,
                    //     context,
                    //     info
                    // })
                }
            }
        },
        Subscription: {
            live: {
                subscribe: async function* (obj, args, context, info) {
                    // console.log("OBJ", JSON.stringify(obj, null, 2), "\n\n")
                    // console.log("ARGS", JSON.stringify(args, null, 2), "\n\n")
                    // console.log("CONTEXT", context, "\n\n")
                    // console.log("INFO", JSON.stringify(info, null, 2), "\n\n")

                    console.log("INFO", JSON.stringify(info, null, 2), "\n\n")

                    const iterable = await wsExecutor({
                        document: {
                            kind: "Document",
                            definitions: [
                                {
                                    kind: "OperationDefinition",
                                    operation: "subscription",
                                    variableDefinitions: [],
                                    selectionSet: {
                                        kind: "SelectionSet",
                                        selections: [
                                            {
                                                kind: "Field",
                                                arguments: [],
                                                name: {
                                                    kind: "Name",
                                                    value: "authors"
                                                },
                                                selectionSet: {
                                                    kind: "SelectionSet",
                                                    selections: [
                                                        {
                                                            kind: "Field",
                                                            name: {
                                                                kind: "Name",
                                                                value: "name"
                                                            },
                                                            arguments: [],
                                                            directives: []
                                                        }
                                                    ]
                                                }
                                            }
                                        ]
                                    }
                                }
                            ]
                        }
                    })

                    // console.log("iterable", iterable)

                    // {
                    //   "errors": [
                    //     {
                    //       "message": "Cannot read properties of undefined (reading '0')"
                    //     }
                    //   ]
                    // }

                    // type GraphQLResolveInfo = {
                    //   fieldName: string,
                    //   fieldNodes: Array<Field>,
                    //   returnType: GraphQLOutputType,
                    //   parentType: GraphQLCompositeType,
                    //   schema: GraphQLSchema,
                    //   fragments: { [fragmentName: string]: FragmentDefinition },
                    //   rootValue: any,
                    //   operation: OperationDefinition,
                    //   variableValues: { [variableName: string]: any },
                    // }

                  //   const t: GraphQLResolveInfo = {}

                  //   const delegate = await delegateToSchema({
                  //     schema: hasuraSchema,
                  //     operation: "subscription",
                  //     fieldName: "authors",
                  //     args: args,
                  //     context,
                  //     info
                  // })

                  // console.log("delegate", JSON.stringify(delegate, null, 2))

                    for await (const result of iterable as AsyncIterable<ExecutionResult>) {
                      console.log("result", result)
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

                    // for (const response of iterable?.next()) {

                    // }

                    // console.log("mergeInfo", info.mergeInfo)

                    // for (const hi of ["Hi", "Bonjour", "Hola", "Ciao", "Zdravo"]) {

                    // }

                    // for await (const result of resp) {
                    //     console.log("result", JSON.stringify(result, null, 2), "\n\n")

                    // }

                    // for (const hi of ["Hi", "Bonjour", "Hola", "Ciao", "Zdravo"]) {

                    // await new Promise((resolve) => setTimeout(resolve, 1000)) // wait 1 second
                    // }
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

export const testSchema = stitchSchemas({
    subschemas: [localt, hasuraSchema]
})

export const schema = makeExecutableSchema({
    typeDefs: [
        hasuraSchema,
        /* GraphQL */ `
            type delta {
                rev: String!
                patch: String!
                hash: String!
            }

            type Query {
                hello: String!
            }

            type LiveSubscription {
                query: Query
                deltas: [delta]!
                # patch: [RFC4627Patch]
                # rev: String!
            }

            type Subscription {
                live: LiveSubscription!
                greetings: String!
            }
        `
    ],
    resolvers: {
        Query: {
            hello: () => "World"
        },
        Subscription: {
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
