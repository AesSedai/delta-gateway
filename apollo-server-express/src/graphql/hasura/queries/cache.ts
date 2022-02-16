import { gql } from "graphql-request"

gql`
    query getCacheAtTimestamp($query: String!, $timestamp: timestamptz!) {
        cache(where: { query: { _eq: $query }, lastUpdated: { _eq: $timestamp } }) {
            id
            lastUpdated
            patch
            query
            result
        }
    }
`
