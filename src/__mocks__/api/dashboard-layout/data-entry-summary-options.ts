import { DataEntrySummary } from '@models/data-entry/DataEntrySummaryType';

export const DataEntrySummaryMockData: DataEntrySummary = {
    totalCount: 7000,
    entriesSummary: [
        {
            entryType: 'QuickEntries',
            entryCount: 6000,
            totalDeductionsAmount: 107394.77,
            totalDeductionsDifference: -0.04,
            totalTaxesAmount: 443052.16,
            totalTaxesDifference: -0.022,
            totalEarningsAmount: 1314264.8,
            totalEarningsDifference: 0.125,
        },
        {
            entryType: 'Checks',
            entryCount: 700,
            totalDeductionsAmount: 13108.23,
            totalDeductionsDifference: -0.2,
            totalTaxesAmount: 400052.16,
            totalTaxesDifference: 0.064,
            totalEarningsAmount: 247559.07,
            totalEarningsDifference: 0.1,
        },
        {
            entryType: 'Adjustments',
            entryCount: 200,
            totalDeductionsAmount: 64008.32,
            totalDeductionsDifference: 0.005,
            totalTaxesAmount: 1244.91,
            totalTaxesDifference: -0.458,
            totalEarningsAmount: 53790.25,
            totalEarningsDifference: -0.055,
        },
        {
            entryType: 'TimeData',
            entryCount: 100,
            totalDeductionsAmount: 53008.32,
            totalDeductionsDifference: 0.003,
            totalTaxesAmount: 944.91,
            totalTaxesDifference: -0.678,
            totalEarningsAmount: 42790.25,
            totalEarningsDifference: -0.066,
        },
    ],
};
