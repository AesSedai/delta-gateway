// import { ZSTDCompress } from "simple-zstd"
// import { Readable, Stream } from "stream"
// import { ZstdCodec } from "zstd-codec"
import deepdash from "deepdash"
import lodash from "lodash"

const _ = deepdash(lodash)

// const ZstdCodec = require('zstd-codec').ZstdCodec;

// const deflate = util.promisify(zlib.deflate)
// const gzip = util.promisify(zlib.gzip)

// await async.forEach(Array.from(Array(5000).keys()), async (num) => {
//     const data = await sdk.getAuthorsRandom({ limit: _.random(5, 10), offset: _.random(0, 2000) })
//     fs.writeFileSync(`./authors/author-${_.padStart(num.toString(), 2, "0")}.json`, JSON.stringify(data))
// })

const a0 = {
    data: {
        authors: [
            {
                __typename: "authors",
                id: "bc10c5f2-4b80-43f4-bd30-4605492b2b92",
                updated_at: "2022-01-24T21:47:44.084504+00:00",
                name: "33",
                books: [
                    {
                        __typename: "books",
                        id: "cb58bde0-855f-4097-842a-c9fd07ca1593",
                        updated_at: "2022-01-24T21:47:44.084504+00:00",
                        isbn: "978-8-9539-8714-3",
                        title: "Book 1000"
                    },
                    {
                        __typename: "books",
                        id: "a873d4a0-bf9c-4e55-83c3-02c02455ff2a",
                        updated_at: "2022-01-24T21:47:44.084504+00:00",
                        isbn: "978-8-8753-7292-4",
                        title: "Book 1001"
                    },
                    {
                        __typename: "books",
                        id: "5621403a-8e72-48f6-be49-672152e7d35d",
                        updated_at: "2022-01-24T21:47:44.084504+00:00",
                        isbn: "978-4-4046-4722-1",
                        title: "Book 1002"
                    }
                ]
            },
            {
                __typename: "authors",
                id: "09c322e3-38d8-44f2-8b08-53558cab2c0d",
                updated_at: "2022-01-24T21:47:44.056902+00:00",
                name: "15",
                books: [
                    {
                        __typename: "books",
                        id: "cb48d701-ad74-4909-ba7e-b89e920addc6",
                        updated_at: "2022-01-24T21:47:44.056902+00:00",
                        isbn: "978-4-5434-5885-7",
                        title: "Book 1000"
                    }
                ]
            },
            {
                __typename: "authors",
                id: "4509c536-5680-4b7c-9dd7-0b53df00335e",
                updated_at: "2022-01-24T21:47:44.081416+00:00",
                name: "38",
                books: [
                    {
                        __typename: "books",
                        id: "84d77b5e-b248-4504-af04-07cce04c269c",
                        updated_at: "2022-01-24T21:47:44.081416+00:00",
                        isbn: "978-6-3785-1106-3",
                        title: "Book 1000"
                    },
                    {
                        __typename: "books",
                        id: "61af9bd1-61c5-41ac-9630-8aa8f442ea42",
                        updated_at: "2022-01-24T21:47:44.081416+00:00",
                        isbn: "978-6-6998-4495-9",
                        title: "Book 1001"
                    },
                    {
                        __typename: "books",
                        id: "6e06b5ce-d9c3-4c2d-8b35-09b385c72181",
                        updated_at: "2022-01-24T21:47:44.081416+00:00",
                        isbn: "978-7-9223-9125-1",
                        title: "Book 1002"
                    },
                    {
                        __typename: "books",
                        id: "ebdb442c-a684-4d75-b00a-7406289f37b5",
                        updated_at: "2022-01-24T21:47:44.081416+00:00",
                        isbn: "978-3-3725-7691-3",
                        title: "Book 1003"
                    },
                    {
                        __typename: "books",
                        id: "d5a7ef0f-d618-46a0-ba48-4b3857223079",
                        updated_at: "2022-01-24T21:47:44.081416+00:00",
                        isbn: "978-5-5789-5184-4",
                        title: "Book 1004"
                    }
                ]
            },
            {
                __typename: "authors",
                id: "543d0d35-8a65-4d0e-b9f2-f2f4186e4d45",
                updated_at: "2022-01-24T21:47:44.064183+00:00",
                name: "14",
                books: [
                    {
                        __typename: "books",
                        id: "14566e4f-7b9f-4f42-abff-bd322f2b589e",
                        updated_at: "2022-01-24T21:47:44.064183+00:00",
                        isbn: "978-6-2403-2755-3",
                        title: "Book 1000"
                    },
                    {
                        __typename: "books",
                        id: "32c071f0-9b25-4cf2-93cb-ef3c209bf216",
                        updated_at: "2022-01-24T21:47:44.064183+00:00",
                        isbn: "978-4-1653-6562-1",
                        title: "Book 1001"
                    }
                ]
            },
            {
                __typename: "authors",
                id: "a51ac98b-0cff-479e-9608-0203a67b566e",
                updated_at: "2022-01-24T21:47:44.056912+00:00",
                name: "22",
                books: [
                    {
                        __typename: "books",
                        id: "0b33792c-77e5-45b3-a0b9-2e3ba1812ce9",
                        updated_at: "2022-01-24T21:47:44.056912+00:00",
                        isbn: "978-4-4816-2409-9",
                        title: "Book 2000"
                    },
                    {
                        __typename: "books",
                        id: "0a65ac59-9c2f-424d-b4f4-c48b317ebb0d",
                        updated_at: "2022-01-24T21:47:44.056912+00:00",
                        isbn: "978-8-3404-6036-3",
                        title: "Book 2001"
                    },
                    {
                        __typename: "books",
                        id: "013e4997-eadb-4b40-921a-e5691633bd9d",
                        updated_at: "2022-01-24T21:47:44.056912+00:00",
                        isbn: "978-1-3193-8733-7",
                        title: "Book 2002"
                    }
                ]
            }
        ]
    }
}

