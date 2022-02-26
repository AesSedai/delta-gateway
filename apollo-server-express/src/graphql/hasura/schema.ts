import { AsyncExecutor, observableToAsyncIterable } from "@graphql-tools/utils"
import { introspectSchema } from "@graphql-tools/wrap"
import { getOperationAST, print } from "graphql"
import { Client } from "graphql-ws"
import http from "http"
import { Pool } from "undici"

const pool = new Pool(process.env.HASURA_HTTP_ROOT_URL!)
const agent = new http.Agent({ keepAlive: true, maxSockets: 50 })

export const httpExecutor: AsyncExecutor = async ({ document, variables, operationName, extensions, context }) => {
    const query = print(document)
    const body = JSON.stringify({ query, variables, operationName, extensions })

    let contextHeaders = {}
    if (context != null && context.hasOwnProperty("headers")) {
        contextHeaders = context["headers"]
    } else if (
        context != null &&
        context.hasOwnProperty("connectionParams") &&
        context.connectionParams.hasOwnProperty("headers")
    ) {
        contextHeaders = context.connectionParams.headers
    }

    // const p = await axios({
    //     url: "/v1/graphql",
    //     method: "POST",
    //     baseURL: process.env.HASURA_HTTP_ROOT_URL!,
    //     headers: {
    //         "Content-Type": "application/json"
    //     },
    //     data: body,
    //     maxContentLength: 2000000,
    //     maxBodyLength: 2000000,
    //     httpAgent: agent
    // })

    const res = await pool.request({
        path: "/v1/graphql",
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            ...contextHeaders
        },
        body: body
    })

    // return p.data as Promise<any>
    return res.body.json() as Promise<any>
}

export const wsExecutor: AsyncExecutor = async ({ document, variables, operationName, extensions, context }) => {
    let subscriptionClient: Client | undefined = undefined
    if (context != null && context.extra.subscriptionClient != null) {
        subscriptionClient = context.extra.subscriptionClient
    }

    if (subscriptionClient == undefined) {
        throw new Error("Unable to get subscription client")
    } else {
        return observableToAsyncIterable({
            subscribe: (observer) => ({
                // @ts-expect-error
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
                            } else if (Array.isArray(err)) {
                                // GraphQLError[]
                                observer.error(new Error(err.map(({ message }) => message).join(", ")))
                            } else {
                                // @ts-expect-error
                                observer.error(new Error(`Socket closed with event ${err.code}`))
                            }
                        },
                        complete: () => observer.complete && observer.complete()
                    }
                )
            })
        })
    }
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

export const hasuraGraphQLSchemaAdmin = await introspectSchema(executor, {
    headers: {
        "x-hasura-admin-secret": process.env.HASURA_GRAPHQL_ADMIN_SECRET,
        "x-hasura-role": "admin"
    }
})

export const hasuraGraphQLSchemaUser = await introspectSchema(executor, {
    headers: {
        "x-hasura-admin-secret": process.env.HASURA_GRAPHQL_ADMIN_SECRET,
        "x-hasura-role": "user"
    }
})

export const hasuraSchemaAdmin = {
    schema: hasuraGraphQLSchemaAdmin,
    executor: executor
}

export const hasuraSchemaUser = {
    schema: hasuraGraphQLSchemaUser,
    executor: executor
}
