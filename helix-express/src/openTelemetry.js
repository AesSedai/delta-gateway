import { getNodeAutoInstrumentations } from "@opentelemetry/auto-instrumentations-node"
import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-http"
import { ExpressInstrumentation } from "@opentelemetry/instrumentation-express"
import { GraphQLInstrumentation } from "@opentelemetry/instrumentation-graphql"
import { HttpInstrumentation } from "@opentelemetry/instrumentation-http"
import { Resource } from "@opentelemetry/resources"
import sdkNode from "@opentelemetry/sdk-node"
import { ConsoleSpanExporter } from "@opentelemetry/sdk-trace-base"
import { SemanticResourceAttributes } from "@opentelemetry/semantic-conventions"
import process from "process"

const otlpOptions = {
    url: process.env.OTLP_COLLECTOR_URL,
    headers: {} // an optional object containing custom headers to be sent with each request
}

const otlpExporter = new OTLPTraceExporter(otlpOptions)

// configure the SDK to export telemetry data to the console
// enable all auto-instrumentations from the meta package
const traceExporter = new ConsoleSpanExporter()
const sdk = new sdkNode.NodeSDK({
    resource: new Resource({
        [SemanticResourceAttributes.SERVICE_NAME]: "delta-gateway:helix-express"
    }),
    traceExporter: otlpExporter,
    instrumentations: [
        getNodeAutoInstrumentations(),
        new ExpressInstrumentation(),
        new HttpInstrumentation(),
        new GraphQLInstrumentation({
            allowValues: true,
            mergeItems: true
        })
    ]
})

// initialize the SDK and register with the OpenTelemetry API
// this enables the API to record telemetry
sdk.start()
    .then(() => console.log("Tracing initialized"))
    .catch((error) => console.log("Error initializing tracing", error))

// gracefully shut down the SDK on process exit
process.on("SIGTERM", () => {
    sdk.shutdown()
        .then(() => console.log("Tracing terminated"))
        .catch((error) => console.log("Error terminating tracing", error))
        .finally(() => process.exit(0))
})
