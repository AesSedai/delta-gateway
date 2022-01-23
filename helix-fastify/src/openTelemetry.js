import { getNodeAutoInstrumentations } from "@opentelemetry/auto-instrumentations-node"
import { JaegerExporter } from "@opentelemetry/exporter-jaeger"
import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-http"
import { ZipkinExporter } from "@opentelemetry/exporter-zipkin"
import { ExpressInstrumentation } from "@opentelemetry/instrumentation-express"
import { GraphQLInstrumentation } from "@opentelemetry/instrumentation-graphql"
import { HttpInstrumentation } from "@opentelemetry/instrumentation-http"
import { Resource } from "@opentelemetry/resources"
import sdkNode from "@opentelemetry/sdk-node"
import { ConsoleSpanExporter } from "@opentelemetry/sdk-trace-base"
import { SemanticResourceAttributes } from "@opentelemetry/semantic-conventions"
import opentelemetry from '@opentelemetry/api'
import process from "process"

const otlpOptions = {
    host: "otel-collector",
    port: 4317,
    // url: 'http://otel-collector:55681/v1/trace', // url is optional and can be omitted - default is http://localhost:55681/v1/trace
    headers: {}, // an optional object containing custom headers to be sent with each request
    concurrencyLimit: 10 // an optional limit on pending requests
}

const jaegerOptions = {
    // tags: [], // optional
    // You can use the default UDPSender
    // host: "jaeger-all-in-one", // optional
    // port: 14250, // optional
    // OR you can use the HTTPSender as follows
    endpoint: "http://jaeger-all-in-one:14268/api/traces"
    // maxPacketSize: 65000 // optional
}

const zipkinOptions = {
    url: "http://jaeger-all-in-one:9411/api/v2/spans"
}

const jaegerExporter = new JaegerExporter(jaegerOptions)
const otlpExporter = new OTLPTraceExporter(otlpOptions)
const zipExporter = new ZipkinExporter(zipkinOptions)

// configure the SDK to export telemetry data to the console
// enable all auto-instrumentations from the meta package
const traceExporter = new ConsoleSpanExporter()
const sdk = new sdkNode.NodeSDK({
    resource: new Resource({
        [SemanticResourceAttributes.SERVICE_NAME]: "delta-gateway"
    }),
    traceExporter: jaegerExporter,
    instrumentations: [
        getNodeAutoInstrumentations(),
        new ExpressInstrumentation(),
        new HttpInstrumentation(),
        new GraphQLInstrumentation({
            allowValues: true,
            mergeItems: true,
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

export const tracer = opentelemetry.trace.getTracer('example-basic-tracer-node');

// const provider = new BasicTracerProvider({
//     resource: new Resource({
//       [SemanticResourceAttributes.SERVICE_NAME]: 'basic-service',
//     }),
//   });
// provider.addSpanProcessor(new SimpleSpanProcessor(jaegerExporter));
// provider.addSpanProcessor(new SimpleSpanProcessor(traceExporter));
// provider.register();

// registerInstrumentations([new ExpressInstrumentation(), new HttpInstrumentation()])
