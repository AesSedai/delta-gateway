import { Box, Divider, Grid, Paper, Theme } from "@mui/material"
import { makeStyles } from "@mui/styles"
import { FC } from "react"
import { WithApollo } from "../../providers/WithApollo"
import { AuthorLiveSub } from "./authorLiveSub"
import { AuthorSub } from "./authorSub"
import { BookSub } from "./bookSub"
import { BookLiveSub } from "./bookLiveSub"
import { Sidebar } from "./sidebar"

const useStyles = makeStyles<Theme>((theme) => ({
    paper: {
        padding: theme.spacing(2),
        width: "100%",
        display: "flex"
    }
}))

export const MainPage: FC = () => {
    const classes = useStyles()

    return (
        <Grid container spacing={2} p={2}>
            <Grid item xs={3}>
                <Paper className={classes.paper}>
                    <WithApollo cacheKey="Sidebar">
                        <Sidebar />
                    </WithApollo>
                </Paper>
            </Grid>
            <Grid item xs={6}>
                <Paper className={classes.paper}>
                    <Box display="flex" sx={{ flex: "1 0 50%" }}>
                        <WithApollo cacheKey="AuthorSub">
                            <AuthorSub />
                        </WithApollo>
                    </Box>
                    <Divider orientation="vertical" flexItem />
                    <Box display="flex" sx={{ flex: "1 0 50%", pl: 2 }}>
                        <WithApollo cacheKey="AuthorLiveSub">
                            <AuthorLiveSub />
                        </WithApollo>
                    </Box>
                </Paper>
            </Grid>
            <Grid item xs={3}></Grid>
        </Grid>
    )
}