const a1 = {
    data: {
        authors: [
            {
                __typename: "authors",
                id: "bc10c5f2-4b80-43f4-bd30-4605492b2b92",
                updated_at: "2022-01-24T21:47:44.084504+00:00",
                name: "33",
                books: [
                    {
                        __typename: "books",
                        id: "a873d4a0-bf9c-4e55-83c3-02c02455ff2a",
                        updated_at: "2022-01-24T21:47:44.084504+00:00",
                        isbn: "978-8-8753-7292-4",
                        title: "Book 1001"
                    },
                    {
                        __typename: "books",
                        id: "5621403a-8e72-48f6-be49-672152e7d35d",
                        updated_at: "2022-01-24T21:47:44.084504+00:00",
                        isbn: "978-4-4046-4722-1",
                        title: "Book 1002"
                    }
                ]
            },
            {
                __typename: "authors",
                id: "09c322e3-38d8-44f2-8b08-53558cab2c0d",
                updated_at: "2022-01-24T21:47:44.056902+00:00",
                name: "15",
                books: [
                    {
                        __typename: "books",
                        id: "cb48d701-ad74-4909-ba7e-b89e920addc6",
                        updated_at: "2022-01-24T21:47:44.056902+00:00",
                        isbn: "978-4-5434-5885-7",
                        title: "Book 1000"
                    },
                    {
                        __typename: "books",
                        id: "61af9bd1-61c5-41ac-9630-8aa8c442ea42",
                        updated_at: "2022-01-24T21:47:44.081416+00:00",
                        isbn: "978-6-6998-4495-9",
                        title: "Book 1001"
                    }
                ]
            },
            {
                __typename: "authors",
                id: "4509c536-5680-4b7c-9dd7-0b53df00335e",
                updated_at: "2022-01-24T21:47:44.081416+00:00",
                name: "38",
                books: [
                    {
                        __typename: "books",
                        id: "84d77b5e-b248-4504-af04-07cce04c269c",
                        updated_at: "2022-01-24T21:47:44.081416+00:00",
                        isbn: "978-6-3785-1106-3",
                        title: "Book 1000"
                    },
                    {
                        __typename: "books",
                        id: "6e06b5ce-d9c3-4c2d-8b35-09b385c72181",
                        updated_at: "2022-01-24T21:47:44.081416+00:00",
                        isbn: "978-7-9223-9125-1",
                        title: "Book 1002"
                    },
                    {
                        __typename: "books",
                        id: "ebdb442c-a684-4d75-b00a-7406289f37b5",
                        updated_at: "2022-01-24T21:47:44.081416+00:00",
                        isbn: "978-3-3725-7691-3",
                        title: "Book 1003"
                    }
                ]
            },
            {
                __typename: "authors",
                id: "543d0d35-8a65-4d0e-b9f2-f2f4186e4d45",
                updated_at: "2022-01-24T21:47:44.064183+00:00",
                name: "13",
                books: [
                    {
                        __typename: "books",
                        id: "14566e4f-7b9f-4f42-abff-bd322f2b589e",
                        updated_at: "2022-01-24T21:47:44.064183+00:00",
                        isbn: "978-6-2403-2755-3",
                        title: "Book 1000"
                    },
                    {
                        __typename: "books",
                        id: "32c071f0-9b25-4cf2-93cb-ef3c209bf216",
                        updated_at: "2022-01-24T21:47:44.064183+00:00",
                        isbn: "978-4-1653-6562-1",
                        title: "Book 1001"
                    },
                    {
                        __typename: "books",
                        id: "d5a7ef0f-d629-46a0-ba48-4b3857223079",
                        updated_at: "2022-01-24T21:47:44.081416+00:00",
                        isbn: "978-5-5789-5184-4",
                        title: "Book 1004"
                    }
                ]
            },
            {
                __typename: "authors",
                id: "a51ac98b-0cff-479e-9608-0203a67b566e",
                updated_at: "2022-01-24T21:47:44.056912+00:00",
                name: "22",
                books: [
                    {
                        __typename: "books",
                        id: "0b33792c-77e5-45b3-a0b9-2e3ba1812ce9",
                        updated_at: "2022-01-24T21:47:44.056912+00:00",
                        isbn: "978-4-4816-2409-9",
                        title: "Book 2000"
                    },
                    {
                        __typename: "books",
                        id: "0a65ac59-9c2f-424d-b4f4-c48b317ebb0d",
                        updated_at: "2022-01-24T21:47:44.056912+00:00",
                        isbn: "978-8-3404-6036-3",
                        title: "Book 2001"
                    },
                    {
                        __typename: "books",
                        id: "013e4997-eadb-4b40-921a-e5691633bd9d",
                        updated_at: "2022-01-24T21:47:44.056912+00:00",
                        isbn: "978-1-3193-8733-7",
                        title: "Book 2002"
                    }
                ]
            }
        ]
    }
}

