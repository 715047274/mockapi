import {
    GetPayRunIssuesRequestType,
    IssueTextByGridEntryMapType,
    PayRunIssuesCountType,
    PayRunIssuesSummaryType,
    PayRunIssueType,
} from '@models/pay-run';
import {
    ApiPaginResultType,
    ApiResultType,
} from '@models/common/ApiResultTypes';
import { DataEntryIssuesBannerGridData } from '@models/data-entry/DataEntryIssuesBannerData';
import { LoadDataEntryRequestType } from '@models/data-entry/request/LoadDataEntryRequestType';

export interface IPayRunIssuesApi {
    getPayRunIssuesCountAsync(
        payRunIds: number[]
    ): Promise<ApiResultType<PayRunIssuesCountType[]>>;

    getPayRunIssuesAsync(
        params: GetPayRunIssuesRequestType,
        signal: AbortSignal
    ): Promise<ApiPaginResultType<PayRunIssueType> | null>;

    getPayRunIssuesSummaryAsync(
        payRunId: number,
        signal: AbortSignal,
        isPolling: boolean
    ): Promise<ApiResultType<PayRunIssuesSummaryType[]>>;

    getDataEntryIssuesBannerGridDataAsync(
        variables: LoadDataEntryRequestType,
        signal: AbortSignal
    ): Promise<ApiResultType<DataEntryIssuesBannerGridData>>;

    getEntryIssuesAsync(
        payRunId: number,
        payEntryBatchDataIds: number[],
        payEntryBatchDataStageIds: number[],
        signal: AbortSignal
    ): Promise<IssueTextByGridEntryMapType>;
}
