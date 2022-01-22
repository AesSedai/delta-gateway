import "./openTelemetry"
// provider.register()

import { ApolloServerPluginLandingPageLocalDefault } from "apollo-server-core"
import { ApolloServer } from "apollo-server-express"
import express from "express"
import { useServer } from "graphql-ws/lib/use/ws"
import { createServer } from "http"
import { WebSocketServer } from "ws" // yarn add ws
import { schema } from "./graphql/schema"
import validateEnv from "./utils/validateEnv"

validateEnv()

// create express
const app = express()
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

// create and use the websocket server
const wsServer = new WebSocketServer({
    server: httpServer,
    path: apolloServer.graphqlPath
})

useServer({ schema }, wsServer)

httpServer.listen(port as number, "0.0.0.0", () => {
    console.log(`GraphQL server is running on port ${port}.`)
})
