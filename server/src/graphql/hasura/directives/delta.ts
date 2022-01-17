import { astFromDirective } from "@graphql-tools/utils"
import { DirectiveLocation, GraphQLDirective, GraphQLString, print } from "graphql"

export const GraphQLDeltaDirective = new GraphQLDirective({
    name: "delta",
    description: "Instruction for establishing a live connection that is updated once the underlying data changes.",
    locations: [DirectiveLocation.SUBSCRIPTION],
    args: {
        rev: {
            type: GraphQLString,
            description: "Starting revision"
        }
    }
})

export const GraphQLDeltaDirectiveAST = astFromDirective(GraphQLDeltaDirective)
export const GraphQLDeltaDirectiveSDL = print(GraphQLDeltaDirectiveAST)

