import { ApiPaginResultType } from '@models/common/ApiResultTypes';
import { IDataEntriesSummaryAPI } from './IDataEntriesSummaryAPI';
import {
    convertToApiErrorResult,
    convertToApiResult,
} from '@utils/ApiResultUtils';
import { query } from '@api/common/GraphqlUtil';
import dataEntriesSummary from './graphql/GetDataEntriesSummaryCard.graphql';
import { ModuleEnum } from '@models/enums/ModuleEnum';
import { DataEntrySummary } from '@models/data-entry/DataEntrySummaryType';
import { LoadDataEntryRequestType } from '@models/data-entry/request/LoadDataEntryRequestType';

export const DataEntriesSummaryAPI: IDataEntriesSummaryAPI = {
    async getDataEntriesSummaryAsync(
        variables: LoadDataEntryRequestType,
        abortSignal: AbortSignal,
        isPolling = false
    ): Promise<ApiPaginResultType<DataEntrySummary> | null> {
        const response = await query(
            dataEntriesSummary,
            {
                ...variables,
                randomNumForAbort: Math.random(), //NOSONAR - it thinks the random number is for cryptography
            },
            ModuleEnum.PayRuns,
            abortSignal,
            isPolling
        ).catch((error) => {
            return convertToApiErrorResult({ error });
        });
        return convertToApiResult(response, 'dataEntriesSummary');
    },
};
