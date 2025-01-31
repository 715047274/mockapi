import {
    ApolloClient,
    InMemoryCache,
    HttpLink,
    ApolloLink,
    from,
    ApolloQueryResult,
    NormalizedCacheObject,
    FetchResult,
} from '@apollo/client';
import { RetryLink } from '@apollo/client/link/retry';
import { onError } from '@apollo/client/link/error';
import { GetUrl } from '@utils/ApiUrlUtils';
import { isDayforceMode } from '@utils/AppModeUtil';
import {
    HEADER_MEDIA_TYPE_ACCEPT,
    HEADER_MEDIA_TYPE_CONTENT_TYPE,
} from '@models/constants/RequestHeaderConstants';
import { useMemo } from 'react';

const MAX_CACHE_SIZE = 20;
const MAX_RETRY_COUNT = 3;
const INITIAL_RETRY_DELAY_MILLISECONDS = 2000;
const MAX_RETRY_DELAY_MILLISECONDS = 10000;

// eslint-disable-next-line
let apolloClients = {};

export const useGetApolloClient = (
    module: string
): ApolloClient<NormalizedCacheObject> => {
    const client = useMemo(() => {
        return getClientForApollo(module);
    }, [module]);

    return client;
};

// eslint-disable-next-line
function getClient(module: string): ApolloClient<NormalizedCacheObject> {
    if (!apolloClients[module]) {
        const httpLink = new HttpLink({
            uri: GetUrl(module),
            headers: {
                'content-type': HEADER_MEDIA_TYPE_CONTENT_TYPE,
                accept: HEADER_MEDIA_TYPE_ACCEPT,
            },
        });

        const errorLink = onError(({ graphQLErrors, networkError }) => {
            if (graphQLErrors) {
                graphQLErrors.forEach(({ message, locations, path }) => {
                    console.error(
                        `[GraphQL error]: Module: ${module}, Message: ${message}, Location: ${locations}, Path: ${path}.`
                    );
                });
            }

            if (
                networkError &&
                networkError.message !== 'Only absolute URLs are supported' &&
                !isDayforceMode()
            ) {
                console.error(
                    `[GraphQL Network error]: Module: ${module}, Message: ${networkError}.`
                );
            }
        });

        const retryLink = new RetryLink({
            delay: {
                initial: INITIAL_RETRY_DELAY_MILLISECONDS,
                max: MAX_RETRY_DELAY_MILLISECONDS,
                jitter: true,
            },
            attempts: {
                max: MAX_RETRY_COUNT,
                retryIf: (error, operation) => {
                    const isQuery =
                        operation &&
                        operation.query &&
                        operation.query.definitions &&
                        Array.isArray(operation.query.definitions) &&
                        operation.query.definitions.some(
                            (def) =>
                                def.kind === 'OperationDefinition' &&
                                def.operation === 'query'
                        );
                    return (
                        isQuery &&
                        error &&
                        (error.statusCode === 400 ||
                            error.statusCode === 408 ||
                            (error.statusCode >= 500 && error.statusCode < 600))
                    );
                },
            },
        });

        const authMiddleware = new ApolloLink((operation, forward) => {
            operation.setContext(({ headers = {} }) => ({
                headers: {
                    ...headers,
                },
            }));

            return forward(operation);
        });

        apolloClients[module] = new ApolloClient({
            link: from([authMiddleware, retryLink, errorLink, httpLink]),
            cache: new InMemoryCache({
                resultCaching: true,
                addTypename: false,
                resultCacheMaxSize: MAX_CACHE_SIZE,
                typePolicies: {
                    Query: {
                        fields: {
                            items: {
                                merge(existing = [], incoming: any) {
                                    return { ...existing, ...incoming };
                                },
                            },
                        },
                    },
                },
            }),
            // connectToDevTools: true,
            defaultOptions: {
                watchQuery: {
                    fetchPolicy: 'cache-and-network',
                    errorPolicy: 'ignore',
                },
                query: {
                    fetchPolicy: 'network-only',
                    errorPolicy: 'all',
                },
                mutate: {
                    fetchPolicy: 'network-only',
                    errorPolicy: 'all',
                },
            },
        });
    }

    return apolloClients[module];
}

