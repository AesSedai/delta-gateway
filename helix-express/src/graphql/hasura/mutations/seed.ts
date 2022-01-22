import { gql } from "graphql-request"

gql`
    mutation seed_authors($authors: [authors_insert_input!]!) {
        insert_authors(objects: $authors) {
            affected_rows
        }
    }
`

gql`
    mutation remove_authors {
        delete_authors(where: {}) {
            affected_rows
        }
    }
`
