import { ApolloLink, FetchResult, Observable, Operation } from "@apollo/client/core"
import { GraphQLError, print } from "graphql"
import { Client, ClientOptions, createClient } from "graphql-ws"

export class GraphqlWsLink extends ApolloLink {
    client: Client

    constructor(options: ClientOptions) {
        super()
        this.client = createClient(options)
    }

    public request(operation: Operation): Observable<FetchResult> {
        return new Observable((sink) => {
            return this.client.subscribe<FetchResult>(
                { ...operation, query: print(operation.query) },
                {
                    next: sink.next.bind(sink),
                    complete: sink.complete.bind(sink),
                    error: (err) => {
                        if (err instanceof Error) {
                            return sink.error(err)
                        }

                        if (err instanceof CloseEvent) {
                            return sink.error(
                                // reason will be available on clean closes
                                new Error(
                                    `Socket closed with event ${err.code} ${err.reason.length > 0 ? err.reason : ""}`
                                )
                            )
                        }

                        return sink.error(new Error((err as GraphQLError[]).map(({ message }) => message).join(", ")))
                    }
                }
            )
        })
    }
}
