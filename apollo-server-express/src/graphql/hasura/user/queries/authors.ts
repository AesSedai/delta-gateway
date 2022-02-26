import { gql } from "graphql-request"

gql`
    query getAuthors {
        authors {
            __typename
            id
            updated_at
            name
            books {
                __typename
                id
                updated_at
                title
            }
        }
    }
`
