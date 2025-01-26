import {
    GetWageAttachmentOrderedAmountTypesResponseType,
    WageAttachmentOrderedAmountType,
} from '@models/wage-attachment/OrderedAmountType';

export const wageAttachmentOrderedAmountTypes: Array<WageAttachmentOrderedAmountType> =
    [
        {
            wageAttachmentOrderedAmountTypeId: 1,
            countryCode: 'USA',
            shortName: 'System Calculated',
            codeName: 'SYSTEM_SELECTED',
        },
        {
            wageAttachmentOrderedAmountTypeId: 3,
            countryCode: 'USA',
            shortName: 'Per Check Amount',
            codeName: 'TOTAL_PAY_PERIOD_AMOUNT',
        },
        {
            wageAttachmentOrderedAmountTypeId: 4,
            countryCode: 'USA',
            shortName: 'Percent',
            codeName: 'PERCENT',
        },
        {
            wageAttachmentOrderedAmountTypeId: 5,
            countryCode: 'CAN',
            shortName: '% of Gross less Statutory Deductions',
            codeName: 'PercentOfGrossLessStatutoryDeductions',
        },
        {
            wageAttachmentOrderedAmountTypeId: 6,
            countryCode: 'CAN',
            shortName: '% of Gross up to Provincial Max',
            codeName: 'PercentOfGrossNotExceedProvMax',
        },
        {
            wageAttachmentOrderedAmountTypeId: 8,
            countryCode: 'CAN',
            shortName:
                'Difference between Disposable Net and Exemption entered',
            codeName: 'DiffOfNetAndOverrideExemptAmt',
        },
        {
            wageAttachmentOrderedAmountTypeId: 9,
            countryCode: 'CAN',
            shortName: '% of Gross less Statutory Deductions and Union Dues',
            codeName: 'PercentOfNet',
        },
        {
            wageAttachmentOrderedAmountTypeId: 10,
            countryCode: 'CAN',
            shortName: '100% of Net Pay',
            codeName: 'HundredPercentOfNet',
        },
        {
            wageAttachmentOrderedAmountTypeId: 11,
            countryCode: 'CAN',
            shortName:
                '% of Gross less Statutory Ded split over Multiple Garnishments (Quebec only)',
            codeName: 'PercentOfGrossLessQuebecExemption',
        },
        {
            wageAttachmentOrderedAmountTypeId: 12,
            countryCode: 'CAN',
            shortName: '% of Seizable Income (Quebec Only)',
            codeName: 'PercentOfSeizableIncome',
        },
        {
            wageAttachmentOrderedAmountTypeId: 13,
            countryCode: 'GBR',
            shortName: 'System Calculated',
            codeName: 'SYSTEM_SELECTED_GBR',
        },
        {
            wageAttachmentOrderedAmountTypeId: 14,
            countryCode: 'AUS',
            shortName: 'System Calculated',
            codeName: 'SYSTEM_SELECTED_AUS',
        },
        {
            wageAttachmentOrderedAmountTypeId: 15,
            countryCode: 'USA',
            shortName: 'Percent of Gross Pay',
            codeName: 'PercentOfGrossPay',
        },
        {
            wageAttachmentOrderedAmountTypeId: 16,
            countryCode: 'IRL',
            shortName: 'System Calculated',
            codeName: 'SYSTEM_SELECTED_IRL',
        },
        {
            wageAttachmentOrderedAmountTypeId: 17,
            countryCode: 'NZL',
            shortName: 'System Calculated',
            codeName: 'SYSTEM_SELECTED_NZL',
        },
        {
            wageAttachmentOrderedAmountTypeId: 18,
            countryCode: 'DEU',
            shortName: 'System Calculated',
            codeName: 'SYSTEM_SELECTED_DEU',
        },
    ];

export const getWageAttachmentOrderedAmountTypesAsyncMock =
    (): GetWageAttachmentOrderedAmountTypesResponseType => {
        return {
            wageAttachmentOrderedAmountTypes: wageAttachmentOrderedAmountTypes,
        };
    };
