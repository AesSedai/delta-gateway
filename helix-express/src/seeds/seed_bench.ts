import async from "async"
import _ from "lodash"
import { sleep } from "../utils/sleep"
import { Authors_Insert_Input } from "../graphql/hasura/graphql"
import { sdk } from "../utils/gqlClient"

await sdk.remove_authors()

await async.each(Array.from(Array(50).keys()), async (f: number) => {
    const a: Authors_Insert_Input[] = Array.from(Array(50), (_j, i) => {
        return {
            name: `${(f + 1) * (i + 1)}`,
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
    await sleep(_.random(500, 1500))
})

export {}
