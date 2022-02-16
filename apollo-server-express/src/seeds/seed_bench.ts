import _ from "lodash"
import { Authors_Insert_Input } from "../graphql/hasura/graphql"
import { sdk } from "../utils/gqlClient"

await sdk.remove_authors()

const a: Authors_Insert_Input[] = Array.from(Array(3), (_j, i) => {
    return {
        name: `Author ${(i + 1).toString().padStart(3, "0")}`,
        books: {
            data: Array.from(Array(_.random(1, 5)), (_j, j) => {
                return {
                    title: `Book ${(i + 1) * 1000 + j}`,
                    isbn: `978-${_.random(1, 9)}-${_.random(1000, 9999)}-${_.random(1000, 9999)}-${_.random(1, 9)}`
                }
            })
        }
    }
})

await sdk.seed_authors({ authors: a })

export {}
