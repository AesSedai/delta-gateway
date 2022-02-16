import { gql } from "graphql-request"

gql`
    mutation insertCache($result: cache_insert_input!) {
        insert_cache_one(
            object: $result
            on_conflict: { constraint: cache_query_lastupdated_unique, update_columns: [] }
        ) {
            lastUpdated
            id
        }
    }
`
