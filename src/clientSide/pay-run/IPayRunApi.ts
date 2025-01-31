import {
    ApiLookupResultType,
    ApiPaginResultType,
    ApiResultType,
} from '@models/common/ApiResultTypes';
import {
    PayRunIdType,
    PayRunType,
    PayRunPollingResultType,
    PriorPayRunResponseType,
    PayRunBaseType,
} from '@models/pay-run';
import { PageInfo } from '@models/common/PageInfoType';
import { IFilter } from '@models/common/FilterTypes';

export interface IPayRunApi {
    getOverviewPayRunsAsync(
        page?: PageInfo,
        filter?: IFilter,
        searchTerm?: string,
        abortSignal?: AbortSignal
    ): Promise<ApiPaginResultType<PayRunType> | null>;

    getDefaultPreviousPayRunForPreviewAsync(
        payRunId: number,
        abortSignal?: AbortSignal
    ): Promise<ApiPaginResultType<PayRunIdType> | null>;

    getPayRunPeriodLookupAsync(
        abortSignal?: AbortSignal
    ): Promise<ApiLookupResultType>;

    getPPNLookupAsync(abortSignal?: AbortSignal): Promise<ApiLookupResultType>;

    getLastCommittedPayDate(
        payGroupId: number,
        abortSignal: AbortSignal
    ): Promise<string>;

    pollingPayRunStatusAsync(
        payRunIds: Array<number>,
        abortSignal: AbortSignal,
        isPolling: boolean,
        useNewFields?: boolean
    ): Promise<{ data?: PayRunPollingResultType; error?: Error }>;

    getPriorPayRunsAsync(
        variables: PayRunIdType,
        abortSignal?: AbortSignal
    ): Promise<PriorPayRunResponseType>;

    getQuarterLastCommittedPayRun(
        payGroupId: number,
        payDate: string,
        signal?: AbortSignal
    ): Promise<ApiResultType<PayRunBaseType>>;

    getPayRunEmployeeCountAsync(
        payRunId: number,
        abortSignal?: AbortSignal
    ): Promise<number>;
}
