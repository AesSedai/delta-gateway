import { gql } from "@apollo/client"

gql`
    mutation updateAuthor($id: uuid!, $name: String!) {
        update_authors_by_pk(pk_columns: { id: $id }, _set: { name: $name }) {
            id
        }
    }
`
