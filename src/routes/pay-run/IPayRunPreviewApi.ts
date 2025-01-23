import {
    ApiResultType,
    ApiPaginResultType,
} from '@models/common/ApiResultTypes';
import { PreviewCodeLevelItemType } from '@models/preview';
import { LoadPreviewSummaryRequestType } from '@models/preview/request/LoadPreviewSummaryRequestType';
import { LoadCodeLevelPreviewRequestType } from '@models/preview/request/LoadCodeLevelPreviewRequestType';
import {
    PreviewProcessStatusType,
    PreviewSummaryItemType,
} from '@models/preview/PreviewSummaryType';
import {
    LoadPreviewPaymentItemsRequestType,
    LoadPreviewPaymentRequestType,
} from '@models/preview/request/LoadPreviewPaymentRequestType';
import {
    PreviewPaymentItemDetailType,
    PreviewPaymentItemType,
} from '@models/preview/PreviewPaymentType';

export interface IPayRunPreviewApi {
    getPayRunPreviewAsync(
        variables: LoadPreviewSummaryRequestType,
        isPolling: boolean,
        signal?: AbortSignal
    ): Promise<ApiResultType<PreviewSummaryItemType[]> | null>;

    getPreviewPaymentAsync(
        variables: LoadPreviewPaymentRequestType,
        isPolling: boolean,
        signal?: AbortSignal
    ): Promise<ApiResultType<PreviewPaymentItemType[]> | null>;

    getPreviewPaymentItemsAsync(
        variables: LoadPreviewPaymentItemsRequestType,
        isPolling: boolean,
        signal?: AbortSignal
    ): Promise<ApiPaginResultType<PreviewPaymentItemDetailType> | null>;

    getPayRunCodeLevelPreviewAsync(
        variables: LoadCodeLevelPreviewRequestType,
        signal?: AbortSignal
    ): Promise<ApiPaginResultType<PreviewCodeLevelItemType> | null>;

    getPreviewProcessStatusAsync(
        payRunId: number,
        allowRequestGenerate: boolean,
        isPolling: boolean,
        payRunId2?: number,
        signal?: AbortSignal
    ): Promise<ApiResultType<PreviewProcessStatusType> | null>;

    getPaymentTotalItemsLegalCount(
        payRunId: number,
        summaryDisplayTypes: number[],
        toComparePayRunId?: number,
        signal?: AbortSignal
    ): Promise<ApiResultType<number> | null>;
}
