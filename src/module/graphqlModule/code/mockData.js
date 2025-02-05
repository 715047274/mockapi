
const mockPayrollReasons = [
    {
        reasonId: 1,
        shortName: "Adjustment/Correction",
        xRefCode: "ADJUSTMENT_CORRECTION",
        scopeIds: "2,6,7,8",
        scopes: [
            {
                reasonScopeId: 2,
                xRefCode: "OFF_CYCLE_PAY_RUN"
            },
            {
                reasonScopeId: 6,
                xRefCode: "ADDITIONAL_CHECK"
            },
            {
                reasonScopeId: 8,
                xRefCode: "ONSITE_CHECK"
            }
        ],
        countryIds: null
    },
    {
        reasonId: 2,
        shortName: "Bonus",
        xRefCode: "BONUS",
        scopeIds: "2,6,7,8",
        scopes: [
            {
                reasonScopeId: 2,
                xRefCode: "OFF_CYCLE_PAY_RUN"
            },
            {
                reasonScopeId: 6,
                xRefCode: "ADDITIONAL_CHECK"
            },
            {
                reasonScopeId: 8,
                xRefCode: "ONSITE_CHECK"
            }
        ],
        countryIds: null
    },
    {
        reasonId: 3,
        shortName: "Commission",
        xRefCode: "COMMISSION",
        scopeIds: "2,6,8",
        scopes: [
            {
                reasonScopeId: 2,
                xRefCode: "OFF_CYCLE_PAY_RUN"
            },
            {
                reasonScopeId: 6,
                xRefCode: "ADDITIONAL_CHECK"
            },
            {
                reasonScopeId: 8,
                xRefCode: "ONSITE_CHECK"
            }
        ],
        countryIds: null
    },
    {
        reasonId: 4,
        shortName: "Entitlement Payout",
        xRefCode: "ENTITLEMENT_PAYOUT",
        scopeIds: "2,6,9",
        scopes: [
            {
                reasonScopeId: 2,
                xRefCode: "OFF_CYCLE_PAY_RUN"
            },
            {
                reasonScopeId: 6,
                xRefCode: "ADDITIONAL_CHECK"
            },
            {
                reasonScopeId: 9,
                xRefCode: "MANUAL_CHECK"
            }
        ],
        countryIds: null
    },
    {
        reasonId: 5,
        shortName: "Missed Pay",
        xRefCode: "MISSED_PAY",
        scopeIds: "2,6,9",
        scopes: [
            {
                reasonScopeId: 2,
                xRefCode: "OFF_CYCLE_PAY_RUN"
            },
            {
                reasonScopeId: 6,
                xRefCode: "ADDITIONAL_CHECK"
            },
            {
                reasonScopeId: 9,
                xRefCode: "MANUAL_CHECK"
            }
        ],
        countryIds: null
    },
    {
        reasonId: 6,
        shortName: "Refund",
        xRefCode: "REFUND",
        scopeIds: "2,6,9",
        scopes: [
            {
                reasonScopeId: 2,
                xRefCode: "OFF_CYCLE_PAY_RUN"
            },
            {
                reasonScopeId: 6,
                xRefCode: "ADDITIONAL_CHECK"
            },
            {
                reasonScopeId: 9,
                xRefCode: "MANUAL_CHECK"
            }
        ],
        countryIds: null
    },
    {
        reasonId: 7,
        shortName: "Retro Pay",
        xRefCode: "RETRO_PAY",
        scopeIds: "2,9,8",
        scopes: [
            {
                reasonScopeId: 2,
                xRefCode: "OFF_CYCLE_PAY_RUN"
            },
            {
                reasonScopeId: 8,
                xRefCode: "ONSITE_CHECK"
            },
            {
                reasonScopeId: 9,
                xRefCode: "MANUAL_CHECK"
            }
        ],
        countryIds: null
    },
    {
        reasonId: 8,
        shortName: "ROE",
        xRefCode: "ROE",
        scopeIds: "2,9,8",
        scopes: [
            {
                reasonScopeId: 2,
                xRefCode: "OFF_CYCLE_PAY_RUN"
            },
            {
                reasonScopeId: 8,
                xRefCode: "ONSITE_CHECK"
            },
            {
                reasonScopeId: 9,
                xRefCode: "MANUAL_CHECK"
            }
        ],
        countryIds: null
    },
    {
        reasonId: 9,
        shortName: "Stock Options",
        xRefCode: "STOCK_OPTIONS",
        scopeIds: "2,9,8",
        scopes: [
            {
                reasonScopeId: 2,
                xRefCode: "OFF_CYCLE_PAY_RUN"
            },
            {
                reasonScopeId: 8,
                xRefCode: "ONSITE_CHECK"
            },
            {
                reasonScopeId: 9,
                xRefCode: "MANUAL_CHECK"
            }
        ],
        countryIds: null
    },
    {
        reasonId: 10,
        shortName: "Termination",
        xRefCode: "TERMINATION",
        scopeIds: "2,9,8",
        scopes: [
            {
                reasonScopeId: 8,
                xRefCode: "ONSITE_CHECK"
            },
            {
                reasonScopeId: 9,
                xRefCode: "MANUAL_CHECK"
            }
        ],
        countryIds: null
    },
    {
        reasonId: 11,
        shortName: "Void",
        xRefCode: "VOID",
        scopeIds: "2,6,9,8",
        scopes: [
            {
                reasonScopeId: 2,
                xRefCode: "OFF_CYCLE_PAY_RUN"
            },
            {
                reasonScopeId: 6,
                xRefCode: "ADDITIONAL_CHECK"
            },
            {
                reasonScopeId: 8,
                xRefCode: "ONSITE_CHECK"
            },
            {
                reasonScopeId: 9,
                xRefCode: "MANUAL_CHECK"
            }
        ],
        countryIds: null
    }
]
const mockCheckTypes = [
    {
        payRunCheckTypeId: 2,
        shortName: "Manual",
        codeName: "MANUAL",
        xrefCode: "MANUAL"
    },
    {
        payRunCheckTypeId: 4,
        shortName: "Additional",
        codeName: "ADDITIONAL",
        xrefCode: "ADDITIONAL"
    }
]
const mockCheckTemplate = [
    {
        payRunDefId: 1,
        shortName: "NORMAL",
        xrefCode: "NORMAL",
        isNormal: true,
        isManual: false,
        isManualSystemDefault: false,
        isSystemDefault: false,
        isNormalSystemDefault: false,
        isOffCycleSystemDefault: false,
        employementType: "Employee",
        applyDeceasedTaxation: false,
        isCovid19Template: false,
        isERetentionTemplate: false,
        specialPayType: 0
    },
    {
        payRunDefId: 2,
        shortName: "Manual",
        xrefCode: "MANUAL",
        isNormal: false,
        isManual: false,
        isManualSystemDefault: true,
        isSystemDefault: false,
        isNormalSystemDefault: false,
        isOffCycleSystemDefault: false,
        employementType: "Employee",
        applyDeceasedTaxation: false,
        isCovid19Template: false,
        isERetentionTemplate: false,
        specialPayType: 0
    },
    {
        payRunDefId: 3,
        shortName: "Additional",
        xrefCode: "ADDITIONAL",
        isNormal: false,
        isManual: false,
        isManualSystemDefault: false,
        isSystemDefault: false,
        isNormalSystemDefault: false,
        isOffCycleSystemDefault: false,
        employementType: "Employee",
        applyDeceasedTaxation: false,
        isCovid19Template: false,
        isERetentionTemplate: false,
        specialPayType: 0
    },
    {
        payRunDefId: 4,
        shortName: "Off Cycle",
        xrefCode: "OFF_CYCLE",
        isNormal: false,
        isManual: false,
        isManualSystemDefault: false,
        isSystemDefault: false,
        isNormalSystemDefault: false,
        isOffCycleSystemDefault: false,
        employementType: "Employee",
        applyDeceasedTaxation: false,
        isCovid19Template: false,
        isERetentionTemplate: false,
        specialPayType: 0
    },
    {
        payRunDefId: 5,
        shortName: "Pensioner",
        xrefCode: "PENSIONER",
        isNormal: false,
        isManual: false,
        isManualSystemDefault: false,
        isSystemDefault: false,
        isNormalSystemDefault: false,
        isOffCycleSystemDefault: false,
        employementType: "Pensioner",
        applyDeceasedTaxation: false,
        isCovid19Template: false,
        isERetentionTemplate: false,
        specialPayType: 0
    },
    {
        payRunDefId: 6,
        shortName: "Deceased",
        xrefCode: "DECEASED",
        isNormal: false,
        isManual: false,
        isManualSystemDefault: false,
        isSystemDefault: false,
        isNormalSystemDefault: false,
        isOffCycleSystemDefault: false,
        employementType: "Employee",
        applyDeceasedTaxation: true,
        isCovid19Template: false,
        isERetentionTemplate: false,
        specialPayType: 0
    },
    {
        payRunDefId: 7,
        shortName: "Advance Pay",
        xrefCode: "ADVANCE_PAY",
        isNormal: false,
        isManual: false,
        isManualSystemDefault: false,
        isSystemDefault: false,
        isNormalSystemDefault: false,
        isOffCycleSystemDefault: false,
        employementType: "Employee",
        applyDeceasedTaxation: true,
        isCovid19Template: false,
        isERetentionTemplate: false,
        specialPayType: 1
    },
    {
        payRunDefId: 8,
        shortName: "Retro Pay",
        xrefCode: "RETRO_PAY",
        isNormal: false,
        isManual: false,
        isManualSystemDefault: false,
        isSystemDefault: false,
        isNormalSystemDefault: false,
        isOffCycleSystemDefault: false,
        employementType: "Employee",
        applyDeceasedTaxation: true,
        isCovid19Template: false,
        isERetentionTemplate: false,
        specialPayType: 2
    }
]
const mockEarningAmountTypes = [
    {
        earningId: 1,
        earningAmountTypeId: 1,
        codeName: "Multiplier",
        amount: 1,
        effectiveStart: "2012-01-01",
        effectiveEnd: null
    },
    {
        earningId: 2,
        earningAmountTypeId: 2,
        codeName: "Amount",
        amount: 0.4,
        effectiveStart: "2014-01-01",
        effectiveEnd: null
    }
]
const mockWcbAcounts = [
    {
        wcbAccountId: 1,
        legalEntityId: 1,
        effectiveStart: "2011-12-19T00:00:00",
        effectiveEnd: "0001-01-01T00:00:00",
        shortName: "AB WC Acct",
        legalEntityName: "LE USA",
        isTimeBased: false
    },
    {
        wcbAccountId: 2,
        legalEntityId: 1,
        effectiveStart: "2011-12-19T00:00:00",
        effectiveEnd: "0001-01-01T00:00:00",
        shortName: "BC WC Acct",
        legalEntityName: "LE USA",
        isTimeBased: false
    },
    {
        wcbAccountId: 3,
        legalEntityId: 1,
        effectiveStart: "2011-12-19T00:00:00",
        effectiveEnd: "0001-01-01T00:00:00",
        shortName: "NB WC Acct",
        legalEntityName: "LE USA",
        isTimeBased: false
    },
    {
        wcbAccountId: 4,
        legalEntityId: 1,
        effectiveStart: "2011-12-19T00:00:00",
        effectiveEnd: "0001-01-01T00:00:00",
        shortName: "NS WC Acct",
        legalEntityName: "LE USA",
        isTimeBased: false
    }
]
const mockWcbCodes = [
    {
        wcbCodeId: 120,
        geoStateId: 41,
        countryCode: "USA",
        xrefCode: null,
        shortName: "Retirement Living Centers - Health Care Employees",
        stateCode: "SC",
        wcbCodeCode: "8824"
    },
    {
        wcbCodeId: 119,
        geoStateId: 34,
        countryCode: "USA",
        xrefCode: null,
        shortName: "Retirement and Living Center",
        stateCode: "NC",
        wcbCodeCode: "8824"
    },
    {
        wcbCodeId: 118,
        geoStateId: 6,
        countryCode: "USA",
        xrefCode: null,
        shortName: "TK Nanme",
        stateCode: "CO",
        wcbCodeCode: "TK HTML Test 3 7/23/2019"
    }
]
const mockWageAttachmentOrderedAmountTypes = [
    {
        wageAttachmentOrderedAmountTypeId: 1,
        countryCode: "USA",
        shortName: "System Calculated",
        codeName: "SYSTEM_SELECTED"
    },
    {
        wageAttachmentOrderedAmountTypeId: 3,
        countryCode: "USA",
        shortName: "Per Check Amount",
        codeName: "TOTAL_PAY_PERIOD_AMOUNT"
    },
    {
        wageAttachmentOrderedAmountTypeId: 4,
        countryCode: "USA",
        shortName: "Percent",
        codeName: "PERCENT"
    },
    {
        wageAttachmentOrderedAmountTypeId: 5,
        countryCode: "CAN",
        shortName: "% of Gross less Statutory Deductions",
        codeName: "PercentOfGrossLessStatutoryDeductions"
    },
    {
        wageAttachmentOrderedAmountTypeId: 6,
        countryCode: "CAN",
        shortName: "% of Gross up to Provincial Max",
        codeName: "PercentOfGrossNotExceedProvMax"
    },
    {
        wageAttachmentOrderedAmountTypeId: 8,
        countryCode: "CAN",
        shortName: "Difference between Disposable Net and Exemption entered",
        codeName: "DiffOfNetAndOverrideExemptAmt"
    },
    {
        wageAttachmentOrderedAmountTypeId: 9,
        countryCode: "CAN",
        shortName: "% of Gross less Statutory Deductions and Union Dues",
        codeName: "PercentOfNet"
    },
    {
        wageAttachmentOrderedAmountTypeId: 10,
        countryCode: "CAN",
        shortName: "100% of Net Pay",
        codeName: "HundredPercentOfNet"
    },
    {
        wageAttachmentOrderedAmountTypeId: 11,
        countryCode: "CAN",
        shortName: "% of Gross less Statutory Ded split over Multiple Garnishments (Quebec only)",
        codeName: "PercentOfGrossLessQuebecExemption"
    },
    {
        wageAttachmentOrderedAmountTypeId: 12,
        countryCode: "CAN",
        shortName: "% of Seizable Income (Quebec Only)",
        codeName: "PercentOfSeizableIncome"
    },
    {
        wageAttachmentOrderedAmountTypeId: 13,
        countryCode: "GBR",
        shortName: "System Calculated",
        codeName: "SYSTEM_SELECTED_GBR"
    },
    {
        wageAttachmentOrderedAmountTypeId: 14,
        countryCode: "AUS",
        shortName: "System Calculated",
        codeName: "SYSTEM_SELECTED_AUS"
    },
    {
        wageAttachmentOrderedAmountTypeId: 15,
        countryCode: "USA",
        shortName: "Percent of Gross Pay",
        codeName: "PercentOfGrossPay"
    },
    {
        wageAttachmentOrderedAmountTypeId: 16,
        countryCode: "IRL",
        shortName: "System Calculated",
        codeName: "SYSTEM_SELECTED_IRL"
    },
    {
        wageAttachmentOrderedAmountTypeId: 17,
        countryCode: "NZL",
        shortName: "System Calculated",
        codeName: "SYSTEM_SELECTED_NZL"
    },
    {
        wageAttachmentOrderedAmountTypeId: 18,
        countryCode: "DEU",
        shortName: "System Calculated",
        codeName: "SYSTEM_SELECTED_DEU"
    }
]
const mockDistributionCodes =  [
    {
        codeName: "1",
        shortName: "1"
    },
    {
        codeName: "2",
        shortName: "2"
    },
    {
        codeName: "3",
        shortName: "3"
    },
    {
        codeName: "4",
        shortName: "4"
    },
    {
        codeName: "4&G",
        shortName: "4&G"
    },
    {
        codeName: "7",
        shortName: "7"
    },
    {
        codeName: "7&A",
        shortName: "7&A"
    },
    {
        codeName: "A",
        shortName: "A"
    },
    {
        codeName: "G",
        shortName: "G"
    },
    {
        codeName: "H",
        shortName: "H"
    }
]

export {
    mockPayrollReasons,
    mockCheckTypes,
    mockCheckTemplate,
    mockEarningAmountTypes,
    mockWcbAcounts,
    mockWcbCodes,
    mockWageAttachmentOrderedAmountTypes,
    mockDistributionCodes
}