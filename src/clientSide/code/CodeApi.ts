import {
    GetEarningAmountTypeRequestType,
    GetEarningAmountTypeResponseType,
    CodeInfoType,
    GetPayRunCodesResponseType,
    GetPayRunTaxCodesResponseType,
    GetEmployeeWageAttachmentCodesByIdsResponseType,
    GetStateUnemploymentInsurancePayrollTaxesResponseType,
    GetTaxAuthorityInstanceCtsCodesResponseType,
} from '@models/code/CodeTypes';
import { ModuleEnum } from '@models/enums/ModuleEnum';
import { PayRunIdType } from '@models/pay-run/PayRunTypes';
import { ICodeApi } from '@api/code/ICodeApi';
import { query } from '@api/common/GraphqlUtil';
import { ApiResultType } from '@models/common/ApiResultTypes';
import {
    convertToApiResult,
    convertToApiErrorResult,
} from '@utils/ApiResultUtils';
import { LoadCodeInfoByIdsRequestType } from '@models/common/request';

import GetCodeInfoByIdsGraphql from './graphql/GetCodeInfoByIds.graphql';
import GetPayRunCodesGraphql from './graphql/GetPayRunCodes.graphql';
import GetPayRunTaxCodesGraphql from './graphql/GetPayRunTaxCodes.graphql';
import GetStateUnemploymentInsurancePayrollTaxesGraphql from './graphql/GetStateUnemploymentInsurancePayrollTaxes.graphql';
import GetTaxAuthorityInstanceCtsCodesGraphql from './graphql/GetTaxAuthorityInstanceCtsCodes.graphql';
import GetCheckTemplatesGraphql from '@api/code/graphql/GetCheckTemplates.graphql';
import GetCheckTypesGraphql from '@api/code/graphql/GetCheckTypes.graphql';
import GetAdjustmentTypesGraphql from '@api/code/graphql/GetAdjustmentTypes.graphql';
import GetPayrollReasonsGraphql from '@api/code/graphql/GetPayrollReasons.graphql';
import GetEarningAmountTypeGraphql from '@api/code/graphql/GetEarningAmountType.graphql';
import GetWcbAccountsGraphql from './graphql/GetWcbAccounts.graphql';
import GetWcbCodesGraphql from './graphql/GetWcbCodes.graphql';
import GetDistributionCodeGraphql from './graphql/GetDistributionCode.graphql';
import GetTaxWageTypesGraphql from './graphql/GetTaxWageTypes.graphql';
import GetLegalEntityEmployeeInsurancesGraphql from './graphql/GetLegalEntityEmployeeInsurances.graphql';
import GetWageAttachmentOrderedAmountTypes from './graphql/GetWageAttachmentOrderedAmountTypes.graphql';
import GetEmployeeWageAttachmentCodesByIds from './graphql/GetEmployeeWageAttachmentCodesByIds.graphql';
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

export const CodeApi: ICodeApi = {
    getCodeInfoByIdsAsync,
    getPayRunCodesAsync,
    getCheckTemplatesAsync,
    getCheckTypesAsync,
    getAdjustmentTypesAsync,
    getPayrollReasonsAsync,
    getEarningAmountTypesAsync,
    getPayRunTaxCodesAsync,
    getWcbAccountsAsync,
    getWcbCodesAsync,
    getWageAttachmentOrderedAmountTypesAsync,
    getEmployeeWageAttachmentCodesByIdsAsync,
    getStateUnemploymentInsurancePayrollTaxesAsync,
    getTaxAuthorityInstanceCtsCodesAsync,
    getDistributionCodeDataAsync,
    getTaxWageTypesAsync,
    getLegalEntityEmployeeInsurancesAsync,
};

async function getCodeInfoByIdsAsync(
    variables: LoadCodeInfoByIdsRequestType,
    signal?: AbortSignal
): Promise<ApiResultType<CodeInfoType[]> | null> {
    const response = await query(
        GetCodeInfoByIdsGraphql,
        variables,
        ModuleEnum.Code,
        signal
    ).catch((error) => {
        return convertToApiErrorResult({ error });
    });
    return convertToApiResult(response, 'codes');
}

async function getPayRunCodesAsync(
    variables: PayRunIdType,
    signal?: AbortSignal
): Promise<GetPayRunCodesResponseType> {
    const response = await query(
        GetPayRunCodesGraphql,
        variables,
        ModuleEnum.Code,
        signal
    );
    return response?.data;
}

async function getPayRunTaxCodesAsync(
    variables: PayRunIdType,
    signal?: AbortSignal
): Promise<GetPayRunTaxCodesResponseType> {
    const response = await query(
        GetPayRunTaxCodesGraphql,
        variables,
        ModuleEnum.Code,
        signal
    );
    return response?.data;
}

