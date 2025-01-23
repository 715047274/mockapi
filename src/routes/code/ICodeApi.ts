import {
    GetEarningAmountTypeRequestType,
    GetEarningAmountTypeResponseType,
    GetPayRunCodesResponseType,
    CodeInfoType,
    GetPayRunTaxCodesResponseType,
    GetEmployeeWageAttachmentCodesByIdsResponseType,
    GetStateUnemploymentInsurancePayrollTaxesResponseType,
    GetTaxAuthorityInstanceCtsCodesResponseType,
} from '@models/code/CodeTypes';
import { ApiResultType } from '@models/common/ApiResultTypes';
import { LoadCodeInfoByIdsRequestType } from '@models/common/request';
import { PayRunIdType } from '@models/pay-run/PayRunTypes';
import { GetCheckTemplatesResponseType } from '@models/check/CheckTemplateTypes';
import { GetWcbAccountsResponseType } from '@models/wcb/WcbAccountType';
import { GetWcbCodesResponseType } from '@models/wcb/WcbCodeType';
import { GetCheckTypesResponseType } from '@models/check/CheckTypeTypes';
import { GetPayrollReasonsResponseType } from '@models/check/PayrollReasonTypes';
import { GetWageAttachmentOrderedAmountTypesResponseType } from '@models/wage-attachment/OrderedAmountType';
import { WageAttachmentByIdsRequest } from '@models/wage-attachment/WageAttachmentByIdsRequest';
import { GetAdjustmentTypesResponseType } from '@models/adjustment/AdjustmentTypes';
import { GetDistributionCodesResponseType } from '@models/code/DistributionCodeType';
import { GetTaxWageTypeResponseType } from '@models/code/TaxWageTypeType';
import { GetLegalEntityEmployeeInsuranceResponseType } from '@models/code/LegalEntityEmployeeInsuranceType';

export interface ICodeApi {
    getCodeInfoByIdsAsync: (
        variables: LoadCodeInfoByIdsRequestType,
        signal?: AbortSignal
    ) => Promise<ApiResultType<CodeInfoType[]> | null>;

    getPayRunTaxCodesAsync: (
        variables: PayRunIdType,
        signal?: AbortSignal
    ) => Promise<GetPayRunTaxCodesResponseType>;

    getEmployeeWageAttachmentCodesByIdsAsync(
        variables: WageAttachmentByIdsRequest,
        signal?: AbortSignal
    ): Promise<GetEmployeeWageAttachmentCodesByIdsResponseType>;

    getStateUnemploymentInsurancePayrollTaxesAsync(
        variables: PayRunIdType,
        signal?: AbortSignal
    ): Promise<GetStateUnemploymentInsurancePayrollTaxesResponseType>;

    getTaxAuthorityInstanceCtsCodesAsync(
        payDate: string,
        signal?: AbortSignal
    ): Promise<GetTaxAuthorityInstanceCtsCodesResponseType>;

    getPayRunCodesAsync(
        variables: PayRunIdType,
        signal?: AbortSignal
    ): Promise<GetPayRunCodesResponseType>;

    getCheckTemplatesAsync(
        signal?: AbortSignal
    ): Promise<GetCheckTemplatesResponseType | null>;

    getCheckTypesAsync(
        includeAllType: boolean,
        signal?: AbortSignal
    ): Promise<GetCheckTypesResponseType | null>;

    getAdjustmentTypesAsync(
        signal?: AbortSignal
    ): Promise<GetAdjustmentTypesResponseType | null>;

    getPayrollReasonsAsync(
        signal?: AbortSignal
    ): Promise<GetPayrollReasonsResponseType | null>;

    getEarningAmountTypesAsync(
        variables: GetEarningAmountTypeRequestType,
        signal?: AbortSignal
    ): Promise<GetEarningAmountTypeResponseType | null>;

    getWcbAccountsAsync(
        signal?: AbortSignal
    ): Promise<GetWcbAccountsResponseType | null>;

    getWcbCodesAsync(
        signal?: AbortSignal
    ): Promise<GetWcbCodesResponseType | null>;

    getWageAttachmentOrderedAmountTypesAsync(
        signal?: AbortSignal
    ): Promise<GetWageAttachmentOrderedAmountTypesResponseType | null>;

    getDistributionCodeDataAsync(
        signal?: AbortSignal
    ): Promise<GetDistributionCodesResponseType | null>;

    getTaxWageTypesAsync(
        payRunId: number,
        signal?: AbortSignal
    ): Promise<GetTaxWageTypeResponseType | null>;

    getLegalEntityEmployeeInsurancesAsync(
        signal?: AbortSignal
    ): Promise<GetLegalEntityEmployeeInsuranceResponseType | null>;
}
