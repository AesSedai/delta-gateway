import { gql } from "@apollo/client"

gql`
    subscription authors {
        authors(limit: 5, order_by: { name: asc }) {
            __typename
            id
            name
            updated_at
            books(order_by: { title: asc }) {
                __typename
                id
                title
                isbn
                updated_at
            }
        }
    }
`

gql`
    subscription authorsLive($lastUpdated: timestamptz!) {
        live {
            __typename
            id
            query {
                authors(limit: 5, order_by: { name: asc }) {
                    __typename
                    id
                    name
                    updated_at
                    books(order_by: { title: asc }) {
                        __typename
                        id
                        title
                        isbn
                        updated_at
                    }
                }
            }
            delta(lastUpdated: $lastUpdated) {
                lastUpdated
                patch
                hash
            }
        }
    }
`
