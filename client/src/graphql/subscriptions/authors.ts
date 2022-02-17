import { gql } from "@apollo/client"

gql`
    subscription authors($limit: Int!) {
        authors(limit: $limit, order_by: { name: asc }) {
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
    subscription authorsLive($lastUpdated: timestamptz!, $limit: Int!) {
        live {
            __typename
            id
            query {
                authors(limit: $limit, order_by: { name: asc }) {
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
