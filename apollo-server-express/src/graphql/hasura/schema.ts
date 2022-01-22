import { AsyncExecutor, observableToAsyncIterable } from "@graphql-tools/utils"
import { introspectSchema, wrapSchema } from "@graphql-tools/wrap"
import opentelemetry from "@opentelemetry/api"
// import { fetch } from "cross-undici-fetch"
// import fetch from 'node-fetch'
import { getOperationAST, print } from "graphql"
import { createClient } from "graphql-ws"
import WebSocket from "ws"
import { tracer } from "../../openTelemetry"
import bent from "bent"
import { fetch, request, Client, Pool } from 'undici'

const subscriptionClient = createClient({
    url: process.env.HASURA_WS_GRAPHQL_URL!,
    webSocketImpl: WebSocket
})

const client = new Pool("http://graphql-engine:8080", {pipelining: 10, connections: 10})
const post = bent('POST', 'json', 200)


const httpExecutor: AsyncExecutor = async ({ document, variables, operationName, extensions }) => {
    // const executorSpan = tracer.startSpan("httpExecutor")
    // const ctx = opentelemetry.trace.setSpan(opentelemetry.context.active(), executorSpan)

    // const docSpan = tracer.startSpan("print doc", undefined, ctx)
    const query = print(document)
    // docSpan.end()

    // const bodySpan = tracer.startSpan("body stringify", undefined, ctx)
    const body = JSON.stringify({ query, variables, operationName, extensions })
    // bodySpan.end()

    // const fetchSpan = tracer.startSpan("fetch", undefined, ctx)
    
    // const resp = await post(process.env.HASURA_HTTP_GRAPHQL_URL!, body, {
    //     "Content-Type": "application/json"
    // })

    // console.log("resp", resp)

    const res = await client.request({
        path: "/v1/graphql",
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: body
    })

    const result = res.body.json()

    // const fetchResult = await fetch(process.env.HASURA_HTTP_GRAPHQL_URL!, {
    //     method: "POST",
    //     headers: {
    //         "Content-Type": "application/json"
    //     },
    //     body: body
    // })
    // fetchSpan.end()

    // const jsonSpan = tracer.startSpan("json()", undefined, ctx)
    // const result = fetchResult.json()
    // jsonSpan.end()
    // executorSpan.end()
    // return resp as Promise<any>
    return result as Promise<any>
}

export const wsExecutor: AsyncExecutor = async ({ document, variables, operationName, extensions }) =>
    observableToAsyncIterable({
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

export const schema = wrapSchema({
    schema: await introspectSchema(executor),
    executor
})
