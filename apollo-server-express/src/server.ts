// import "./openTelemetry"

import { ApolloServerPluginLandingPageLocalDefault, Config, GraphQLOptions } from "apollo-server-core"
import { ApolloServer } from "apollo-server-express"
import compression from "compression"
import express from "express"
import { execute, GraphQLSchema, parse, subscribe } from "graphql"
import { createClient } from "graphql-ws"
import { useServer } from "graphql-ws/lib/use/ws"
import { createServer } from "http"
import { SubscriptionServer } from "subscriptions-transport-ws"
import WebSocket, { WebSocketServer } from "ws"
import { adminSchema, userSchema } from "./graphql/schema"
import validateEnv from "./utils/validateEnv"
import _ from "lodash"

const useGraphqlWs = true

validateEnv()

// create express
const app = express()
app.use(compression())

const httpServer = createServer(app)

// double ungood, hack into apollo server to allow for dynamic schema:
// https://github.com/apollographql/apollo-server/issues/2010#issuecomment-800218792
class ExtendedApolloServer extends ApolloServer {
    private readonly _schemaCb?: (
        ...args: Parameters<ApolloServer["createGraphQLServerOptions"]>
    ) => Promise<GraphQLSchema> | GraphQLSchema
    private readonly _derivedData: WeakMap<GraphQLSchema, any> = new WeakMap()

    constructor({
        schemaCallback,
        ...rest
    }: Config & {
        schemaCallback?: ExtendedApolloServer["_schemaCb"]
    }) {
        super(rest)
        this._schemaCb = schemaCallback
    }

    public async createGraphQLServerOptions(
        ...args: Parameters<ApolloServer["createGraphQLServerOptions"]>
    ): Promise<GraphQLOptions> {
        const options = await super.createGraphQLServerOptions.apply(this, args)
        if (this._schemaCb) {
            const schema = await this._schemaCb.apply(null, args)
            if (!this._derivedData.has(schema))
                this._derivedData.set(schema, this.constructor.prototype.generateSchemaDerivedData.call(this, schema))
            Object.assign(options, await this._derivedData.get(schema))
        }
        return options
    }
}

// create apollo server
const apolloServer = new ExtendedApolloServer({
    schema: adminSchema,
    introspection: true,
    plugins: [ApolloServerPluginLandingPageLocalDefault],
    context: ({ req }) => {
        let contextHeaders: any = { headers: { ..._.pick(req.headers, ["x-hasura-admin-secret", "x-hasura-role"]) } }
        return contextHeaders
    },
    schemaCallback: (context) => {
        // console.log("callback context", context)
        if (
            context.headers.hasOwnProperty("x-hasura-admin-secret") &&
            context.headers["x-hasura-admin-secret"] === process.env.HASURA_GRAPHQL_ADMIN_SECRET
        ) {
            if (context.headers["x-hasura-role"]) {
                if (context.headers["x-hasura-role"] === "admin") {
                    return adminSchema
                } else {
                    return userSchema
                }
            } else {
                // ??
            }
        }

        throw new Error("Invalid authentication or role")
    }
})
await apolloServer.start()

// apply middleware
apolloServer.applyMiddleware({ app })

const port = process.env.SERVER_PORT_CONTAINER || 3000

if (useGraphqlWs) {
    // create and use the websocket server
    const wsServer = new WebSocketServer({
        server: httpServer,
        path: "/graphql",
        perMessageDeflate: {
            zlibDeflateOptions: {
                // See zlib defaults.
                chunkSize: 1024,
                memLevel: 7,
                level: 3
            },
            zlibInflateOptions: {
                chunkSize: 10 * 1024
            },
            // Other options settable:
            clientNoContextTakeover: true, // Defaults to negotiated value.
            serverNoContextTakeover: true, // Defaults to negotiated value.
            serverMaxWindowBits: 10, // Defaults to negotiated value.
            // Below options specified as default values.
            concurrencyLimit: 10, // Limits zlib concurrency for perf.
            threshold: 1024 // Size (in bytes) below which messages should not be compressed if context takeover is disabled.
        }
    })

    useServer(
        {
            schema: async (context, msg, executionArgsWithoutSchema) => {
                let contextHeaders: any = {}
                if (
                    context != null &&
                    context.connectionParams != null &&
                    context.connectionParams.hasOwnProperty("headers")
                ) {
                    contextHeaders = context.connectionParams.headers
                }

                if (
                    contextHeaders.hasOwnProperty("x-hasura-admin-secret") &&
                    contextHeaders["x-hasura-admin-secret"] === process.env.HASURA_GRAPHQL_ADMIN_SECRET
                ) {
                    if (contextHeaders.hasOwnProperty["x-hasura-role"]) {
                        if (contextHeaders["x-hasura-role"] === "admin") {
                            return adminSchema
                        } else {
                            return userSchema
                        }
                    } else {
                        // ??
                    }
                }

                throw new Error("Invalid authentication or role")

                // console.log("req", context.request)
                // const isAdmin = await checkIsAdmin(ctx.request);
                // if (isAdmin) return getDebugSchema(ctx, msg, executionArgsWithoutSchema);
                return adminSchema
            },
            onConnect: () => {},
            onSubscribe: (context, msg) => {
                const args = {
                    schema: adminSchema,
                    operationName: msg.payload.operationName,
                    document: parse(msg.payload.query),
                    variableValues: msg.payload.variables
                }

                if (!context.extra.hasOwnProperty("subscriptionClient")) {
                    // console.log("ws context", JSON.stringify(context, null, 2))
                    let contextHeaders: any = {}
                    if (
                        context != null &&
                        context.connectionParams != null &&
                        context.connectionParams.hasOwnProperty("headers")
                    ) {
                        contextHeaders = context.connectionParams.headers
                    }

                    console.log("client exists?", context.extra.hasOwnProperty("subscriptionClient"))
                    console.log("creating client")

                    const subscriptionClient = createClient({
                        url: process.env.HASURA_WS_GRAPHQL_URL!,
                        webSocketImpl: WebSocket,
                        connectionParams: () => {
                            return {
                                headers: {
                                    ...contextHeaders
                                }
                            }
                        }
                    })

                    // @ts-expect-error
                    context.extra.subscriptionClient = subscriptionClient
                }

                return { ...args, contextValue: context }
            }
        },
        wsServer
    )
} else {
    const subscriptionServer = SubscriptionServer.create(
        {
            // This is the `schema` we just created.
            schema: adminSchema,
            // These are imported from `graphql`.
            execute,
            subscribe
        },
        {
            // This is the `httpServer` we created in a previous step.
            server: httpServer,
            // Pass a different path here if your ApolloServer serves at
            // a different path.
            path: "/graphql"
        }
    )
}

httpServer.listen(port as number, "0.0.0.0", () => {
    console.log(`GraphQL server is running on port ${port}.`)
})
