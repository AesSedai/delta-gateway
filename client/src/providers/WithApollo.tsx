import { ApolloClient, ApolloProvider, from, InMemoryCache, NormalizedCacheObject } from "@apollo/client"
import { onError } from "@apollo/client/link/error"
import { RetryLink } from "@apollo/client/link/retry"
import { WebSocketLink } from "@apollo/client/link/ws"
import { FC, useState } from "react"
import useAsyncEffect from "use-async-effect"
import { GraphqlWsLink } from "../utils/grapqhlWsLink"

export const WithApollo: FC = ({ children }) => {
    const [client, setClient] = useState<ApolloClient<NormalizedCacheObject>>()

    useAsyncEffect(async () => {
        console.log("running async effect")
        const cache = new InMemoryCache({})

        const errorLink = onError(({ graphQLErrors, networkError }) => {
            if (graphQLErrors !== undefined)
                graphQLErrors.forEach(({ message, locations, path }) =>
                    console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`)
                )

            if (networkError !== undefined) {
                console.log(`[Network error]: ${JSON.stringify(networkError)}`)
            }
        })

        const retryLink = new RetryLink({
            delay: {
                initial: 300,
                max: Infinity,
                jitter: true
            },
            attempts: {
                max: 1,
                retryIf: (error: any, _operation) => {
                    console.log("error", error, "operation", _operation)
                    if (error != null) {
                        return true
                    }
                    return false
                }
            }
        })

        const wsLink = new WebSocketLink({
            uri: "ws://127.0.0.1:5002/graphql",
            options: {
                reconnect: true
            }
        })

        const graphqlWsLink = new GraphqlWsLink({
            url: "ws://127.0.0.1:5002/graphql",
            keepAlive: 10000
            // connectionParams: async () => {
            //     const token = await getAuth().currentUser?.getIdToken()
            //     return {
            //         headers: {
            //             Authorization: token !== undefined ? `Bearer ${token}` : ""
            //         }
            //     }
            // }
        })

        const client = new ApolloClient({
            link: from([retryLink, errorLink, wsLink]),
            cache,
            connectToDevTools: true
        })

        setClient(client)
    }, [])

    if (client == null) {
        return <h2>Initializing app...</h2>
    }

    console.log("re-rendered WithApollo", client)

    return <ApolloProvider client={client}>{children}</ApolloProvider>
}
