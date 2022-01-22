import { GraphQLClient } from "graphql-request"
import { getSdk } from "../graphql/hasura/graphql"

const endpoint = process.env.HASURA_HTTP_GRAPHQL_LOCAL_URL
    ? process.env.HASURA_HTTP_GRAPHQL_LOCAL_URL
    : process.env.HASURA_HTTP_GRAPHQL_URL

const graphQLClient = new GraphQLClient(endpoint!, {
    headers: {
        "X-Hasura-Admin-Secret": process.env.HASURA_GRAPHQL_ADMIN_SECRET || ""
    }
})

const sdk = getSdk(graphQLClient)

export { sdk }
