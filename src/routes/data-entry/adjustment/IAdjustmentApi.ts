import { AdjustmentModelType } from '@models/adjustment/adjustment-summary/AdjustmentGridEntryType';
import { LoadDataEntryRequestType } from '@models/data-entry/request/LoadDataEntryRequestType';
import { AdjustmentBundleResponseType } from '@models/adjustment/response/AdjustmentBundleResponseType';
import { AdjustmentSavedByFilterResponseType } from '@models/adjustment/response/AdjustmentFilterResponseType';
import { ApiResultType } from '@models/common/ApiResultTypes';
import { AdjustmentDeleteResultType } from '@models/adjustment/response/DeleteAdjustmentResultType';
import { UpsertAdjustmentRequestType } from '@models/adjustment/request/UpsertAdjustmentRequestType';
import { UpsertAdjustmentResponseType } from '@models/adjustment/response/UpsertAdjustmentResponseType';

export interface IAdjustmentApi {
    getAdjustmentAsync(
        variables: LoadDataEntryRequestType,
        abortSignal?: AbortSignal
    ): Promise<AdjustmentModelType | null>;
    getAdjustmentCountAsync(
        payRunId: number,
        abortSignal?: AbortSignal
    ): Promise<number>;
    getAdjustmentBundle(
        variables: LoadDataEntryRequestType,
        signal?: AbortSignal
    ): Promise<AdjustmentBundleResponseType | null>;
    getSavedByFilterOptions(
        payRunId: number,
        abortSignal?: AbortSignal
    ): Promise<ApiResultType<AdjustmentSavedByFilterResponseType>>;
    deleteAdjustmentsAsync(
        payRunId: number,
        payEntryAdjustmentBatchIds?: number[],
        signal?: AbortSignal
    ): Promise<ApiResultType<AdjustmentDeleteResultType> | null>;
    upsertAdjustmentsAsync(
        variables: UpsertAdjustmentRequestType,
        signal?: AbortSignal
    ): Promise<ApiResultType<UpsertAdjustmentResponseType> | null>;
}
