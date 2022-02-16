import ChevronRightIcon from "@mui/icons-material/ChevronRight"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import { TreeItem, TreeView } from "@mui/lab"
import { Box, Button, Stack, Theme, Typography } from "@mui/material"
import { makeStyles } from "@mui/styles"
import { cloneDeep } from "lodash"
import { FC, useState } from "react"
import {
    GetAuthorsDocument,
    GetAuthorsQuery,
    useAuthorsLiveSubscription,
    useGetAuthorsQuery
} from "../../graphql/graphql"
import { instance } from "../../utils/jsondiffpatch"

const useStyles = makeStyles<Theme>((theme) => ({}))

export const AuthorLiveSub: FC = () => {
    const classes = useStyles()
    const [lastPatch, setLastPatch] = useState<string>("")
    const [lastUpdated, setLastUpdated] = useState<string>("2022-01-01T00:00:00.000000+00:00")
    const [expanded, setExpanded] = useState<string[]>([])
    const [totalData, setTotalData] = useState<number>(0)

    const authors = useGetAuthorsQuery({
        fetchPolicy: "cache-only"
    })
    const authorSub = useAuthorsLiveSubscription({
        variables: {
            lastUpdated: lastUpdated
        },
        onSubscriptionData: ({ client, subscriptionData }) => {
            if (subscriptionData.data?.live.delta.patch != null) {
                const existing = client.readQuery<GetAuthorsQuery>({
                    query: GetAuthorsDocument
                })
                setLastPatch(subscriptionData.data.live.delta.patch)
                let patchResult: any
                if (existing != null) {
                    patchResult = instance.patch(
                        cloneDeep(existing),
                        JSON.parse(subscriptionData.data.live.delta.patch)
                    )
                } else {
                    patchResult = instance.patch({}, JSON.parse(subscriptionData.data.live.delta.patch))
                }
                client.writeQuery({
                    query: GetAuthorsDocument,
                    data: patchResult
                })
                setLastUpdated(subscriptionData.data.live.delta.lastUpdated)
                setTotalData(totalData + JSON.stringify(subscriptionData.data).length)
                console.log("Updated data", patchResult)
            }
        }
    })

    if (authors.error != null || authors.data == null) {
        if (authors.error != null) {
            console.log("errors", authors.error)
        }
        return null
    }

    const handleToggle = (event: React.SyntheticEvent, nodeIds: string[]) => {
        setExpanded(nodeIds)
    }

    const handleExpandClick = () => {
        if (authors != null && authors.data != null) {
            const authorIds = authors.data.authors.map((author) => author.id)
            setExpanded((oldExpanded) => (oldExpanded.length === 0 ? authorIds : []))
        }
    }

    return (
        <Box display="flex" sx={{ flex: "1 0 100%" }}>
            <Stack sx={{ width: "100%" }}>
                <Typography variant="h4" align="center">
                    Delta Subscription
                </Typography>
                <Box sx={{ mb: 1 }}>
                    <Button onClick={handleExpandClick}>{expanded.length === 0 ? "Expand all" : "Collapse all"}</Button>
                </Box>
                <TreeView
                    defaultCollapseIcon={<ExpandMoreIcon />}
                    defaultExpandIcon={<ChevronRightIcon />}
                    onNodeToggle={handleToggle}
                    expanded={expanded}>
                    {authors.data.authors.map((author) => (
                        <TreeItem key={author.id} nodeId={author.id} label={author.name ?? ""}>
                            {author.books.map((book) => (
                                <TreeItem key={book.id} nodeId={book.id} label={book.title ?? ""}></TreeItem>
                            ))}
                        </TreeItem>
                    ))}
                </TreeView>
                <Box sx={{ my: 1 }}>
                    <Typography>Last data: {lastPatch.length} bytes</Typography>
                    <Typography>Total data: {totalData} bytes</Typography>
                    <pre>{JSON.stringify(JSON.parse(lastPatch), null, 2)}</pre>
                </Box>
            </Stack>
        </Box>
    )
}