let updates = _.pickDeep(a0, ["updated_at"])
let res = _.mapDeep(_.pickDeep(a0, ["updated_at"]), (v) => v, { leavesOnly: true })
let max = _.max(_.mapDeep(_.pickDeep(a0, ["updated_at"]), (v) => v, { leavesOnly: true }))
console.log("updates", JSON.stringify(updates, null, 2))
console.log("res", JSON.stringify(res, null, 2))
console.log("max", JSON.stringify(max, null, 2))

let max2 = _.reduceDeep(a0, (acc, value, key, parent, ctx) => {
    if (key === "updated_at" && value > acc) return value
    return acc
}, "2022-01-01T00:00:00.000000+00:00")

console.log("max2", max2)

// const authors = await sdk.getAuthorsRandom({ limit: _.random(5, 10), offset: _.random(0, 2000) })

// fs.writeFileSync("./authordata.json", JSON.stringify(authors))

// const str = Readable.from(Buffer.from(JSON.stringify(authors)))

// async function stream2buffer(stream: Stream): Promise<Buffer> {
//     return new Promise<Buffer>((resolve, reject) => {
//         const _buf = Array<any>()

//         stream.on("data", (chunk: any) => _buf.push(chunk))
//         stream.on("end", () => resolve(Buffer.concat(_buf)))
//         stream.on("error", (err: any) => reject(`error converting stream - ${err}`))
//     })
// }

// var enc = new TextEncoder()

// str.pipe(ZSTDCompress(3))

// str.push(enc.encode(JSON.stringify(authors)))

// const zstdCompress = await stream2buffer(str.pipe(ZSTDCompress(3)))
// console.log("zstdCompress", zstdCompress.byteLength)

// const patch = instance.diff(a0, a1)!

// console.log("patch", JSON.stringify(patch))

// let zstdCompress: any
// let zstdCompressDict: any

// ZstdCodec.run((zstd: any) => {
//     const simple = new zstd.Simple();
//     // const streaming = new zstd.Streaming();

//     const level = 10
//
//     const cdict = new zstd.Dict.Compression(dict, level)
//     zstdCompressDict = simple.compressUsingDict(Buffer.from(JSON.stringify(authors)), cdict);

//     // zstdCompress = simple.compress(Buffer.from(JSON.stringify(authors)), level);

//     // console.log("compressed", zstdCompress.byteLength)
// });

// const dict = fs.readFileSync("./dict2")

// var suite = new Benchmark.Suite("blah", { minTime: 10, maxTime: 20 })

