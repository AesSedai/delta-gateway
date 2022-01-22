import _ from "lodash"
import { Authors_Insert_Input } from "../graphql/hasura/graphql"
import { sdk } from "../utils/gqlClient"

const a: Authors_Insert_Input[] = Array.from(Array(1000), (_u, i) => {
    return {
        name: `${i}`,
        books: {
            data: Array.from(Array(_.random(1, 5)), (_u, j) => {
                return {
                    title: `Book ${i * 1000 + j}`,
                    isbn: `978-${_.random(1, 9)}-${_.random(1000, 9999)}-${_.random(1000, 9999)}-${_.random(1, 9)}`
                }
            })
        }
    }
})

await sdk.remove_authors()
await sdk.seed_authors({ authors: a })

export {}
