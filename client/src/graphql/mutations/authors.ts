import { gql } from "@apollo/client"

gql`
    mutation updateAuthor($id: uuid!, $name: String!) {
        update_authors_by_pk(pk_columns: { id: $id }, _set: { name: $name }) {
            id
        }
    }
`

gql`
    mutation seedAuthors($authors: [authors_insert_input!]!) {
        insert_authors(objects: $authors) {
            affected_rows
        }
    }
`

gql`
    mutation resetAuthors {
        delete_authors(where: {}) {
            affected_rows
        }
    }
`
