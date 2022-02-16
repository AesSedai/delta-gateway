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
                isbn
                title
            }
        }
    }
`

gql`
    query getAuthorsRandom($limit: Int = 25, $offset: Int!) {
        authors(limit: $limit, offset: $offset) {
            __typename
            updated_at
            name
            books {
                __typename
                updated_at
                isbn
                title
            }
        }
    }
`
