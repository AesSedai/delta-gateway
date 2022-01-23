declare global {
    namespace NodeJS {
        interface ProcessEnv {
            NODE_ENV: "development" | "production"
            SERVER_PORT_CONTAINER: number
            HASURA_HTTP_GRAPHQL_URL: string
            HASURA_WS_GRAPHQL_URL: string
            HASURA_HTTP_METADATA_URL: string
            HASURA_HTTP_GRAPHQL_LOCAL_URL?: string
            HASURA_HTTP_ROOT_URL: string
        }
    }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {}
