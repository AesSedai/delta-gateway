import { cleanEnv, port, str } from "envalid"

const validateEnv = () => {
    cleanEnv(process.env, {
        NODE_ENV: str(),
        SERVER_PORT_CONTAINER: port(),
        HASURA_HTTP_GRAPHQL_URL: str(),
        HASURA_WS_GRAPHQL_URL: str(),
        HASURA_HTTP_METADATA_URL: str(),
        HASURA_HTTP_ROOT_URL: str(),
        OTLP_COLLECTOR_URL: str()
    })
}

export default validateEnv
