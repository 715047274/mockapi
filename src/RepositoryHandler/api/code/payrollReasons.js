import {PayRunReasonScope, PayrollReasonConstants} from "../../constant/constant.js";

const payrollReasons = [
    {
        reasonId: 1,
        shortName: 'Adjustment/Correction',
        xRefCode: PayrollReasonConstants.CODE_NAME_ADJUSTMENT_CORRECTION,
        scopeIds: '2,6,7,8',
        scopes: [
            {
                reasonScopeId: 2,
                xRefCode: PayRunReasonScope.OFF_CYCLE_PAY_RUN,
            },
            {
                reasonScopeId: 6,
                xRefCode: PayRunReasonScope.ADDITIONAL_CHECK,
            },
            {
                reasonScopeId: 8,
                xRefCode: PayRunReasonScope.ONSITE_CHECK,
            },
        ],
        countryIds: null,
    },
    {
        reasonId: 2,
        shortName: 'Bonus',
        xRefCode: PayrollReasonConstants.CODE_NAME_BONUS,
        scopeIds: '2,6,7,8',
        scopes: [
            {
                reasonScopeId: 2,
                xRefCode: PayRunReasonScope.OFF_CYCLE_PAY_RUN,
            },
            {
                reasonScopeId: 6,
                xRefCode: PayRunReasonScope.ADDITIONAL_CHECK,
            },
            {
                reasonScopeId: 8,
                xRefCode: PayRunReasonScope.ONSITE_CHECK,
            },
        ],
        countryIds: null,
    },
    {
        reasonId: 3,
        shortName: 'Commission',
        xRefCode: PayrollReasonConstants.CODE_NAME_COMMISSION,
        scopeIds: '2,6,8',
        scopes: [
            {
                reasonScopeId: 2,
                xRefCode: PayRunReasonScope.OFF_CYCLE_PAY_RUN,
            },
            {
                reasonScopeId: 6,
                xRefCode: PayRunReasonScope.ADDITIONAL_CHECK,
            },
            {
                reasonScopeId: 8,
                xRefCode: PayRunReasonScope.ONSITE_CHECK,
            },
        ],
        countryIds: null,
    },
    {
        reasonId: 4,
        shortName: 'Entitlement Payout',
        xRefCode: PayrollReasonConstants.CODE_NAME_ENTITLEMENT_PAYOUT,
        scopeIds: '2,6,9',
        scopes: [
            {
                reasonScopeId: 2,
                xRefCode: PayRunReasonScope.OFF_CYCLE_PAY_RUN,
            },
            {
                reasonScopeId: 6,
                xRefCode: PayRunReasonScope.ADDITIONAL_CHECK,
            },
            {
                reasonScopeId: 9,
                xRefCode: PayRunReasonScope.MANUAL_CHECK,
            },
        ],
        countryIds: null,
    },
    {
        reasonId: 5,
        shortName: 'Missed Pay',
        xRefCode: PayrollReasonConstants.CODE_NAME_MISSED_PAY,
        scopeIds: '2,6,9',
        scopes: [
            {
                reasonScopeId: 2,
                xRefCode: PayRunReasonScope.OFF_CYCLE_PAY_RUN,
            },
            {
                reasonScopeId: 6,
                xRefCode: PayRunReasonScope.ADDITIONAL_CHECK,
            },
            {
                reasonScopeId: 9,
                xRefCode: PayRunReasonScope.MANUAL_CHECK,
            },
        ],
        countryIds: null,
    },
    {
        reasonId: 6,
        shortName: 'Refund',
        xRefCode: PayrollReasonConstants.CODE_NAME_REFUND,
        scopeIds: '2,6,9',
        scopes: [
            {
                reasonScopeId: 2,
                xRefCode: PayRunReasonScope.OFF_CYCLE_PAY_RUN,
            },
            {
                reasonScopeId: 6,
                xRefCode: PayRunReasonScope.ADDITIONAL_CHECK,
            },
            {
                reasonScopeId: 9,
                xRefCode: PayRunReasonScope.MANUAL_CHECK,
            },
        ],
        countryIds: null,
    },
    {
        reasonId: 7,
        shortName: 'Retro Pay',
        xRefCode: PayrollReasonConstants.CODE_NAME_RETRO_PAY,
        scopeIds: '2,9,8',
        scopes: [
            {
                reasonScopeId: 2,
                xRefCode: PayRunReasonScope.OFF_CYCLE_PAY_RUN,
            },
            {
                reasonScopeId: 8,
                xRefCode: PayRunReasonScope.ONSITE_CHECK,
            },
            {
                reasonScopeId: 9,
                xRefCode: PayRunReasonScope.MANUAL_CHECK,
            },
        ],
        countryIds: null,
    },
    {
        reasonId: 8,
        shortName: 'ROE',
        xRefCode: PayrollReasonConstants.CODE_NAME_ROE,
        scopeIds: '2,9,8',
        scopes: [
            {
                reasonScopeId: 2,
                xRefCode: PayRunReasonScope.OFF_CYCLE_PAY_RUN,
            },
            {
                reasonScopeId: 8,
                xRefCode: PayRunReasonScope.ONSITE_CHECK,
            },
            {
                reasonScopeId: 9,
                xRefCode: PayRunReasonScope.MANUAL_CHECK,
            },
        ],
        countryIds: null,
    },
    {
        reasonId: 9,
        shortName: 'Stock Options',
        xRefCode: PayrollReasonConstants.CODE_NAME_STOCK_OPTIONS,
        scopeIds: '2,9,8',
        scopes: [
            {
                reasonScopeId: 2,
                xRefCode: PayRunReasonScope.OFF_CYCLE_PAY_RUN,
            },
            {
                reasonScopeId: 8,
                xRefCode: PayRunReasonScope.ONSITE_CHECK,
            },
            {
                reasonScopeId: 9,
                xRefCode: PayRunReasonScope.MANUAL_CHECK,
            },
        ],
        countryIds: null,
    },
    {
        reasonId: 10,
        shortName: 'Termination',
        xRefCode: PayrollReasonConstants.CODE_NAME_TERMINATION,
        scopeIds: '2,9,8',
        scopes: [
            {
                reasonScopeId: 8,
                xRefCode: PayRunReasonScope.ONSITE_CHECK,
            },
            {
                reasonScopeId: 9,
                xRefCode: PayRunReasonScope.MANUAL_CHECK,
            },
        ],
        countryIds: null,
    },
    {
        reasonId: 11,
        shortName: 'Void',
        xRefCode: PayrollReasonConstants.CODE_NAME_VOID,
        scopeIds: '2,6,9,8',
        scopes: [
            {
                reasonScopeId: 2,
                xRefCode: PayRunReasonScope.OFF_CYCLE_PAY_RUN,
            },
            {
                reasonScopeId: 6,
                xRefCode: PayRunReasonScope.ADDITIONAL_CHECK,
            },
            {
                reasonScopeId: 8,
                xRefCode: PayRunReasonScope.ONSITE_CHECK,
            },
            {
                reasonScopeId: 9,
                xRefCode: PayRunReasonScope.MANUAL_CHECK,
            },
        ],
        countryIds: null,
    },
];

export const getPayrollReasons = ()=>{
 return payrollReasons
}