export function getClientForApollo(
    module: string
): ApolloClient<NormalizedCacheObject> {
    const httpLink = new HttpLink({
        uri: GetUrl(module),
        headers: {
            'content-type': HEADER_MEDIA_TYPE_CONTENT_TYPE,
            accept: HEADER_MEDIA_TYPE_ACCEPT,
        },
    });

    const errorLink = onError(({ graphQLErrors, networkError }) => {
        if (graphQLErrors) {
            graphQLErrors.forEach(({ message, locations, path }) => {
                console.error(
                    `[GraphQL error]: Module: ${module}, Message: ${message}, Location: ${locations}, Path: ${path}.`
                );
            });
        }

        if (
            networkError &&
            networkError.message !== 'Only absolute URLs are supported' &&
            !isDayforceMode()
        ) {
            console.error(
                `[GraphQL Network error]: Module: ${module}, Message: ${networkError}.`
            );
        }
    });

    const retryLink = new RetryLink({
        delay: {
            initial: INITIAL_RETRY_DELAY_MILLISECONDS,
            max: MAX_RETRY_DELAY_MILLISECONDS,
            jitter: true,
        },
        attempts: {
            max: MAX_RETRY_COUNT,
            retryIf: (error, operation) => {
                const isQuery =
                    operation &&
                    operation.query &&
                    operation.query.definitions &&
                    Array.isArray(operation.query.definitions) &&
                    operation.query.definitions.some(
                        (def) =>
                            def.kind === 'OperationDefinition' &&
                            def.operation === 'query'
                    );
                return (
                    isQuery &&
                    error &&
                    (error.statusCode === 400 ||
                        error.statusCode === 408 ||
                        (error.statusCode >= 500 && error.statusCode < 600))
                );
            },
        },
    });

    const authMiddleware = new ApolloLink((operation, forward) => {
        operation.setContext(({ headers = {} }) => ({
            headers: {
                ...headers,
            },
        }));

        return forward(operation);
    });

    const client = new ApolloClient({
        link: from([authMiddleware, retryLink, errorLink, httpLink]),
        cache: new InMemoryCache({
            resultCaching: true,
            addTypename: false,
            typePolicies: {
                Query: {
                    fields: {
                        items: {
                            merge(existing = [], incoming: any) {
                                return { ...existing, ...incoming };
                            },
                        },
                    },
                },
            },
        }),
        // connectToDevTools: true,
        defaultOptions: {
            watchQuery: {
                fetchPolicy: 'cache-and-network',
                errorPolicy: 'ignore',
            },
            query: {
                fetchPolicy: 'cache-first',
                errorPolicy: 'all',
            },
            mutate: {
                fetchPolicy: 'network-only',
                errorPolicy: 'all',
            },
        },
    });

    return client;
}

const pollingOperations = [];

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function query(
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    query: any,
    variables: unknown,
    module: string,
    signal: AbortSignal = null,
    waitIfStillPending = false
): Promise<ApolloQueryResult<any>> {
    const waitableQueryName = waitIfStillPending
        ? query.definitions?.[0]?.name?.value
        : null;

    if (waitableQueryName) {
        if (pollingOperations.indexOf(waitableQueryName) > -1) {
            return Promise.resolve(null);
        }

        pollingOperations.push(waitableQueryName);
    }

    const client = getClient(module);

    const options = signal
        ? {
              query,
              variables,
              context: { fetchOptions: { signal } },
          }
        : { query, variables };

    return client.query(options).finally(() => {
        waitableQueryName &&
            pollingOperations.splice(
                pollingOperations.indexOf(waitableQueryName),
                1
            );
    });
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function mutate(
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    mutation: any,
    variables: unknown,
    module: string,
    signal: AbortSignal = null
): Promise<FetchResult<any>> {
    const client = getClient(module);
    const options = signal
        ? {
              mutation,
              variables,
              context: { fetchOptions: { signal } },
          }
        : { mutation, variables };
    return client.mutate(options).finally(() => {
        apolloClients[module] && apolloClients[module].resetStore(); //clear cache to avoid dirty data in front end.
    });
}
