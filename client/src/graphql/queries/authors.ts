import { gql } from "@apollo/client"

gql`
    query getAuthors {
        authors(limit: 5, order_by: { name: asc }) {
            __typename
            id
            name
            updated_at
            books {
                __typename
                id
                title
                isbn
                updated_at
            }
        }
    }
`
