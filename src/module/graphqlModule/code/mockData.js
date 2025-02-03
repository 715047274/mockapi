
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

export {mockPayrollReasons}