async function getStateUnemploymentInsurancePayrollTaxesAsync(
    variables: PayRunIdType,
    signal?: AbortSignal
): Promise<GetStateUnemploymentInsurancePayrollTaxesResponseType> {
    const response = await query(
        GetStateUnemploymentInsurancePayrollTaxesGraphql,
        variables,
        ModuleEnum.Code,
        signal
    );
    return response?.data;
}

async function getTaxAuthorityInstanceCtsCodesAsync(
    payDate: string,
    signal?: AbortSignal
): Promise<GetTaxAuthorityInstanceCtsCodesResponseType> {
    const response = await query(
        GetTaxAuthorityInstanceCtsCodesGraphql,
        { payDate },
        ModuleEnum.Code,
        signal
    );
    return response?.data;
}

async function getCheckTemplatesAsync(
    signal?: AbortSignal
): Promise<GetCheckTemplatesResponseType | null> {
    const response = await query(
        GetCheckTemplatesGraphql,
        {},
        ModuleEnum.Code,
        signal
    );
    return response?.data;
}

async function getCheckTypesAsync(
    includeAllType: boolean,
    signal?: AbortSignal
): Promise<GetCheckTypesResponseType | null> {
    const response = await query(
        GetCheckTypesGraphql,
        { includeAllType },
        ModuleEnum.Code,
        signal
    );
    return response?.data;
}

async function getAdjustmentTypesAsync(
    signal?: AbortSignal
): Promise<GetAdjustmentTypesResponseType | null> {
    const response = await query(
        GetAdjustmentTypesGraphql,
        {},
        ModuleEnum.Code,
        signal
    );
    return response?.data;
}

async function getPayrollReasonsAsync(
    signal?: AbortSignal
): Promise<GetPayrollReasonsResponseType | null> {
    const response = await query(
        GetPayrollReasonsGraphql,
        {},
        ModuleEnum.Code,
        signal
    );
    return response?.data;
}

async function getEarningAmountTypesAsync(
    variables: GetEarningAmountTypeRequestType,
    signal?: AbortSignal
): Promise<GetEarningAmountTypeResponseType | null> {
    const response = await query(
        GetEarningAmountTypeGraphql,
        variables,
        ModuleEnum.Code,
        signal
    );
    return response?.data;
}

async function getWcbAccountsAsync(
    signal?: AbortSignal
): Promise<GetWcbAccountsResponseType | null> {
    const response = await query(
        GetWcbAccountsGraphql,
        {},
        ModuleEnum.Code,
        signal
    );
    return response?.data;
}

async function getWcbCodesAsync(
    signal?: AbortSignal
): Promise<GetWcbCodesResponseType | null> {
    const response = await query(
        GetWcbCodesGraphql,
        {},
        ModuleEnum.Code,
        signal
    );
    return response?.data;
}

async function getWageAttachmentOrderedAmountTypesAsync(
    signal?: AbortSignal
): Promise<GetWageAttachmentOrderedAmountTypesResponseType> {
    const response = await query(
        GetWageAttachmentOrderedAmountTypes,
        {},
        ModuleEnum.Code,
        signal
    );
    return response?.data;
}

async function getEmployeeWageAttachmentCodesByIdsAsync(
    variables: WageAttachmentByIdsRequest,
    signal?: AbortSignal
): Promise<GetEmployeeWageAttachmentCodesByIdsResponseType> {
    const response = await query(
        GetEmployeeWageAttachmentCodesByIds,
        variables,
        ModuleEnum.Code,
        signal
    );
    return response?.data;
}

async function getDistributionCodeDataAsync(
    signal?: AbortSignal
): Promise<GetDistributionCodesResponseType | null> {
    const response = await query(
        GetDistributionCodeGraphql,
        {},
        ModuleEnum.DistributionCode,
        signal
    );
    return response?.data;
}

async function getTaxWageTypesAsync(
    payRunId: number,
    signal?: AbortSignal
): Promise<GetTaxWageTypeResponseType | null> {
    const response = await query(
        GetTaxWageTypesGraphql,
        { payRunId },
        ModuleEnum.TaxWageType,
        signal
    );
    return response?.data;
}

async function getLegalEntityEmployeeInsurancesAsync(
    signal?: AbortSignal
): Promise<GetLegalEntityEmployeeInsuranceResponseType | null> {
    const response = await query(
        GetLegalEntityEmployeeInsurancesGraphql,
        {},
        ModuleEnum.LegalEntityEmployeeInsurance,
        signal
    );
    return response?.data;
}
