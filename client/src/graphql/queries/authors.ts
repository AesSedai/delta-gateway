import { gql } from "@apollo/client"

gql`
    query getAuthors($limit: Int!) {
        authors(limit: $limit, order_by: { name: asc }) {
            __typename
            id
            name
            updated_at
            books(order_by: { name: asc }) {
                __typename
                id
                title
                isbn
                updated_at
            }
        }
    }
`
