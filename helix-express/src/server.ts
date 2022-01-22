import { envelop, useLogger, useSchema } from "@envelop/core"
import express from "express"
import { GraphQLError } from "graphql"
import {
    getGraphQLParameters,
    processRequest,
    renderGraphiQL,
    sendMultipartResponseResult,
    sendResponseResult,
    shouldRenderGraphiQL
} from "graphql-helix"
import { useServer } from "graphql-ws/lib/use/ws"
import * as ws from "ws"
import { schema } from "./graphql/schema"
import validateEnv from "./utils/validateEnv"

validateEnv()

const getEnveloped = envelop({
    plugins: [
        useSchema(schema),
        useLogger(),
        // useLogger({ logFn: (args) => console.log(args), skipIntrospection: true }),
        // useTiming()
    ]
})

const app = express()
app.use(express.json())

app.use("/graphql", async (req, res) => {
    const { parse, validate, contextFactory, execute, schema } = getEnveloped({ req })
    const request = {
        body: req.body,
        headers: req.headers,
        method: req.method,
        query: req.query
    }

    if (shouldRenderGraphiQL(request)) {
        res.send(
            renderGraphiQL({
                subscriptionsEndpoint: "ws://localhost:4000/graphql"
            })
        )
        return
    }

    const { operationName, query, variables } = getGraphQLParameters(request)
    const result = await processRequest({
        operationName,
        query,
        variables,
        request,
        schema,
        parse,
        validate,
        execute,
        contextFactory
    })
    if (result.type === "RESPONSE") {
        sendResponseResult(result, res)
    } else if (result.type === "MULTIPART_RESPONSE") {
        sendMultipartResponseResult(result, res)
    } else {
        res.status(422)
        res.json({
            errors: [new GraphQLError("Subscriptions should be sent over WebSocket.")]
        })
    }
})

const port = process.env.SERVER_PORT_CONTAINER || 3000

const server = app.listen(port as number, "0.0.0.0", () => {
    const wsServer = new ws.WebSocketServer({
        server,
        path: "/graphql"
    })

    const { execute, subscribe } = getEnveloped({})

    useServer(
        {
            execute,
            subscribe,
            onSubscribe: async (ctx, msg) => {
                const { schema, contextFactory, parse, validate } = getEnveloped({
                    connectionParams: ctx.connectionParams,
                    socket: ctx.extra.socket,
                    request: ctx.extra.request
                })

                const args = {
                    schema,
                    operationName: msg.payload.operationName,
                    document: parse(msg.payload.query),
                    variableValues: msg.payload.variables,
                    contextValue: await contextFactory()
                }

                const errors = validate(args.schema, args.document)
                if (errors.length) return errors

                return args
            }
        },
        wsServer
    )

    console.log(`GraphQL server is running on port ${port}.`)
})
