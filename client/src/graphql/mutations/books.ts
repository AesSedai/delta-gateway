import { gql } from "@apollo/client"

gql`
    mutation addBook($book: books_insert_input!) {
        insert_books_one(object: $book) {
            id
        }
    }
`

gql`
    mutation deleteBook($id: uuid!) {
        delete_books_by_pk(id: $id) {
            id
        }
    }
`

gql`
    mutation updateBook($id: uuid!, $title: String!) {
        update_books_by_pk(pk_columns: { id: $id }, _set: { title: $title }) {
            id
        }
    }
`
