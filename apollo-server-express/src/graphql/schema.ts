import { stitchSchemas } from "@graphql-tools/stitch"
import { hasuraSchemaAdmin, hasuraSchemaUser } from "./hasura/schema"
import { localSchemaAdmin, localSchemaUser } from "./local/schema"

export const adminSchema = stitchSchemas({
    subschemas: [localSchemaAdmin, hasuraSchemaAdmin]
})

export const userSchema = stitchSchemas({
    subschemas: [localSchemaUser, hasuraSchemaUser]
})
