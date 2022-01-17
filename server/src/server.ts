import { envelop, useLogger, useSchema, useTiming } from "@envelop/core"
import fastify from "fastify"
import fastifyWebsocket from "fastify-websocket"
import { getGraphQLParameters, processRequest, renderGraphiQL, sendResult, shouldRenderGraphiQL } from "graphql-helix"
import { useServer } from "graphql-ws/lib/use/ws"
import { testSchema } from "./graphql/local/schema"
import { schema } from "./graphql/schema"
import validateEnv from "./utils/validateEnv"

validateEnv()

const getEnveloped = envelop({
    plugins: [
        useSchema(testSchema),
        useLogger(),
        // useLogger({ logFn: (args) => console.log(args), skipIntrospection: true }),
        useTiming()
    ]
})
const app = fastify()
await app.register(fastifyWebsocket, {
    options: { maxPayload: 1048576 }
})

app.route({
    method: ["GET", "POST"],
    url: "/graphql",
    async handler(req, res) {
        const { parse, validate, contextFactory, execute, schema } = getEnveloped({ req })
        const request = {
            body: req.body,
            headers: req.headers,
            method: req.method,
            query: req.query
        }

        if (shouldRenderGraphiQL(request)) {
            res.type("text/html")
            res.send(renderGraphiQL({}))
        } else {
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

            sendResult(result, res.raw)

            // Tell fastify a response was sent
            res.sent = true
        }
    }
})

const port = process.env.SERVER_PORT_CONTAINER || 3000

app.listen(port, "0.0.0.0", () => {
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
        app.websocketServer
    )

    console.log(`GraphQL server is running on port ${port}.`)
})