// suite
//     .add("patchDeflate", {
//         defer: true,
//         fn: async (deferred: any) => {
//             const patch = instance.diff(a0, a1)!
//             await deflate(JSON.stringify(patch))
//             deferred.resolve()
//         }
//     })
//     .add("patchGzip", {
//         defer: true,
//         fn: async (deferred: any) => {
//             const patch = instance.diff(a0, a1)!
//             await gzip(JSON.stringify(patch))
//             deferred.resolve()
//         }
//     })
//     .add("deflate", {
//         defer: true,
//         fn: async (deferred: any) => {
//             const patch = instance.diff(a0, a1)!
//             await deflate(JSON.stringify(patch))
//             deferred.resolve()
//         }
//     })
//     .add("gzip", {
//         defer: true,
//         fn: async (deferred: any) => {
//             const patch = instance.diff(a0, a1)!
//             await gzip(JSON.stringify(patch))
//             deferred.resolve()
//         }
//     })
//     .add("zstdCompress (level=5)", {
//         defer: true,
//         fn: async (deferred: any) => {
//             const patch = instance.diff(a0, a1)!
//             await compress(Buffer.from(JSON.stringify(patch)), { level: 5 })
//             deferred.resolve()
//         }
//     })
//     .add("zstdCompress (level=10)", {
//         defer: true,
//         fn: async (deferred: any) => {
//             const patch = instance.diff(a0, a1)!
//             await compress(Buffer.from(JSON.stringify(patch)), { level: 10 })
//             deferred.resolve()
//         }
//     })
//     .add("zstdCompress (level=15)", {
//         defer: true,
//         fn: async (deferred: any) => {
//             const patch = instance.diff(a0, a1)!
//             await compress(Buffer.from(JSON.stringify(patch)), { level: 15 })
//             deferred.resolve()
//         }
//     })
//     .add("zstdCompressDict (level=5)", {
//         defer: true,
//         fn: async (deferred: any) => {
//             const patch = instance.diff(a0, a1)!
//             await compress(Buffer.from(JSON.stringify(patch)), {
//                 level: 5,
//                 dict: dict,
//                 dictSize: dict.length
//             })
//             deferred.resolve()
//         }
//     })
//     .add("zstdCompressDict (level=10)", {
//         defer: true,
//         fn: async (deferred: any) => {
//             const patch = instance.diff(a0, a1)!
//             await compress(Buffer.from(JSON.stringify(patch)), {
//                 level: 10,
//                 dict: dict,
//                 dictSize: dict.length
//             })
//             deferred.resolve()
//         }
//     })
//     .add("zstdCompressDict (level=15)", {
//         defer: true,
//         fn: async (deferred: any) => {
//             const patch = instance.diff(a0, a1)!
//             await compress(Buffer.from(JSON.stringify(patch)), {
//                 level: 15,
//                 dict: dict,
//                 dictSize: dict.length
//             })
//             deferred.resolve()
//         }
//     })
//     .on("cycle", (event: any) => {
//         bb.add(event.target)
//     })
//     .on("complete", () => {
//         bb.log()
//     })
//     .run({ async: true })

// const zstdCompress5 = await compress(Buffer.from(JSON.stringify(patch)), { level: 5 })
// const zstdCompress10 = await compress(Buffer.from(JSON.stringify(patch)), { level: 10 })
// const zstdCompress15 = await compress(Buffer.from(JSON.stringify(patch)), { level: 15 })
// const zstdCompressDict5 = await compress(Buffer.from(JSON.stringify(patch)), {
//     level: 5,
//     dict: dict,
//     dictSize: dict.length
// })
// const zstdCompressDict10 = await compress(Buffer.from(JSON.stringify(patch)), {
//     level: 10,
//     dict: dict,
//     dictSize: dict.length
// })
// const zstdCompressDict15 = await compress(Buffer.from(JSON.stringify(patch)), {
//     level: 15,
//     dict: dict,
//     dictSize: dict.length
// })

// const patchDeflate = await deflate(JSON.stringify(patch))
// const patchGzip = await gzip(JSON.stringify(patch))

// const deflated = await deflate(JSON.stringify(patch))
// const gzipped = await gzip(JSON.stringify(patch))

// const patchSize = Buffer.byteLength(JSON.stringify(patch))
// const stringSize = Buffer.byteLength(JSON.stringify(patch))
// const deflatedSize = deflated.byteLength
// const gzippedSize = gzipped.byteLength
// const patchDeflateSize = patchDeflate.byteLength
// const patchGzipSize = patchGzip.byteLength
// const zstdCompressSize5 = zstdCompress5?.byteLength
// const zstdCompressDictSize5 = zstdCompressDict5?.byteLength
// const zstdCompressSize10 = zstdCompress10?.byteLength
// const zstdCompressDictSize10 = zstdCompressDict10?.byteLength
// const zstdCompressSize15 = zstdCompress15?.byteLength
// const zstdCompressDictSize15 = zstdCompressDict15?.byteLength

// console.table([
//     { method: "raw JSON", bytes: stringSize },
//     { method: "patchSize", bytes: patchSize },
//     { method: "deflatedSize", bytes: deflatedSize },
//     { method: "gzippedSize", bytes: gzippedSize },
//     { method: "patchDeflateSize", bytes: patchDeflateSize },
//     { method: "patchGzipSize", bytes: patchGzipSize },
//     { method: "zstdCompressSize5", bytes: zstdCompressSize5 },
//     { method: "zstdCompressSize10", bytes: zstdCompressSize10 },
//     { method: "zstdCompressSize15", bytes: zstdCompressSize15 },
//     { method: "zstdCompressDictSize5", bytes: zstdCompressDictSize5 },
//     { method: "zstdCompressDictSize10", bytes: zstdCompressDictSize10 },
//     { method: "zstdCompressDictSize15", bytes: zstdCompressDictSize15 }
// ])
