import { ApiResultType } from '@models/common/ApiResultTypes';
import { DataEntrySummary } from '@models/data-entry/DataEntrySummaryType';
import { LoadDataEntryRequestType } from '@models/data-entry/request/LoadDataEntryRequestType';

export interface IDataEntriesSummaryAPI {
    getDataEntriesSummaryAsync(
        variables: LoadDataEntryRequestType,
        abortSignal: AbortSignal,
        isPolling: boolean
    ): Promise<ApiResultType<DataEntrySummary> | null>;
}
