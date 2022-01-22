import { makeExecutableSchema } from "@graphql-tools/schema"
import { BREAK, DocumentNode, GraphQLError, Kind, SelectionSetNode, visit } from "graphql"
import { ExecutionResult } from "graphql-ws"
import hasha from "hasha"
import * as jsonDiffPatch from "jsondiffpatch"
import * as jsondiffpatchArraysByHash from "jsondiffpatch-arrays-by-hash"
import _ from "lodash"
import { hasuraSchema as rawHasuraSchema, wsExecutor } from "../hasura/schema"

const cache: any = {}
const instance = jsonDiffPatch.create({
    objectHash: (obj: any, idx: number) => {
        if (_.has(obj, "id") && _.has(obj, "__typename")) {
            return `${obj.__typename}:${obj.id}`
        } else if (_.has(obj, "id")) {
            return obj.id
        } else if (_.has(obj, "__ref")) {
            return obj.__ref
        } else {
            const newObj = _.chain(obj).toPairs().sortBy(0).fromPairs().value()
            const hash = hasha(JSON.stringify(newObj), { algorithm: "md5" })
            return hash
        }
    },
    arrays: {
        // default true, detect items moved inside the array (otherwise they will be registered as remove+add)
        detectMove: true,
        // default false, the value of items moved is not included in deltas
        includeValueOnMove: false
    }
})

instance.processor.pipes.diff.replace("arrays", jsondiffpatchArraysByHash.diffFilter)
instance.processor.pipes.patch.replace("arrays", jsondiffpatchArraysByHash.patchFilter)
instance.processor.pipes.patch.replace("arraysCollectChildren", jsondiffpatchArraysByHash.collectChildrenPatchFilter)
instance.processor.pipes.reverse.replace("arrays", jsondiffpatchArraysByHash.reverseFilter)
instance.processor.pipes.reverse.replace(
    "arraysCollectChildren",
    jsondiffpatchArraysByHash.collectChildrenReverseFilter
)

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

                    let rev = 0
                    const docHash = hasha(JSON.stringify(info.operation), { algorithm: "md5" })

                    try {
                        const iterable = await wsExecutor({
                            document: op,
                            variables: info.variableValues
                        })

                        for await (const result of iterable as AsyncIterable<ExecutionResult>) {
                            if (result.errors != null) {
                                throw result.errors[0]
                            } else {
                                const source = rev === 0 ? {} : cache[docHash][cache[docHash].lastRev].fromServer
                                const patch = instance.diff(source, result.data)

                                if (patch != null) {
                                    if (cache[docHash] == null) {
                                        cache[docHash] = {}
                                    }
                                    cache[docHash].lastRev = rev
                                    cache[docHash][rev] = {
                                        fromServer: result.data,
                                        patch: patch
                                    }
                                    rev += 1

                                    yield {
                                        live: {
                                            query: instance.patch(
                                                _.cloneDeep(source),
                                                patch
                                            ),
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
