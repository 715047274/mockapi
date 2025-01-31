import { query } from '@api/common/GraphqlUtil';
import { ModuleEnum } from '@models/enums/ModuleEnum';
import { PreviewCodeLevelItemType } from '@models/preview';
import { IPayRunPreviewApi } from './IPayRunPreviewApi';
import {
    ApiResultType,
    ApiPaginResultType,
} from '@models/common/ApiResultTypes';
import GetPayRunPreview from '@api/pay-run/graphql/GetPayRunPreview.graphql';
import GetPayRunCodeLevelPreview from '@api/pay-run/graphql/GetPayRunCodeLevelPreview.graphql';
import GetPreviewProcessStatusGraphql from '@api/pay-run/graphql/GetPreviewProcessStatus.graphql';
import GetPayRunPreviewPayment from '@api/pay-run/graphql/GetPayRunPreviewPayment.graphql';
import GetPayRunPaymentItems from '@api/pay-run/graphql/GetPayRunPreviewPaymentItems.graphql';
import GetPaymentTotalItemsLegalCount from '@api/pay-run/graphql/GetPaymentTotalItemsLegalCount.graphql';
import {
    convertToApiResult,
    convertToApiErrorResult,
    convertToApiPaginResult,
} from '@utils/ApiResultUtils';
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

export const PayRunPreviewApi: IPayRunPreviewApi = {
    async getPayRunPreviewAsync(
        variables: LoadPreviewSummaryRequestType,
        isPolling = false,
        signal?: AbortSignal
    ): Promise<ApiResultType<PreviewSummaryItemType[]> | null> {
        const response = await query(
            GetPayRunPreview,
            {
                ...variables,
                randomNumForAbort: Math.random(), //NOSONAR - it thinks the random number is for cryptography
            },
            ModuleEnum.PayRunPreviewSummary,
            signal,
            isPolling
        ).catch((error) => {
            return convertToApiErrorResult({ error });
        });
        return convertToApiResult(response, 'previewSummary');
    },
    async getPreviewPaymentAsync(
        variables: LoadPreviewPaymentRequestType,
        isPolling = false,
        signal?: AbortSignal
    ): Promise<ApiResultType<PreviewPaymentItemType[]> | null> {
        const response = await query(
            GetPayRunPreviewPayment,
            variables,
            ModuleEnum.PayRunPreviewSummary,
            signal,
            isPolling
        ).catch((error) => {
            return convertToApiErrorResult({ error });
        });
        return convertToApiResult(response, 'previewPaymentSummary');
    },
    async getPreviewPaymentItemsAsync(
        variables: LoadPreviewPaymentItemsRequestType,
        isPolling = false,
        signal?: AbortSignal
    ): Promise<ApiPaginResultType<PreviewPaymentItemDetailType> | null> {
        const response = await query(
            GetPayRunPaymentItems,
            variables,
            ModuleEnum.PayRunPreviewSummary,
            signal,
            isPolling
        ).catch((error) => {
            return convertToApiErrorResult({ error });
        });
        return convertToApiPaginResult(response, 'previewPaymentItems');
    },
    async getPayRunCodeLevelPreviewAsync(
        variables: LoadCodeLevelPreviewRequestType,
        signal?: AbortSignal
    ): Promise<ApiPaginResultType<PreviewCodeLevelItemType> | null> {
        const response = await query(
            GetPayRunCodeLevelPreview,
            {
                ...variables,
                randomNumForAbort: Math.random(), //NOSONAR - it thinks the random number is for cryptography
            },
            ModuleEnum.PayRunPreviewSummary,
            signal
        ).catch((error) => {
            return convertToApiErrorResult({ error });
        });
        return convertToApiPaginResult(response, 'previewCodeLevelSummary');
    },

    async getPreviewProcessStatusAsync(
        payRunId1: number,
        allowRequestGenerate: boolean,
        isPolling: boolean,
        payRunId2?: number,
        signal?: AbortSignal
    ): Promise<ApiResultType<PreviewProcessStatusType> | null> {
        const response = await query(
            GetPreviewProcessStatusGraphql,
            {
                payRunId1,
                payRunId2,
                allowRequestGenerate,
                randomNumForAbort: Math.random(), //NOSONAR - it thinks the random number is for cryptography
            },
            ModuleEnum.PayRunPreviewSummary,
            signal,
            isPolling
        ).catch((error) => {
            return convertToApiErrorResult({ error });
        });
        return convertToApiResult(response, 'previewProcessStatus');
    },

    async getPaymentTotalItemsLegalCount(
        payRunId: number,
        summaryDisplayTypes: number[],
        toComparePayRunId?: number,
        signal?: AbortSignal
    ): Promise<ApiResultType<number> | null> {
        const response = await query(
            GetPaymentTotalItemsLegalCount,
            {
                payRunId,
                toComparePayRunId,
                summaryDisplayTypes,
                randomNumForAbort: Math.random(), //NOSONAR - it thinks the random number is for cryptography
            },
            ModuleEnum.PayRunPreviewSummary,
            signal
        ).catch((error) => {
            return convertToApiErrorResult({ error });
        });
        return convertToApiResult(response, 'paymentTotalItemsLegalCount');
    },
};
