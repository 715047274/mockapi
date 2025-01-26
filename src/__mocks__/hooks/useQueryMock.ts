import * as useQueryImport from '@apollo/client';
import {
    DeepPartial,
    makeOverridableObjectFactory,
} from '@mocks/makeOverridableObjectFactory';

export function mockUseQuery(
    overrides?: DeepPartial<
        useQueryImport.QueryResult<unknown, useQueryImport.OperationVariables>
    >
): useQueryImport.QueryResult<unknown, useQueryImport.OperationVariables> {
    const mockReturn = getUseQueryMockedReturn(overrides);
    jest.spyOn(useQueryImport, 'useQuery').mockReturnValue(mockReturn);
    return mockReturn;
}

export const getUseQueryMockedReturn = makeOverridableObjectFactory<
    useQueryImport.QueryResult<unknown, useQueryImport.OperationVariables>
>({
    data: null,
    client: null,
    observable: null,
    loading: null,
    networkStatus: null,
    called: null,
    subscribeToMore: null,
    startPolling: null,
    stopPolling: null,
    updateQuery: null,
    refetch: null,
    reobserve: null,
    variables: null,
    fetchMore: null,
});
