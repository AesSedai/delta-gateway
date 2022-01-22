import { stitchSchemas } from "@graphql-tools/stitch"
import { schema as hasuraSchema } from "./hasura/schema"
import { schema as localSchema } from "./local/schema"

export const schema = stitchSchemas({
    subschemas: [localSchema, hasuraSchema]
})
