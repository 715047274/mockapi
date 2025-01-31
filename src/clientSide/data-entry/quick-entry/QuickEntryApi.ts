import { mutate, query } from '@api/common/GraphqlUtil';
import { QuickEntryModelType } from '@models/quick-entry/quick-entry-summary/QuickEntryGridEntryType';
import { ModuleEnum } from '@models/enums/ModuleEnum';
import {
    LoadDataEntryRequestType,
    LoadDataEntrySimpleRequestType,
} from '@models/data-entry/request/LoadDataEntryRequestType';
import { IQuickEntryApi } from './IQuickEntryApi';
import { CreateQuickEntryRequestType } from '@models/quick-entry/request/CreateQuickEntryRequestType';
import { CreateQuickEntryResponseType } from '@models/quick-entry/response/CreateQuickEntryResponseType';
import { ApiResultType } from '@models/common/ApiResultTypes';
import {
    convertToApiErrorResult,
    convertToApiResult,
} from '@utils/ApiResultUtils';
import { QuickEntryBaseType } from '@models/quick-entry/quick-entry-summary/QuickEntryBaseType';
import { prmInitialState } from '@components/common/context/page-context/initial-states/prmInitialState';
import { getQuickEntryGridId } from '@components/data-entry/quick-entry/grid/quickEntryGridUtils';

import GetQuickEntries from '@api/data-entry/quick-entry/graphql/GetQuickEntries.graphql';
import GetLatestQuickEntries from '@api/data-entry/quick-entry/graphql/GetLatestQuickEntries.graphql';
import GetQuickEntryCount from '@api/data-entry/quick-entry/graphql/GetQuickEntryCount.graphql';
import CreateQuickEntry from '@api/data-entry/quick-entry/graphql/CreateQuickEntry.graphql';
import DeleteQuickEntry from '@api/data-entry/quick-entry/graphql/DeleteQuickEntry.graphql';
import SearchProjects from '@api/data-entry/quick-entry/graphql/SearchProjects.graphql';
import SearchDockets from '@api/data-entry/quick-entry/graphql/SearchDockets.graphql';
import GetQuickEntryBundle from '@api/data-entry/quick-entry/graphql/GetQuickEntryBundle.graphql';

import { DeleteQuickEntryResultType } from '@models/quick-entry/response/DeleteQuickEntryResultType';
import { parseApolloQueryResult } from '@utils/ApolloResponseParser';
import { SearchProjectsRequestType } from '@models/quick-entry/request/SearchProjectsRequestType';
import { SearchProjectsResponseType } from '@models/quick-entry/response/SearchProjectsResponseType';
import { SearchDocketsRequestType } from '@models/quick-entry/request/SearchDocketsRequestType';
import { SearchDocketsResponseType } from '@models/quick-entry/response/SearchDocketsResponseType';
import { QuickEntryBundleResponseType } from '@models/quick-entry/response/QuickEntryBundleResponseType';
import { createPagingParameter } from '@utils/PagingModelUtils';
import {
    createFilterModel,
    getFilterModelsFromGridState,
} from '@utils/FilterModelUtils';
import { FilterModelSearchFields } from '@models/common/FilterTypes';
import {
    QuickEntryImportSetFilterItemsType,
    QuickEntrySavedByFilterItemsType,
} from '@models/quick-entry/response/QuickEntryFilterResponseType';
import GetQuickEntrySavedBy from '@api/data-entry/quick-entry/graphql/GetQuickEntrySavedBy.graphql';
import GetQuickEntryImportSets from '@api/data-entry/quick-entry/graphql/GetQuickEntryImportSets.graphql';

