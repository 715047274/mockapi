import { PayRunIdType } from '@models/pay-run';
import {
    mockDataCodeOptions,
    mockNetPayDataCodeOptions,
    mockDataOptions,
    mockDataPaymentItemsOptions,
} from './preview-summary-provider-options';
import { PreviewItemTypeEnum } from '@models/enums/PreviewEnums';
import { CodeTypeEnum } from '@models/enums/CodeTypeEnum';
import { PreviewStatusEnum } from '@models/enums/PreviewStatusEnum';
import { PreviewPaymentItemTypeEnum } from '@models/enums/PreviewPaymentEnums';

const { amountOptions, hoursOptions, employeeCountOptions } = mockDataOptions;

const toCompareSeedChanger = [7, 8, 0, 5, 9, 1, 10, 4, 2, 3, 6];
function getDataSet(seed: number, itemType: PreviewItemTypeEnum) {
    const toCompareSeed =
        toCompareSeedChanger[seed % toCompareSeedChanger.length];
    const dataSet = {
        itemType,
        amount: amountOptions[seed % amountOptions.length],
        toCompareAmount: amountOptions[toCompareSeed % amountOptions.length],
        varianceAmount: 0,
        hours: hoursOptions[seed % hoursOptions.length],
        toCompareHours: hoursOptions[toCompareSeed % hoursOptions.length],
        varianceHours: 0,
        employeeCount: employeeCountOptions[seed % employeeCountOptions.length],
        toCompareEmployeeCount:
            employeeCountOptions[toCompareSeed % employeeCountOptions.length],
        varianceEmployeeCount: 0,
    };
    dataSet.varianceAmount = dataSet.amount - dataSet.toCompareAmount;
    dataSet.varianceHours = dataSet.hours - dataSet.toCompareHours;
    dataSet.varianceEmployeeCount =
        dataSet.employeeCount - dataSet.toCompareEmployeeCount;
    return dataSet;
}

function getPaymentDataSet(seed: number, itemType: PreviewPaymentItemTypeEnum) {
    const toCompareSeed =
        toCompareSeedChanger[seed % toCompareSeedChanger.length];
    const dataSet = {
        itemType,
        amount: amountOptions[seed % amountOptions.length],
        toCompareAmount: amountOptions[toCompareSeed % amountOptions.length],
        varianceAmount: 0,
    };
    dataSet.varianceAmount = dataSet.amount - dataSet.toCompareAmount;
    return dataSet;
}

function getLegalEntityDataSet(seed: number) {
    let seedTicker = seed;
    const legalEntityDataSet = [
        PreviewItemTypeEnum.NetPay,
        PreviewItemTypeEnum.PostTaxDeduction,
        PreviewItemTypeEnum.EmployeeTax,
        PreviewItemTypeEnum.PreTaxDeduction,
        PreviewItemTypeEnum.Earning,
        PreviewItemTypeEnum.MemoCalc,
        PreviewItemTypeEnum.EmployerTax,
        PreviewItemTypeEnum.TaxableBenefit,
    ].map((itemType) => getDataSet(seedTicker++, itemType));
    return legalEntityDataSet;
}

function getLegalEntityPaymentDataSet(seed: number) {
    let seedTicker = seed;
    const legalEntityDataSet = [
        PreviewPaymentItemTypeEnum.NetPayroll,
        PreviewPaymentItemTypeEnum.TotalGarnishmentImpound,
        PreviewPaymentItemTypeEnum.TotalTaxImpound,
        PreviewPaymentItemTypeEnum.TotalImpound,
        PreviewPaymentItemTypeEnum.TotalTaxLiability,
        PreviewPaymentItemTypeEnum.TotalAdjustments,
        PreviewPaymentItemTypeEnum.TotalCustomerChequesAndDeposits,
        PreviewPaymentItemTypeEnum.CustomerResponsibleTaxes,
        PreviewPaymentItemTypeEnum.Total,
    ].map((itemType) => getPaymentDataSet(seedTicker++, itemType));
    return legalEntityDataSet;
}

