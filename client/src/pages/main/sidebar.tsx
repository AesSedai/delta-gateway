import { Box, Button, Divider, Stack, Theme } from "@mui/material"
import { makeStyles } from "@mui/styles"
import async from "async"
import localforage from "localforage"
import { last, random, sample } from "lodash"
import { FC, useEffect, useState } from "react"
import {
    AuthorsDocument,
    Authors_Insert_Input,
    useAddBookMutation,
    useDeleteBookMutation,
    useGetAuthorsQuery,
    useResetAuthorsMutation,
    useSeedAuthorsMutation,
    useUpdateAuthorMutation,
    useUpdateBookMutation
} from "../../graphql/graphql"
import { sleep } from "../../utils/sleep"

const useStyles = makeStyles<Theme>((theme) => ({}))

export const Sidebar: FC = () => {
    const classes = useStyles()
    const [running, setRunning] = useState<boolean>(false)
    const [actions, setActions] = useState({ total: 100, current: 0 })

    // Using a subscription directly is not recommended,
    // because apollo will trigger a subscription twice.
    // REF: https://github.com/apollographql/apollo-client/issues/6037
    // Also, usually apollo clients aren't split, so to access the same data
    // as the authorSub and authorLiveSub components, we'll just use the
    // normal subscription here so we can get IDs, etc.
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

                return subscriptionData.data
            }
        })
    }, [])
    const [updateAuthorMutation] = useUpdateAuthorMutation()
    const [updateBookMutation] = useUpdateBookMutation()
    const [addBookMutation] = useAddBookMutation()
    const [deleteBookMutation] = useDeleteBookMutation()
    const [resetAuthorsMutation] = useResetAuthorsMutation()
    const [seedAuthorsMutation] = useSeedAuthorsMutation()

    if (authors.error != null || authors.data == null) {
        if (authors.error != null) {
            console.log("errors", authors.error)
        }
        return null
    }

    const updateAuthor = async () => {
        if (authors.data?.authors != null) {
            const randomAuthor = sample(authors.data.authors)
            if (randomAuthor != null) {
                const name = `New Author Name ${random(1000, 9999)}`
                await updateAuthorMutation({
                    variables: { id: randomAuthor.id, name: name }
                })
            }
        }
    }

    const updateBook = async () => {
        if (authors.data?.authors != null) {
            const randomAuthor = sample(authors.data.authors)
            if (randomAuthor != null) {
                const randomBook = sample(randomAuthor.books)
                if (randomBook != null) {
                    const title = `New Book Title ${random(1000, 9999)}`
                    await updateBookMutation({
                        variables: { id: randomBook.id, title: title }
                    })
                }
            }
        }
    }

    const addBook = async () => {
        if (authors.data?.authors != null) {
            const randomAuthor = sample(authors.data.authors)
            if (randomAuthor != null) {
                const title = `New Book Title ${random(1000, 9999)}`
                await addBookMutation({
                    variables: {
                        book: {
                            author_id: randomAuthor.id,
                            title: title,
                            isbn: `978-${random(1, 9)}-${random(1000, 9999)}-${random(1000, 9999)}-${random(1, 9)}`
                        }
                    }
                })
            }
        }
    }

    const deleteBook = async () => {
        if (authors.data?.authors != null) {
            const randomAuthor = sample(authors.data.authors)
            if (randomAuthor != null) {
                const randomBook = sample(randomAuthor.books)
                if (randomBook != null) {
                    await deleteBookMutation({
                        variables: { id: randomBook.id }
                    })
                }
            }
        }
    }

    const randomActions = async () => {
        let ops = [updateAuthor, updateBook, addBook, deleteBook]
        setActions({ total: 100, current: 0 })
        setRunning(true)
        await async.eachSeries(Array.from(Array(100).keys()), async (f: number) => {
            const op = sample(ops)
            if (op != null) {
                await op()
                await sleep(100)
            }
            setActions({ ...actions, current: f })
        })
        setRunning(false)
    }

    const removeAll = async () => {
        await resetAuthorsMutation()
    }

    const seed = async () => {
        let lastAuthorIdx = parseInt(
            authors.data?.authors.reduce((acc, author) => {
                const name = author.name || ""
                const idx = parseInt(last(name.split(" ")) || "1").toString()
                return acc > idx ? acc : idx || ""
            }, "0") || "0"
        )
        const a: Authors_Insert_Input[] = Array.from(Array(3), (_j, i) => {
            return {
                name: `Author ${(i + 1 + lastAuthorIdx).toString().padStart(3, "0")}`,
                books: {
                    data: Array.from(Array(random(1, 5)), (_j, j) => {
                        return {
                            title: `Book ${(i + 1 + lastAuthorIdx) * 1000 + j}`,
                            isbn: `978-${random(1, 9)}-${random(1000, 9999)}-${random(1000, 9999)}-${random(1, 9)}`
                        }
                    })
                }
            }
        })

        await seedAuthorsMutation({ variables: { authors: a } })
    }

    const resetCache = async () => {
        await localforage.clear()
        window.location.reload()
    }

    return (
        <Box display="flex" sx={{ flex: "1 1 100%" }}>
            <Stack sx={{ width: "100%" }}>
                <Button onClick={removeAll}>Remove Authors from Database</Button>
                <Button onClick={resetCache}>Reset web cache and refresh</Button>
                <Divider></Divider>
                <Button onClick={seed}>Add 3 Authors</Button>
                <Button onClick={updateAuthor}>Update Random Author</Button>
                <Button onClick={updateBook}>Update Random Book</Button>
                <Button onClick={addBook}>Add Random Book</Button>
                <Button onClick={deleteBook}>Remove Random Book</Button>
                <Divider></Divider>
                <Button onClick={randomActions} disabled={running}>
                    {running ? `Action ${actions.current} / ${actions.total}` : "Perform 100 Random Actions"}
                </Button>
            </Stack>
        </Box>
    )
}
