import { gql } from "@apollo/client"

gql`
    subscription books($limit: Int!) {
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

gql`
    subscription booksLive($lastUpdated: timestamptz!, $limit: Int!) {
        live {
            __typename
            id
            query {
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
            delta(lastUpdated: $lastUpdated) {
                lastUpdated
                patch
                hash
            }
        }
    }
`
