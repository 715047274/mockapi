export const OrderedAmountTypeConstants = {
    SYSTEM_SELECTED: 'SYSTEM_SELECTED',
    TOTAL_PAY_PERIOD_AMOUNT: 'TOTAL_PAY_PERIOD_AMOUNT',
    PERCENT: 'PERCENT',
    PERCENT_OF_GROSS_PAY: 'PercentOfGrossPay',
    PERCENT_OF_GROSS_LESS_STATUTORY_DEDUCTIONS:
        'PercentOfGrossLessStatutoryDeductions',
    PERCENT_OF_GROSS_NOT_EXCEED_PROV_MAX: 'PercentOfGrossNotExceedProvMax',
    DIFF_OF_NET_AND_OVERRRDE_EXEMPT_AMT: 'DiffOfNetAndOverrideExemptAmt',
    PERCENT_OF_NET: 'PercentOfNet',
    HUNDRED_PERCENT_OF_NET: 'HundredPercentOfNet',
    PERCENT_OF_GROSS_LESS_QUEBEC_EXEMPTION: 'PercentOfGrossLessQuebecExemption',
    PERCENT_OF_SEIZABLE_INCOME: 'PercentOfSeizableIncome',
    TOTAL_ORDER_AMOUNT: 'TOTAL_ORDER_AMOUNT',
    STRAIGHT_DOLLAR_AMOUNT: 'StraightDollarAmount',
};

export const OrderedAmountTypesForPercent = [
    {
        codeName:
            OrderedAmountTypeConstants.PERCENT_OF_GROSS_LESS_STATUTORY_DEDUCTIONS,
        required: true,
        disabled: false,
    },
    {
        codeName: OrderedAmountTypeConstants.PERCENT_OF_NET,
        required: true,
        disabled: false,
    },
    {
        codeName:
            OrderedAmountTypeConstants.PERCENT_OF_GROSS_NOT_EXCEED_PROV_MAX,
        required: true,
        disabled: false,
    },
    {
        codeName:
            OrderedAmountTypeConstants.PERCENT_OF_GROSS_LESS_QUEBEC_EXEMPTION,
        required: true,
        disabled: false,
    },
    {
        codeName: OrderedAmountTypeConstants.PERCENT,
        required: true,
        disabled: false,
    },
    {
        codeName: OrderedAmountTypeConstants.PERCENT_OF_GROSS_PAY,
        required: false,
        disabled: true,
    },
];
export const OrderedAmountTypesForAmount = [
    {
        codeName: OrderedAmountTypeConstants.STRAIGHT_DOLLAR_AMOUNT,
        required: true,
        disabled: false,
    },
    {
        codeName: OrderedAmountTypeConstants.TOTAL_ORDER_AMOUNT,
        required: true,
        disabled: false,
    },
    {
        codeName: OrderedAmountTypeConstants.TOTAL_PAY_PERIOD_AMOUNT,
        required: true,
        disabled: false,
    },
    {
        codeName: OrderedAmountTypeConstants.SYSTEM_SELECTED,
        required: false,
        disabled: true,
    },
    {
        codeName: OrderedAmountTypeConstants.HUNDRED_PERCENT_OF_NET,
        required: false,
        disabled: true,
    },
    {
        codeName:
            OrderedAmountTypeConstants.DIFF_OF_NET_AND_OVERRRDE_EXEMPT_AMT,
        required: false,
        disabled: true,
    },
    {
        codeName: OrderedAmountTypeConstants.PERCENT_OF_SEIZABLE_INCOME,
        required: false,
        disabled: true,
    },
];