export const getPreviewSummary = (legalEntityIds: number[] = []): any => {
    if (!legalEntityIds || legalEntityIds.length === 0) {
        legalEntityIds = [201, 202, 203, 204, 205, 206, 207, 208, 209];
    }
    const startingValue = {
        amount: 0,
        toCompareAmount: 0,
        varianceAmount: 0,
        hours: 0,
        toCompareHours: 0,
        varianceHours: 0,
        employeeCount: 0,
        toCompareEmployeeCount: 0,
        varianceEmployeeCount: 0,
    };
    const result = [
        PreviewItemTypeEnum.NetPay,
        PreviewItemTypeEnum.PostTaxDeduction,
        PreviewItemTypeEnum.EmployeeTax,
        PreviewItemTypeEnum.PreTaxDeduction,
        PreviewItemTypeEnum.Earning,
        PreviewItemTypeEnum.MemoCalc,
        PreviewItemTypeEnum.EmployerTax,
        PreviewItemTypeEnum.TaxableBenefit,
    ].map((itemType) => ({
        ...startingValue,
        itemType,
    }));

    legalEntityIds.forEach((leId) => {
        getLegalEntityDataSet(leId).forEach((leItem) => {
            const resultItem = result.find(
                (r) => r.itemType === leItem.itemType
            );
            if (!resultItem) {
                return;
            }
            resultItem.amount += leItem.amount;
            resultItem.toCompareAmount += leItem.toCompareAmount;
            resultItem.varianceAmount += leItem.varianceAmount;
            resultItem.hours += leItem.hours;
            resultItem.toCompareHours += leItem.toCompareHours;
            resultItem.varianceHours += leItem.varianceHours;
            resultItem.employeeCount += leItem.employeeCount;
            resultItem.toCompareEmployeeCount += leItem.toCompareEmployeeCount;
            resultItem.varianceEmployeeCount += leItem.varianceEmployeeCount;
        });
    });

    result[1].toCompareAmount = result[1].amount;
    result[1].varianceAmount = 0;
    result[2].toCompareHours = result[2].hours;
    result[2].varianceHours = 0;
    result[3].toCompareEmployeeCount = result[3].employeeCount;
    result[3].varianceEmployeeCount = 0;

    return result;
};

export const getPreviewPayment = (
    payrunId: number,
    toComparePayRunId: number,
    legalEntityIds: number[]
): any => {
    if (!legalEntityIds || legalEntityIds.length === 0) {
        legalEntityIds = [201, 202, 203, 204, 205, 206, 207, 208, 209];
    }
    const startingValue = {
        amount: 0,
        toCompareAmount: 0,
        varianceAmount: 0,
    };
    const result = [
        PreviewPaymentItemTypeEnum.NetPayroll,
        PreviewPaymentItemTypeEnum.TotalGarnishmentImpound,
        PreviewPaymentItemTypeEnum.TotalTaxImpound,
        PreviewPaymentItemTypeEnum.TotalImpound,
        PreviewPaymentItemTypeEnum.TotalTaxLiability,
        PreviewPaymentItemTypeEnum.TotalAdjustments,
        PreviewPaymentItemTypeEnum.TotalCustomerChequesAndDeposits,
        PreviewPaymentItemTypeEnum.CustomerResponsibleTaxes,
        PreviewPaymentItemTypeEnum.Total,
    ].map((itemType) => ({
        ...startingValue,
        itemType,
    }));

    legalEntityIds.forEach((leId) => {
        getLegalEntityPaymentDataSet(leId).forEach((leItem) => {
            const resultItem = result.find(
                (r) => r.itemType === leItem.itemType
            );
            if (!resultItem) {
                return;
            }
            resultItem.amount += leItem.amount;
            resultItem.toCompareAmount += leItem.toCompareAmount;
            resultItem.varianceAmount += leItem.varianceAmount;
        });
    });

    result[1].toCompareAmount = result[1].amount;
    result[1].varianceAmount = 0;

    return result;
};

export const getPreviewProcessStatus = (): any => {
    return { previewStatus: PreviewStatusEnum.PreviewReady };
};

export const getPreviousPayRuns = (
    payrunId: number
): { totalCount: number; items: Array<PayRunIdType> } | null => {
    return {
        totalCount: 1,
        items: [{ payRunId: payrunId - 1 }, { payRunId: payrunId - 2 }],
    };
};

