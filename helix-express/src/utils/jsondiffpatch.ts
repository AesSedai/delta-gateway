import * as jsonDiffPatch from "jsondiffpatch"
import * as jsondiffpatchArraysByHash from "jsondiffpatch-arrays-by-hash"
import hasha from "hasha"
import _ from "lodash"

export const instance = jsonDiffPatch.create({
    objectHash: (obj: any, idx: number) => {
        if (_.has(obj, "id") && _.has(obj, "__typename")) {
            return `${obj.__typename}:${obj.id}`
        } else if (_.has(obj, "id")) {
            return obj.id
        } else if (_.has(obj, "__ref")) {
            return obj.__ref
        } else {
            const newObj = _.chain(obj).toPairs().sortBy(0).fromPairs().value()
            const hash = hasha(JSON.stringify(newObj), { algorithm: "md5" })
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
