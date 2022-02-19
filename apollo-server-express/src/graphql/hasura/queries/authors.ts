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

gql`
    query getAuthorHistory($ts: timestamptz!, $limit: Int!) {
        history_authors(
            limit: $limit
            order_by: { name: asc }
            where: { valid_from: { _lte: $ts }, _or: [{ valid_to: { _is_null: true } }, { valid_to: { _gt: $ts } }] }
        ) {
            __typename
            id
            name
            updated_at
            books(
                order_by: { title: asc }
                where: {
                    valid_from: { _lte: $ts }
                    _or: [{ valid_to: { _is_null: true } }, { valid_to: { _gt: $ts } }]
                }
            ) {
                __typename
                id
                title
                isbn
                updated_at
            }
        }
    }
`