export const getPreviewCodes = (
    payrunId: number,
    itemType: PreviewItemTypeEnum,
    toComparePayRunId: number,
    legalEntityIds: number[],
    skip: number,
    take: number
): any => {
    if (!legalEntityIds || legalEntityIds.length === 0) {
        legalEntityIds = [201, 202, 203, 204, 205, 206, 207, 208, 209];
    }
    if (itemType === PreviewItemTypeEnum.NetPay) {
        const netPay = [
            {
                itemType: PreviewItemTypeEnum.Check,
                itemId: 1,
                amount: 0,
                toCompareAmount: 0,
                varianceAmount: 0,
                hours: 0,
                toCompareHours: 0,
                varianceHours: 0,
                employeeCount: 0,
                toCompareEmployeeCount: 0,
                varianceEmployeeCount: 0,
                limitedTaxableWages: 0,
                varianceLimitedTaxableWages: 0,
                toCompareLimitedTaxableWages: 0,
                totalTaxableWages: 0,
                varianceTotalTaxableWages: 0,
                toCompareTotalTaxableWages: 0,
                adjustmentAmount: 0,
                varianceAdjustmentAmount: 0,
                toCompareAdjustmentAmount: 0,
                mtdAmount: 0,
                varianceMtdAmount: 0,
                toCompareMtdAmount: 0,
                ytdAmount: 0,
                varianceYtdAmount: 0,
                toCompareYtdAmount: 0,
                qtdAmount: 0,
                varianceQtdAmount: 0,
                toCompareQtdAmount: 0,
            },
            {
                itemType: PreviewItemTypeEnum.Manual,
                itemId: 2,
                amount: 0,
                toCompareAmount: 0,
                varianceAmount: 0,
                hours: 0,
                toCompareHours: 0,
                varianceHours: 0,
                employeeCount: 0,
                toCompareEmployeeCount: 0,
                varianceEmployeeCount: 0,
                limitedTaxableWages: 0,
                varianceLimitedTaxableWages: 0,
                toCompareLimitedTaxableWages: 0,
                totalTaxableWages: 0,
                varianceTotalTaxableWages: 0,
                toCompareTotalTaxableWages: 0,
                adjustmentAmount: 0,
                varianceAdjustmentAmount: 0,
                toCompareAdjustmentAmount: 0,
                mtdAmount: 0,
                varianceMtdAmount: 0,
                toCompareMtdAmount: 0,
                ytdAmount: 0,
                varianceYtdAmount: 0,
                toCompareYtdAmount: 0,
                qtdAmount: 0,
                varianceQtdAmount: 0,
                toCompareQtdAmount: 0,
            },
            {
                itemType: PreviewItemTypeEnum.OnDemand,
                itemId: 3,
                amount: 0,
                toCompareAmount: 0,
                varianceAmount: 0,
                hours: 0,
                toCompareHours: 0,
                varianceHours: 0,
                employeeCount: 0,
                toCompareEmployeeCount: 0,
                varianceEmployeeCount: 0,
                limitedTaxableWages: 0,
                varianceLimitedTaxableWages: 0,
                toCompareLimitedTaxableWages: 0,
                totalTaxableWages: 0,
                varianceTotalTaxableWages: 0,
                toCompareTotalTaxableWages: 0,
                adjustmentAmount: 0,
                varianceAdjustmentAmount: 0,
                toCompareAdjustmentAmount: 0,
                mtdAmount: 0,
                varianceMtdAmount: 0,
                toCompareMtdAmount: 0,
                ytdAmount: 0,
                varianceYtdAmount: 0,
                toCompareYtdAmount: 0,
                qtdAmount: 0,
                varianceQtdAmount: 0,
                toCompareQtdAmount: 0,
            },
            {
                itemType: PreviewItemTypeEnum.PayCard,
                itemId: 4,
                amount: 0,
                toCompareAmount: 0,
                varianceAmount: 0,
                hours: 0,
                toCompareHours: 0,
                varianceHours: 0,
                employeeCount: 0,
                toCompareEmployeeCount: 0,
                varianceEmployeeCount: 0,
                limitedTaxableWages: 0,
                varianceLimitedTaxableWages: 0,
                toCompareLimitedTaxableWages: 0,
                totalTaxableWages: 0,
                varianceTotalTaxableWages: 0,
                toCompareTotalTaxableWages: 0,
                adjustmentAmount: 0,
                varianceAdjustmentAmount: 0,
                toCompareAdjustmentAmount: 0,
                mtdAmount: 0,
                varianceMtdAmount: 0,
                toCompareMtdAmount: 0,
                ytdAmount: 0,
                varianceYtdAmount: 0,
                toCompareYtdAmount: 0,
                qtdAmount: 0,
                varianceQtdAmount: 0,
                toCompareQtdAmount: 0,
            },
        ];

        Object.entries(mockNetPayDataCodeOptions)
            .filter(([key]) => legalEntityIds.includes(+key))
            .forEach(([, values]) => {
                values.map((item) => {
                    netPay.map((ri) => {
                        if (ri.itemType === item.itemType) {
                            ri.amount += item.amount;
                            ri.toCompareAmount += item.toCompareAmount;
                            ri.varianceAmount += item.varianceAmount;
                            ri.hours += item.hours;
                            ri.toCompareHours += item.toCompareHours;
                            ri.varianceHours += item.varianceHours;
                            ri.employeeCount += item.employeeCount;
                            ri.toCompareEmployeeCount +=
                                item.toCompareEmployeeCount;
                            ri.varianceEmployeeCount +=
                                item.varianceEmployeeCount;
                            ri.limitedTaxableWages += item.limitedTaxableWages;
                            ri.varianceLimitedTaxableWages +=
                                item.varianceLimitedTaxableWages;
                            ri.toCompareLimitedTaxableWages +=
                                item.toCompareLimitedTaxableWages;
                            ri.totalTaxableWages += item.totalTaxableWages;
                            ri.varianceTotalTaxableWages +=
                                item.varianceTotalTaxableWages;
                            ri.toCompareTotalTaxableWages +=
                                item.toCompareTotalTaxableWages;
                        }
                    });
                });
            });
        const length = netPay.length;
        const end = length > skip + take ? skip + take : length;
        return {
            previewCodeLevelSummary: {
                totalCount: length,
                items: netPay.slice(skip, end),
            },
        };
    }

    let codeType = CodeTypeEnum.None;
    if (
        itemType === PreviewItemTypeEnum.Earning ||
        itemType === PreviewItemTypeEnum.TaxableBenefit ||
        itemType === PreviewItemTypeEnum.MemoCalc
    ) {
        codeType = CodeTypeEnum.Earning;
    } else if (
        itemType === PreviewItemTypeEnum.PreTaxDeduction ||
        itemType === PreviewItemTypeEnum.Deduction
    ) {
        codeType = CodeTypeEnum.Deduction;
    } else if (itemType === PreviewItemTypeEnum.PostTaxDeduction) {
        codeType = CodeTypeEnum.WageAttachment;
    } else if (
        itemType === PreviewItemTypeEnum.EmployeeTax ||
        itemType === PreviewItemTypeEnum.EmployerTax
    ) {
        codeType = CodeTypeEnum.Tax;
    }

    const result = [
        {
            itemType: itemType,
            itemId: 1,
            amount: 0,
            codeType: codeType,
            toCompareAmount: 0,
            varianceAmount: 0,
            hours: 0,
            toCompareHours: 0,
            varianceHours: 0,
            employeeCount: 0,
            toCompareEmployeeCount: 0,
            varianceEmployeeCount: 0,
            limitedTaxableWages: 0,
            varianceLimitedTaxableWages: 0,
            toCompareLimitedTaxableWages: 0,
            totalTaxableWages: 0,
            varianceTotalTaxableWages: 0,
            toCompareTotalTaxableWages: 0,
            adjustmentAmount: 0,
            varianceAdjustmentAmount: 0,
            toCompareAdjustmentAmount: 0,
            mtdAmount: 0,
            varianceMtdAmount: 0,
            toCompareMtdAmount: 0,
            ytdAmount: 0,
            varianceYtdAmount: 0,
            toCompareYtdAmount: 0,
            qtdAmount: 0,
            varianceQtdAmount: 0,
            toCompareQtdAmount: 0,
        },
        {
            itemType: itemType,
            itemId: 2,
            codeType: codeType,
            amount: 0,
            toCompareAmount: 0,
            varianceAmount: 0,
            hours: 0,
            toCompareHours: 0,
            varianceHours: 0,
            employeeCount: 0,
            toCompareEmployeeCount: 0,
            varianceEmployeeCount: 0,
            limitedTaxableWages: 0,
            varianceLimitedTaxableWages: 0,
            toCompareLimitedTaxableWages: 0,
            totalTaxableWages: 0,
            varianceTotalTaxableWages: 0,
            toCompareTotalTaxableWages: 0,
            adjustmentAmount: 0,
            varianceAdjustmentAmount: 0,
            toCompareAdjustmentAmount: 0,
            mtdAmount: 0,
            varianceMtdAmount: 0,
            toCompareMtdAmount: 0,
            ytdAmount: 0,
            varianceYtdAmount: 0,
            toCompareYtdAmount: 0,
            qtdAmount: 0,
            varianceQtdAmount: 0,
            toCompareQtdAmount: 0,
        },
        {
            itemType: itemType,
            itemId: 3,
            codeType: codeType,
            amount: 0,
            toCompareAmount: 0,
            varianceAmount: 0,
            hours: 0,
            toCompareHours: 0,
            varianceHours: 0,
            employeeCount: 0,
            toCompareEmployeeCount: 0,
            varianceEmployeeCount: 0,
            limitedTaxableWages: 0,
            varianceLimitedTaxableWages: 0,
            toCompareLimitedTaxableWages: 0,
            totalTaxableWages: 0,
            varianceTotalTaxableWages: 0,
            toCompareTotalTaxableWages: 0,
            adjustmentAmount: 0,
            varianceAdjustmentAmount: 0,
            toCompareAdjustmentAmount: 0,
            mtdAmount: 0,
            varianceMtdAmount: 0,
            toCompareMtdAmount: 0,
            ytdAmount: 0,
            varianceYtdAmount: 0,
            toCompareYtdAmount: 0,
            qtdAmount: 0,
            varianceQtdAmount: 0,
            toCompareQtdAmount: 0,
        },
        {
            itemType: itemType,
            itemId: 4,
            codeType: codeType,
            amount: 0,
            toCompareAmount: 0,
            varianceAmount: 0,
            hours: 0,
            toCompareHours: 0,
            varianceHours: 0,
            employeeCount: 0,
            toCompareEmployeeCount: 0,
            varianceEmployeeCount: 0,
            limitedTaxableWages: 0,
            varianceLimitedTaxableWages: 0,
            toCompareLimitedTaxableWages: 0,
            totalTaxableWages: 0,
            varianceTotalTaxableWages: 0,
            toCompareTotalTaxableWages: 0,
            adjustmentAmount: 0,
            varianceAdjustmentAmount: 0,
            toCompareAdjustmentAmount: 0,
            mtdAmount: 0,
            varianceMtdAmount: 0,
            toCompareMtdAmount: 0,
            ytdAmount: 0,
            varianceYtdAmount: 0,
            toCompareYtdAmount: 0,
            qtdAmount: 0,
            varianceQtdAmount: 0,
            toCompareQtdAmount: 0,
        },
        {
            itemType: itemType,
            itemId: 5,
            codeType: codeType,
            amount: 0,
            toCompareAmount: 0,
            varianceAmount: 0,
            hours: 0,
            toCompareHours: 0,
            varianceHours: 0,
            employeeCount: 0,
            toCompareEmployeeCount: 0,
            varianceEmployeeCount: 0,
            limitedTaxableWages: 0,
            varianceLimitedTaxableWages: 0,
            toCompareLimitedTaxableWages: 0,
            totalTaxableWages: 0,
            varianceTotalTaxableWages: 0,
            toCompareTotalTaxableWages: 0,
            adjustmentAmount: 0,
            varianceAdjustmentAmount: 0,
            toCompareAdjustmentAmount: 0,
            mtdAmount: 0,
            varianceMtdAmount: 0,
            toCompareMtdAmount: 0,
            ytdAmount: 0,
            varianceYtdAmount: 0,
            toCompareYtdAmount: 0,
            qtdAmount: 0,
            varianceQtdAmount: 0,
            toCompareQtdAmount: 0,
        },
        {
            itemType: itemType,
            itemId: 6,
            codeType: codeType,
            amount: 0,
            toCompareAmount: 0,
            varianceAmount: 0,
            hours: 0,
            toCompareHours: 0,
            varianceHours: 0,
            employeeCount: 0,
            toCompareEmployeeCount: 0,
            varianceEmployeeCount: 0,
            limitedTaxableWages: 0,
            varianceLimitedTaxableWages: 0,
            toCompareLimitedTaxableWages: 0,
            totalTaxableWages: 0,
            varianceTotalTaxableWages: 0,
            toCompareTotalTaxableWages: 0,
            adjustmentAmount: 0,
            varianceAdjustmentAmount: 0,
            toCompareAdjustmentAmount: 0,
            mtdAmount: 0,
            varianceMtdAmount: 0,
            toCompareMtdAmount: 0,
            ytdAmount: 0,
            varianceYtdAmount: 0,
            toCompareYtdAmount: 0,
            qtdAmount: 0,
            varianceQtdAmount: 0,
            toCompareQtdAmount: 0,
        },
        {
            itemType: itemType,
            itemId: 7,
            codeType: codeType,
            amount: 0,
            toCompareAmount: 0,
            varianceAmount: 0,
            hours: 0,
            toCompareHours: 0,
            varianceHours: 0,
            employeeCount: 0,
            toCompareEmployeeCount: 0,
            varianceEmployeeCount: 0,
            limitedTaxableWages: 0,
            varianceLimitedTaxableWages: 0,
            toCompareLimitedTaxableWages: 0,
            totalTaxableWages: 0,
            varianceTotalTaxableWages: 0,
            toCompareTotalTaxableWages: 0,
            adjustmentAmount: 0,
            varianceAdjustmentAmount: 0,
            toCompareAdjustmentAmount: 0,
            mtdAmount: 0,
            varianceMtdAmount: 0,
            toCompareMtdAmount: 0,
            ytdAmount: 0,
            varianceYtdAmount: 0,
            toCompareYtdAmount: 0,
            qtdAmount: 0,
            varianceQtdAmount: 0,
            toCompareQtdAmount: 0,
        },
        {
            itemType: itemType,
            itemId: 8,
            codeType: codeType,
            amount: 0,
            toCompareAmount: 0,
            varianceAmount: 0,
            hours: 0,
            toCompareHours: 0,
            varianceHours: 0,
            employeeCount: 0,
            toCompareEmployeeCount: 0,
            varianceEmployeeCount: 0,
            limitedTaxableWages: 0,
            varianceLimitedTaxableWages: 0,
            toCompareLimitedTaxableWages: 0,
            totalTaxableWages: 0,
            varianceTotalTaxableWages: 0,
            toCompareTotalTaxableWages: 0,
            adjustmentAmount: 0,
            varianceAdjustmentAmount: 0,
            toCompareAdjustmentAmount: 0,
            mtdAmount: 0,
            varianceMtdAmount: 0,
            toCompareMtdAmount: 0,
            ytdAmount: 0,
            varianceYtdAmount: 0,
            toCompareYtdAmount: 0,
            qtdAmount: 0,
            varianceQtdAmount: 0,
            toCompareQtdAmount: 0,
        },
    ];
    Object.entries(mockDataCodeOptions(itemType, CodeTypeEnum.Earning))
        .filter(([key]) => legalEntityIds.includes(+key))
        .forEach(([, values]) => {
            values.map((item) => {
                result.map((ri) => {
                    if (ri.itemId === item.itemId) {
                        ri.amount += item.amount;
                        ri.toCompareAmount += item.toCompareAmount;
                        ri.varianceAmount += item.varianceAmount;
                        ri.hours += item.hours;
                        ri.toCompareHours += item.toCompareHours;
                        ri.varianceHours += item.varianceHours;
                        ri.employeeCount += item.employeeCount;
                        ri.toCompareEmployeeCount +=
                            item.toCompareEmployeeCount;
                        ri.varianceEmployeeCount += item.varianceEmployeeCount;
                        ri.limitedTaxableWages += item.limitedTaxableWages;
                        ri.varianceLimitedTaxableWages +=
                            item.varianceLimitedTaxableWages;
                        ri.toCompareLimitedTaxableWages +=
                            item.toCompareLimitedTaxableWages;
                        ri.totalTaxableWages += item.totalTaxableWages;
                        ri.varianceTotalTaxableWages +=
                            item.varianceTotalTaxableWages;
                        ri.toCompareTotalTaxableWages +=
                            item.toCompareTotalTaxableWages;
                    }
                });
            });
        });
    const length = result.length;
    const end = length > skip + take ? skip + take : length;
    return {
        previewCodeLevelSummary: {
            totalCount: length,
            items: result.slice(skip, end),
        },
    };
};

