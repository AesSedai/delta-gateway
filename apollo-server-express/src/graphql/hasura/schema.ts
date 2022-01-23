import { AsyncExecutor, observableToAsyncIterable } from "@graphql-tools/utils"
import { introspectSchema } from "@graphql-tools/wrap"
import { getOperationAST, print } from "graphql"
import { createClient } from "graphql-ws"
import { Pool } from "undici"
import WebSocket from "ws"

const subscriptionClient = createClient({
    url: process.env.HASURA_WS_GRAPHQL_URL!,
    webSocketImpl: WebSocket
})

const client = new Pool("http://graphql-engine:8080", { pipelining: 10, connections: 10 })

const httpExecutor: AsyncExecutor = async ({ document, variables, operationName, extensions }) => {
    const query = print(document)
    const body = JSON.stringify({ query, variables, operationName, extensions })

    const res = await client.request({
        path: "/v1/graphql",
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: body
    })

    return res.body.json() as Promise<any>
}

export const wsExecutor: AsyncExecutor = async ({ document, variables, operationName, extensions }) => {
    return observableToAsyncIterable({
        subscribe: (observer) => ({
            unsubscribe: subscriptionClient.subscribe(
                {
                    query: print(document),
                    variables: variables as Record<string, any>,
                    operationName,
                    extensions
                },
                {
                    next: (data) => observer.next && observer.next(data as any),
                    error: (err) => {
                        if (!observer.error) return
                        if (err instanceof Error) {
                            observer.error(err)
                        } else if (err instanceof CloseEvent) {
                            observer.error(new Error(`Socket closed with event ${err.code}`))
                        } else if (Array.isArray(err)) {
                            // GraphQLError[]
                            observer.error(new Error(err.map(({ message }) => message).join(", ")))
                        }
                    },
                    complete: () => observer.complete && observer.complete()
                }
            )
        })
    })
}

export const executor: AsyncExecutor = async (args) => {
    // get the operation node of from the document that should be executed
    const operation = getOperationAST(args.document, args.operationName)

    // subscription operations should be handled by the wsExecutor
    if (operation?.operation === "subscription") {
        return wsExecutor(args)
    }
    // all other operations should be handles by the httpExecutor
    return httpExecutor(args)
}

export const hasuraSchema = await introspectSchema(executor)

export const schema = {
    schema: hasuraSchema,
    executor: executor
}
