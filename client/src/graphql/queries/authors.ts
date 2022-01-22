import { gql } from "@apollo/client"

gql`
    query authors {
        authors(limit: 10, order_by: { name: asc }) {
            __typename
            id
            name
            books {
                __typename
                id
                title
                isbn
            }
        }
    }
`
