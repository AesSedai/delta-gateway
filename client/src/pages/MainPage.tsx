import ChevronRightIcon from "@mui/icons-material/ChevronRight"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import { TreeItem, TreeView } from "@mui/lab"
import { Box, Button, Divider, Paper, Stack, Theme } from "@mui/material"
import { makeStyles } from "@mui/styles"
import { FC, useState } from "react"
import { useAuthorsQuery, useNotifyAuthorsSubscription } from "../graphql/graphql"

const useStyles = makeStyles<Theme>((theme) => ({
    root: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexGrow: 1
    },
    wrapper: {
        maxWidth: 1440,
        width: "100%",
        flexGrow: 1
    },
    paper: {
        padding: theme.spacing(2),
        height: "100%",
        width: "100%",
        color: theme.palette.text.secondary,
        display: "flex",
        justifyContent: "center"
    },
    loadoutButton: {
        ...theme.typography.h6
    }
}))

export const MainPage: FC = () => {
    const classes = useStyles()
    const authors = useAuthorsQuery()
    const [expanded, setExpanded] = useState<string[]>([])

    if (authors.error != null || authors.data == null) {
        if (authors.error != null) {
            console.log("errors", authors.error)
        }
        return null
    }
    

    console.log("data", authors.data)

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
        <Box className={classes.root} m={2}>
            <Box className={classes.wrapper}>
                <Paper className={classes.paper}>
                    <Box display="flex" sx={{ flex: "1 0 50%" }}>
                        <Stack sx={{ width: "100%" }}>
                            <Box sx={{ mb: 1 }}>
                                <Button onClick={handleExpandClick}>
                                    {expanded.length === 0 ? "Expand all" : "Collapse all"}
                                </Button>
                            </Box>
                            <TreeView
                                defaultCollapseIcon={<ExpandMoreIcon />}
                                defaultExpandIcon={<ChevronRightIcon />}
                                onNodeToggle={handleToggle}
                                expanded={expanded}>
                                {authors.data.authors.map((author) => (
                                    <TreeItem key={author.id} nodeId={author.id} label={author.name ?? ""}>
                                        {author.books.map((book) => (
                                            <TreeItem
                                                key={book.id}
                                                nodeId={book.id}
                                                label={book.title ?? ""}></TreeItem>
                                        ))}
                                    </TreeItem>
                                ))}
                            </TreeView>
                        </Stack>
                    </Box>
                    <Divider orientation="vertical" flexItem />
                    <Box display="flex" sx={{ flex: "1 0 50%" }}>
                        <Stack sx={{ width: "100%" }}>
                            <Box sx={{ m: 1 }}>Other half</Box>
                        </Stack>
                    </Box>
                </Paper>
            </Box>
        </Box>
    )
}