export const QuickEntryApi: IQuickEntryApi = {
    async getQuickEntriesAsync(
        variables: LoadDataEntryRequestType,
        abortSignal?: AbortSignal
    ): Promise<QuickEntryModelType | null> {
        const response = await query(
            GetQuickEntries,
            variables,
            ModuleEnum.QuickEntry,
            abortSignal
        );
        const data = parseApolloQueryResult<QuickEntryModelType>(
            response,
            'QuickEntries'
        );
        if (!data?.quickEntries?.items) {
            return {
                quickEntries: { totalCount: 0, items: [] },
            };
        }
        // for some reason js won't allow changing anything in data, so we have to do this...
        const dataWithEntryGridIds = {
            ...data,
            quickEntries: {
                ...data.quickEntries,
                items: data.quickEntries.items.map((entry) => ({
                    ...entry,
                    gridId: getQuickEntryGridId(entry),
                })),
            },
        };
        return dataWithEntryGridIds;
    },

    async getQuickEntryCountAsync(
        payRunId,
        abortSignal?: AbortSignal
    ): Promise<number> {
        const filters = getFilterModelsFromGridState(
            prmInitialState.quickEntry
        );

        filters.push(
            createFilterModel(
                FilterModelSearchFields.DataEntry_SearchParameter_PayRunId,
                payRunId
            )
        );

        const variables = {
            pagingParams: createPagingParameter(0, 0),
            filters,
        };

        const response = await query(
            GetQuickEntryCount,
            variables,
            ModuleEnum.QuickEntry,
            abortSignal
        );
        const count = parseApolloQueryResult<QuickEntryModelType>(
            response,
            'QuickEntries'
        );
        return count?.quickEntries?.totalCount;
    },

    async getLatestQuickEntriesAsync(
        variables: LoadDataEntryRequestType,
        abortSignal?: AbortSignal
    ): Promise<QuickEntryModelType | null> {
        const response = await query(
            GetLatestQuickEntries,
            {
                ...variables,
                randomNumForAbort: Math.random(), //NOSONAR - it thinks the random number is for cryptography
            },
            ModuleEnum.QuickEntry,
            abortSignal
        );
        return parseApolloQueryResult<QuickEntryModelType>(
            response,
            'QuickEntries'
        );
    },

    async createQuickEntryAsync(
        variables: CreateQuickEntryRequestType,
        signal?: AbortSignal
    ): Promise<CreateQuickEntryResponseType | null> {
        const response = await mutate(
            CreateQuickEntry,
            variables,
            ModuleEnum.QuickEntryMutation,
            signal
        );
        return response?.data;
    },

    async deleteQuickEntriesAsync(
        quickEntries: QuickEntryBaseType[]
    ): Promise<ApiResultType<DeleteQuickEntryResultType>> {
        const variables = {
            quickEntries: quickEntries.map(
                ({
                    payEntryBatchDataId,
                    payEntryBatchDataStageId,
                    payRunId,
                    employeeId,
                }) => ({
                    payEntryBatchDataId,
                    payEntryBatchDataStageId,
                    payRunId,
                    employeeId,
                })
            ),
        };
        const response = await mutate(
            DeleteQuickEntry,
            variables,
            ModuleEnum.QuickEntryMutation
        );
        const result = convertToApiResult(
            response,
            'deleteQuickEntry'
        ) as ApiResultType<DeleteQuickEntryResultType>;
        result?.data?.batchData?.forEach((batchData) => {
            batchData.gridId = getQuickEntryGridId(batchData);
        });
        return result;
    },

    async getQuickEntryBundle(
        variables: LoadDataEntrySimpleRequestType,
        signal?: AbortSignal
    ): Promise<QuickEntryBundleResponseType | null> {
        const response = await query(
            GetQuickEntryBundle,
            variables,
            ModuleEnum.QuickEntry,
            signal
        );
        return response?.data;
    },

    async searchProjectsAsync(
        variables: SearchProjectsRequestType,
        signal?: AbortSignal
    ): Promise<SearchProjectsResponseType> {
        const response = await query(
            SearchProjects,
            variables,
            ModuleEnum.QuickEntry,
            signal
        );
        return response?.data;
    },

    async searchDocketsAsync(
        variables: SearchDocketsRequestType,
        signal?: AbortSignal
    ): Promise<SearchDocketsResponseType> {
        const response = await query(
            SearchDockets,
            variables,
            ModuleEnum.QuickEntry,
            signal
        );
        return response?.data;
    },

    async getSavedByFilterOptions(
        payRunId: number,
        abortSignal?: AbortSignal
    ): Promise<ApiResultType<QuickEntrySavedByFilterItemsType[]>> {
        const variables = {
            payRunId: payRunId,
        };
        const response = await query(
            GetQuickEntrySavedBy,
            variables,
            ModuleEnum.QuickEntry,
            abortSignal
        ).catch((error) => {
            return convertToApiErrorResult({ error });
        });
        return convertToApiResult(response, 'quickEntriesSavedBy');
    },

    async getImportSetFilterOptions(
        payRunId: number,
        abortSignal?: AbortSignal
    ): Promise<ApiResultType<QuickEntryImportSetFilterItemsType[]>> {
        const variables = {
            payRunId: payRunId,
        };
        const response = await query(
            GetQuickEntryImportSets,
            variables,
            ModuleEnum.QuickEntry,
            abortSignal
        ).catch((error) => {
            return convertToApiErrorResult({ error });
        });
        return convertToApiResult(response, 'quickEntriesImportSets');
    },
};
