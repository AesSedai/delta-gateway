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
    query ($limit: Int!, $history__ts: timestamptz!) {
        history_books(
            limit: $limit
            order_by: { title: asc }
            where: {
                valid_from: { _lte: $history__ts }
                _or: [{ valid_to: { _is_null: true } }, { valid_to: { _gt: $history__ts } }]
            }
        ) {
            __typename
            id
            title
            isbn
            updated_at
            author(
                where: {
                    valid_from: { _lte: $history__ts }
                    _or: [{ valid_to: { _is_null: true } }, { valid_to: { _gt: $history__ts } }]
                }
            ) {
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
