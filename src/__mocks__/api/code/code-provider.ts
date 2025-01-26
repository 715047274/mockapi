import {
    CodeBaseInfoType,
    CodeType,
    GetEarningAmountTypeResponseType,
    GetEmployeeWageAttachmentCodesByIdsResponseType,
    GetPayRunCodesResponseType,
    GetPayRunTaxCodesResponseType,
    GetStateUnemploymentInsurancePayrollTaxesResponseType,
    GetTaxAuthorityInstanceCtsCodesResponseType,
} from '@models/code/CodeTypes';
import {
    earningCodes as earningCodesByIds,
    deductionCodes as deductionCodesByIds,
    taxCodes as taxCodesByIds,
} from './codes';
import {
    EarningCodes as earningCodes,
    AllEarningCodes as allEarningCodes,
} from './earning-codes';
import { DeductionCodes as deductionCodes } from './deduction-codes';
import { EarningAmountTypes as earningAmountTypes } from './earning-amount-types';
import { TaxCodes as taxCodes } from './tax-codes';
import { WageAttachmentCodes as wageAttachmentCodes } from './wage-attachment-codes';
import {
    SuiTaxAuthorityInstances as suiTaxAuthorityInstances,
    SuiTaxCatetoriesForUsa as suiTaxCatetoriesForUsa,
} from './state-unemployment-insurance-payroll-taxes';
import { taxAuthorityInstanceCtsCodes } from './tax-authority-instance-cts-codes';
import { GetLegalEntityEmployeeInsuranceResponseType } from '@models/code/LegalEntityEmployeeInsuranceType';
import { legalEntityEmployeeInsurances } from './legal-entity-employee-insurances';

export function getCodesByIds(
    countryCode: string,
    codes: CodeBaseInfoType[]
): any {
    const earnings = earningCodesByIds.filter((x) => {
        const earningIds = codes
            .filter((c) => c.codeTypeId === 1)
            .map((c) => c.codeId);
        return earningIds.includes(x.codeId);
    });
    const deductions = deductionCodesByIds.filter((x) => {
        const earningIds = codes
            .filter((c) => c.codeTypeId === 2)
            .map((c) => c.codeId);
        return earningIds.includes(x.codeId);
    });
    const taxCodes = taxCodesByIds.filter((x) => {
        const taxIds = codes
            .filter((c) => c.codeTypeId === 3)
            .map((c) => c.codeId);
        return taxIds.includes(x.codeId);
    });
    return [...earnings, ...deductions, ...taxCodes];
}

export function getTaxCodes(payRunId: number): GetPayRunTaxCodesResponseType {
    const codes: Array<CodeType> = [...taxCodes] as Array<CodeType>;

    return {
        payRunTaxCodes: payRunId ? codes : [],
    };
}

export const getPayRunCodes = (): GetPayRunCodesResponseType => {
    const codes: Array<CodeType> = [...earningCodes, ...deductionCodes];

    return {
        payRunCodes: codes,
    };
};

export const getAllPayRunCodes = (): GetPayRunCodesResponseType => {
    const codes: Array<CodeType> = [...allEarningCodes, ...deductionCodes];

    return {
        payRunCodes: codes,
    };
};

export const getStateUnemploymentInsurancePayrollTaxes =
    (): GetStateUnemploymentInsurancePayrollTaxesResponseType => {
        return {
            stateUnemploymentInsurancePayrollTaxes: {
                taxAuthorityInstances: suiTaxAuthorityInstances,
                taxCategoritiesForUsa: suiTaxCatetoriesForUsa,
            },
        };
    };

export const getLegalEntityEmployeeInsurances =
    (): GetLegalEntityEmployeeInsuranceResponseType => {
        return { legalEntityEmployeeInsurances };
    };

export const getTaxAuthorityInstanceCtsCodes =
    (): GetTaxAuthorityInstanceCtsCodesResponseType => {
        return {
            taxAuthorityInstanceCtsCodes,
        };
    };

export function getWageAttachmentCodesByIds(
    codeIds: number[]
): GetEmployeeWageAttachmentCodesByIdsResponseType {
    const codes: Array<CodeType> = [...wageAttachmentCodes];

    return {
        employeeWageAttachmentCodesByIds: codes.filter((c) =>
            codeIds.includes(c.codeId)
        ),
    };
}

export const getEarningAmountTypes = (): GetEarningAmountTypeResponseType => {
    return {
        earningAmountTypes,
    };
};
