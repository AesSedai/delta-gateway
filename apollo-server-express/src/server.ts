// import "./openTelemetry"

import { ApolloServerPluginLandingPageLocalDefault } from "apollo-server-core"
import { ApolloServer } from "apollo-server-express"
import compression from "compression"
import express from "express"
import { execute, subscribe } from "graphql"
import { useServer } from "graphql-ws/lib/use/ws"
import { createServer } from "http"
import { SubscriptionServer } from "subscriptions-transport-ws"
import { WebSocketServer } from "ws" // yarn add ws
import { schema } from "./graphql/schema"
import validateEnv from "./utils/validateEnv"

const useGraphqlWs = true

validateEnv()

// create express
const app = express()
app.use(compression())

const httpServer = createServer(app)

// create apollo server
const apolloServer = new ApolloServer({
    schema,
    introspection: true,
    plugins: [ApolloServerPluginLandingPageLocalDefault]
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

    useServer({ schema }, wsServer)
} else {
    const subscriptionServer = SubscriptionServer.create(
        {
            // This is the `schema` we just created.
            schema,
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
