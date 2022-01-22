import hasha from "hasha"
import * as jsonDiffPatch from "jsondiffpatch"
import _ from "lodash"
import * as jsondiffpatchArraysByHash from "jsondiffpatch-arrays-by-hash"

const t0 = {
    data: {
        users: [
            {
                __typename: "users",
                id: "ce1b2b3c-c3a7-4d82-863d-1b5095724343",
                character: {
                    __typename: "characters",
                    id: "fa78cd08-6961-4920-8dd9-9c9699d3fd7c",
                    mining_spaces: [
                        {
                            __typename: "mining_spaces",
                            id: "5f944df1-43bf-44c2-a8a6-2c8715802142",
                            health: 10,
                            item: {
                                __typename: "items",
                                id: "e73f5786-0b87-4e06-a282-f79f0ef32bb8",
                                internal_name: "ore_stone"
                            }
                        },
                        {
                            __typename: "mining_spaces",
                            id: "9d7f79e9-ee5f-4fbe-9329-d599f83aca8f",
                            health: 10,
                            item: {
                                __typename: "items",
                                id: "e73f5786-0b87-4e06-a282-f79f0ef32bb8",
                                internal_name: "ore_stone"
                            }
                        }
                    ]
                }
            }
        ]
    }
}
const t1 = {
    data: {
        users: [
            {
                __typename: "users",
                id: "ce1b2b3c-c3a7-4d82-863d-1b5095724343",
                character: {
                    __typename: "characters",
                    id: "fa78cd08-6961-4920-8dd9-9c9699d3fd7c",
                    mining_spaces: [
                        {
                            __typename: "mining_spaces",
                            id: "5f944df1-43bf-44c2-a8a6-2c8715802142",
                            health: 9,
                            item: {
                                __typename: "items",
                                id: "e73f5786-0b87-4e06-a282-f79f0ef32bb8",
                                internal_name: "ore_stone"
                            }
                        },
                        {
                            __typename: "mining_spaces",
                            id: "2a11e25c-5285-4ea9-8b0d-45a4d9c9b336",
                            health: 10,
                            item: {
                                __typename: "items",
                                id: "e73f5786-0b87-4e06-a282-f79f0ef32bb8",
                                internal_name: "ore_stone"
                            }
                        },
                        {
                            __typename: "mining_spaces",
                            id: "9d7f79e9-ee5f-4fbe-9329-d599f83aca8f",
                            health: 10,
                            item: {
                                __typename: "items",
                                id: "e73f5786-0b87-4e06-a282-f79f0ef32bb8",
                                internal_name: "ore_stone"
                            }
                        }
                    ]
                }
            }
        ]
    }
}

const instance = jsonDiffPatch.create({
    objectHash: (obj: any, idx: number) => {
        // console.log("trying to hash", JSON.stringify(obj, null, 2))
        if (_.has(obj, "id") && _.has(obj, "__typename")) {
            // console.log("returning", `${obj.__typename}:${obj.id}`)
            return `${obj.__typename}:${obj.id}`
        } else if (_.has(obj, "id")) {
            // console.log("returning", obj.id)
            return obj.id
        } else if (_.has(obj, "__ref")) {
            // console.log("returning", obj.__ref)
            return obj.__ref
        } else {
            const newObj = _.chain(obj).toPairs().sortBy(0).fromPairs().value()
            const hash = hasha(JSON.stringify(newObj), { algorithm: "md5" })
            // console.log("FAILED TO HASH. returning", hash)
            return hash
        }
    },
    arrays: {
        // default true, detect items moved inside the array (otherwise they will be registered as remove+add)
        detectMove: true,
        // default false, the value of items moved is not included in deltas
        includeValueOnMove: false
    }
})

instance.processor.pipes.diff.replace("arrays", jsondiffpatchArraysByHash.diffFilter)
instance.processor.pipes.patch.replace("arrays", jsondiffpatchArraysByHash.patchFilter)
instance.processor.pipes.patch.replace("arraysCollectChildren", jsondiffpatchArraysByHash.collectChildrenPatchFilter)
instance.processor.pipes.reverse.replace("arrays", jsondiffpatchArraysByHash.reverseFilter)
instance.processor.pipes.reverse.replace(
    "arraysCollectChildren",
    jsondiffpatchArraysByHash.collectChildrenReverseFilter
)

let patch: jsonDiffPatch.Delta | undefined = undefined
patch = instance.diff(t0, t1)

let result: any = {}
if (patch != null) {
    console.log("patch", JSON.stringify(patch, null, 2))
    result = instance.patch(_.cloneDeep(t0), patch)
}

console.log("result", JSON.stringify(result, null, 2))
console.log("equal?", _.isEqual(result, t1))
