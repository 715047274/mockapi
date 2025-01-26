import { NetworkStatus } from '@apollo/client';

import * as FetchDataImport from '@api/common/FetchData';
import * as GraphqlUtilImport from '@api/common/GraphqlUtil';
import * as ApolloResponseParserImport from '@utils/ApolloResponseParser';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function mockQuery<T>(mockData: T): jest.SpyInstance {
    return jest.spyOn(GraphqlUtilImport, 'query').mockReturnValue(
        Promise.resolve({
            data: mockData['data'] ? mockData['data'] : mockData,
            loading: false,
            networkStatus: NetworkStatus.ready,
        })
    );
}

export function mockQueryToBeParsed<T>(
    queryName: string,
    data: T
): jest.SpyInstance {
    const response = {
        data: {
            [queryName]: data,
        },
        loading: false,
        networkStatus: NetworkStatus.ready,
    };
    return mockQuery(response);
}

export function mockParseApolloQueryResult(): void {
    jest.spyOn(
        ApolloResponseParserImport,
        'parseApolloQueryResult'
    ).mockImplementation((firstArg) => firstArg?.data);
}

type objectType = Record<string, any>;
export function mockFetchData(
    responseSettings?: {
        responseMetadata?: objectType;
        json?: objectType;
    }[]
): jest.SpyInstance {
    const responses = [];
    responseSettings?.forEach((responseSetting) => {
        responses.push({
            ...(responseSetting.responseMetadata || { ok: true }),
            json: () => Promise.resolve(responseSetting.json),
        });
    });

    let spy = jest.spyOn(FetchDataImport, 'fetchData');

    responses.forEach((response) => {
        spy = spy.mockImplementationOnce(() => Promise.resolve(response));
    });

    return spy;
}
