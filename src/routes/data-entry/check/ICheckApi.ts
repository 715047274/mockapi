import { ApiResultType } from '@models/common/ApiResultTypes';
import { CheckModelType } from '@models/check/check-summary/CheckGridEntryType';
import { UpsertCheckRequestType } from '@models/check/request/UpsertCheckRequestType';
import { LoadDataEntryRequestType } from '@models/data-entry/request/LoadDataEntryRequestType';
import { UpsertCheckResponseType } from '@models/check/response/UpsertCheckResponseType';
import { CheckDeleteResultType } from '@models/check/response/DeleteCheckResultType';
import { CheckBundleResponseTempType } from '@models/check/response/CheckBundleResponseType';
import { GetPayEntryAdjustmentBatchPropertyDataResponseType } from '@models/check/response/PayEntryAdjustmentBatchPropertyDataResponseType';
import { ContactInformationTypeResponseType } from '@models/check/response/ContactInformationTypeResponseType';
import { GetIncomeTaxCalcMethodsTypeResponseType } from '@models/check/response/IncomeTaxCalcMethodResponseType';
import { GetVoidableChecksResponseType } from '@models/check/response/GetVoidableChecksResponseType';

export interface ICheckApi {
    getChecksAsync(
        variables: LoadDataEntryRequestType,
        abortSignal?: AbortSignal
    ): Promise<CheckModelType | null>;
    getCheckCountAsync(
        payRunId: number,
        abortSignal?: AbortSignal
    ): Promise<number>;
    getCheckBundle(
        variables: LoadDataEntryRequestType,
        signal?: AbortSignal
    ): Promise<CheckBundleResponseTempType | null>;
    upsertCheckAsync(
        variables: UpsertCheckRequestType,
        signal?: AbortSignal
    ): Promise<UpsertCheckResponseType | null>;
    deleteChecksAsync(
        payRunId: number,
        payEntryAdjustmentBatchIds?: number[],
        payEntryBatchDataIds?: number[],
        signal?: AbortSignal
    ): Promise<ApiResultType<CheckDeleteResultType>>;
    getPayEntryAdjustmentBatchPropertyDataAsync(
        countryCode: string,
        payEntryAdjustmentBatchId?: number,
        signal?: AbortSignal
    ): Promise<GetPayEntryAdjustmentBatchPropertyDataResponseType | null>;
    getContactInformationTypeAsync(
        signal?: AbortSignal
    ): Promise<ContactInformationTypeResponseType | null>;
    getCAIncomeTaxCalcMethodsAsync(
        countryCode: string,
        signal?: AbortSignal
    ): Promise<GetIncomeTaxCalcMethodsTypeResponseType | null>;
    getVoidableChecksAsync(
        payGroupId: number,
        employeeId: number,
        fromDate: Date,
        toDate: Date,
        signal?: AbortSignal
    ): Promise<GetVoidableChecksResponseType | null>;
}
