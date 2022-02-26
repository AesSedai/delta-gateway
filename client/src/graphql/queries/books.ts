import { gql } from "@apollo/client"

gql`
    query getBooks($limit: Int!) {
        books(limit: $limit, order_by: { title: asc }) {
            __typename
            id
            title
            isbn
            updated_at
            author {
                __typename
                id
                name
                updated_at
            }
        }
    }
`
