import ChevronRightIcon from "@mui/icons-material/ChevronRight"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import { TreeItem, TreeView } from "@mui/lab"
import { Box, Button, Stack, Theme, Typography } from "@mui/material"
import { makeStyles } from "@mui/styles"
import { FC, useEffect, useState } from "react"
import { AuthorsDocument, useGetAuthorsQuery } from "../../graphql/graphql"

const useStyles = makeStyles<Theme>((theme) => ({}))

export const AuthorSub: FC = () => {
    const classes = useStyles()
    const [expanded, setExpanded] = useState<string[]>([])
    const [totalData, setTotalData] = useState<number>(0)

    // Using a subscription directly is not recommended,
    // because apollo will trigger a subscription twice.
    // REF: https://github.com/apollographql/apollo-client/issues/6037
    const authors = useGetAuthorsQuery({
        fetchPolicy: "cache-only"
    })

    useEffect(() => {
        authors.subscribeToMore({
            document: AuthorsDocument,
            variables: { limit: 50 },
            updateQuery: (prev, { subscriptionData }) => {
                if (!subscriptionData.data) {
                    return prev
                }

                setTotalData((prevState) => prevState + JSON.stringify(subscriptionData.data).length)

                return subscriptionData.data
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
                    Regular Subscription
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
                    <Typography>Last data: {JSON.stringify(authors.data).length} bytes</Typography>
                    <Typography>Total data: {totalData} bytes</Typography>
                    <pre>{JSON.stringify(authors.data, null, 2)}</pre>
                </Box>
            </Stack>
        </Box>
    )
}