export const getPaymentItems = (
    payrunId: number,
    itemType: PreviewPaymentItemTypeEnum,
    toComparePayRunId: number,
    legalEntityIds: number[],
    skip: number,
    take: number
): any => {
    if (!legalEntityIds || legalEntityIds.length === 0) {
        legalEntityIds = [201, 202, 203, 204, 205, 206, 207, 208, 209];
    }
    let result = [];
    let itemTypes = [];
    if (itemType === PreviewPaymentItemTypeEnum.NetPayroll) {
        itemTypes = [PreviewPaymentItemTypeEnum.Check];
        itemTypes = [...itemTypes, PreviewPaymentItemTypeEnum.DirectDeposit];
        itemTypes = [...itemTypes, PreviewPaymentItemTypeEnum.OnDemandPay];
    } else if (itemType === PreviewPaymentItemTypeEnum.TotalAdjustments) {
        itemTypes = [PreviewPaymentItemTypeEnum.ManualChecks];
        itemTypes = [...itemTypes, PreviewPaymentItemTypeEnum.VoidChecks];
        itemTypes = [...itemTypes, PreviewPaymentItemTypeEnum.OnSiteChecks];
        itemTypes = [
            ...itemTypes,
            PreviewPaymentItemTypeEnum.OnsitePayrollCards,
        ];
        itemTypes = [
            ...itemTypes,
            PreviewPaymentItemTypeEnum.ThirdPartySickPay,
        ];
        itemTypes = [...itemTypes, PreviewPaymentItemTypeEnum.Adjustment];
    } else if (
        itemType === PreviewPaymentItemTypeEnum.TotalCustomerChequesAndDeposits
    ) {
        itemTypes = [PreviewPaymentItemTypeEnum.CustomerCheck];
        itemTypes = [
            ...itemTypes,
            PreviewPaymentItemTypeEnum.CustomerDirectDeposit,
        ];
    } else if (itemType === PreviewPaymentItemTypeEnum.TotalTaxImpound) {
        itemTypes = [PreviewPaymentItemTypeEnum.TaxImpound];
        itemTypes = [
            ...itemTypes,
            PreviewPaymentItemTypeEnum.CanadaTempWageSubsidy,
        ];
        itemTypes = [...itemTypes, PreviewPaymentItemTypeEnum.TotalTaxDeferral];
        itemTypes = [
            ...itemTypes,
            PreviewPaymentItemTypeEnum.ONEHTDeferralPennyOffset,
        ];
    } else if (itemType === PreviewPaymentItemTypeEnum.TotalTaxLiability) {
        itemTypes = [PreviewPaymentItemTypeEnum.TaxImpound];
        itemTypes = [
            ...itemTypes,
            PreviewPaymentItemTypeEnum.CanadaTempWageSubsidy,
        ];
    } else if (
        itemType === PreviewPaymentItemTypeEnum.TotalGarnishmentImpound
    ) {
        itemTypes = [PreviewPaymentItemTypeEnum.Garnishments];
    } else {
        itemTypes = [itemType];
    }

    legalEntityIds.forEach((x) => {
        result = [
            ...result,
            ...(mockDataPaymentItemsOptions()?.[x.toString()] ?? []),
        ];
    });
    result = result.filter((x) => itemTypes.includes(x.itemType));
    const length = result.length;
    const end = length > skip + take ? skip + take : length;
    return {
        previewPaymentItems: {
            totalCount: length,
            items: result.slice(skip, end),
        },
    };
};
