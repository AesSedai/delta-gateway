import ChevronRightIcon from "@mui/icons-material/ChevronRight"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import { TreeItem, TreeView } from "@mui/lab"
import { Box, Button, Stack, Theme, Typography } from "@mui/material"
import { makeStyles } from "@mui/styles"
import localforage from "localforage"
import { cloneDeep } from "lodash"
import { FC, useState } from "react"
import useAsyncEffect from "use-async-effect"
import { AuthorsLiveDocument, AuthorsLiveSubscription, useGetAuthorsQuery } from "../../graphql/graphql"
import { instance } from "../../utils/jsondiffpatch"

const useStyles = makeStyles<Theme>((theme) => ({}))

export const AuthorLiveSub: FC = () => {
    const classes = useStyles()
    const [lastPatch, setLastPatch] = useState<string>("")
    const [lastUpdated, setLastUpdated] = useState<string>("")
    const [expanded, setExpanded] = useState<string[]>([])
    const [totalData, setTotalData] = useState<number>(0)

    // Using a subscription directly is not recommended,
    // because apollo will trigger a subscription twice.
    // REF: https://github.com/apollographql/apollo-client/issues/6037
    const authors = useGetAuthorsQuery({
        fetchPolicy: "cache-only"
    })

    useAsyncEffect(async () => {
        // read from cache

        let timestamp: string | null = await localforage.getItem("AuthorsLiveLastUpdated")

        if (timestamp == null) {
            timestamp = "2022-01-01T00:00:00.000000+00:00"
        }

        setLastUpdated(timestamp)
        authors.subscribeToMore({
            document: AuthorsLiveDocument,
            variables: { lastUpdated: timestamp, limit: 50 },
            updateQuery: (
                prev,
                { subscriptionData: { data } }: { subscriptionData: { data: AuthorsLiveSubscription } }
            ) => {
                console.log("prev", prev, "data", data)
                if (data?.live.delta.patch != null) {

                    console.log(cloneDeep(prev), "patch", JSON.parse(data.live.delta.patch))

                    let patchResult: any
                    if (prev != null) {
                        patchResult = instance.patch(cloneDeep(prev), JSON.parse(data.live.delta.patch))
                    } else {
                        patchResult = instance.patch({}, JSON.parse(data.live.delta.patch))
                    }

                    void localforage.setItem("AuthorsLiveLastUpdated", data.live.delta.lastUpdated)
                    setLastUpdated(data.live.delta.lastUpdated)
                    setLastPatch(data.live.delta.patch)
                    setTotalData((prevState) => prevState + JSON.stringify(data).length)

                    return patchResult
                }

                return prev
            }
        })
    }, [])

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
                    <pre>{lastPatch.length > 0 ? JSON.stringify(JSON.parse(lastPatch), null, 2) : ""}</pre>
                </Box>
            </Stack>
        </Box>
    )
}
