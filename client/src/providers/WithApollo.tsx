import { ApolloClient, ApolloProvider, from, InMemoryCache, NormalizedCacheObject } from "@apollo/client"
import { onError } from "@apollo/client/link/error"
import { RetryLink } from "@apollo/client/link/retry"
import { WebSocketLink } from "@apollo/client/link/ws"
import { CachePersistor, LocalForageWrapper } from "apollo3-cache-persist"
import localforage from "localforage"
import { useState } from "react"
import useAsyncEffect from "use-async-effect"
import { StrictTypedTypePolicies } from "../graphql/graphql"
import { GraphqlWsLink } from "../utils/grapqhlWsLink"
import { PersistanceProvider } from "./PersistenceProvider"

interface WithApolloProps {
    cacheKey?: string
    children: React.ReactNode
}

export const WithApollo = (props: WithApolloProps): JSX.Element => {
    const { children, cacheKey } = props
    const [client, setClient] = useState<ApolloClient<NormalizedCacheObject>>()
    const [persistor, setPersistor] = useState<CachePersistor<NormalizedCacheObject>>()

    useAsyncEffect(async () => {
        // type policy to prevent Apollo Client from caching the patch data
        const typePolicies: StrictTypedTypePolicies = {
            delta: {
                fields: {
                    patch: {
                        merge() {
                            return ""
                        }
                    }
                }
            }
        }

        const cache = new InMemoryCache({
            typePolicies
        })

        const newPersistor = new CachePersistor({
            cache,
            storage: new LocalForageWrapper(localforage),
            key: cacheKey == null ? "apollo-cache-persist" : cacheKey,
            debug: false,
            trigger: "write",
            maxSize: false
        })
        // void newPersistor.purge()
        await newPersistor.restore()
        setPersistor(newPersistor)

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

    return (
        <ApolloProvider client={client}>
            <PersistanceProvider persistor={persistor}>{children}</PersistanceProvider>
        </ApolloProvider>
    )
}
