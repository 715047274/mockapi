const mockFeatureControlProvider = {
    UserFeatures: [
        {
            TargetObjectType: "PayrollUIService",
            SubFeatures: [
                {
                    TargetObjectType: "PayrollIntelligenceOverview",
                    SubFeatures: [
                        {
                            TargetObjectType: "PayrollIntelligencePayRun",
                            SubFeatures: [
                                {
                                    TargetObjectType: "PayrollIntelligencePayRunDashboard",
                                    RoleSequence: 1
                                },
                                {
                                    TargetObjectType: "PayrollIntelligencePayRunPreview",
                                    SubFeatures: [
                                        {
                                            TargetObjectType: "PayrollIntelligencePreviewSummary",
                                            SubFeatures: [
                                                {
                                                    TargetObjectType: "PayrollIntelligencePreviewSummaryCodes",
                                                    SubFeatures: [
                                                        {
                                                            TargetObjectType: "PayrollIntelligencePreviewSummaryCodesEmployees",
                                                            RoleSequence: 1
                                                        }
                                                    ],
                                                    RoleSequence: 1
                                                }
                                            ],
                                            RoleSequence: 1
                                        },
                                        {
                                            TargetObjectType: "PayrollIntelligencePreviewEmployees",
                                            RoleSequence: 2
                                        },
                                        {
                                            TargetObjectType: "PayrollIntelligencePreviewPayments",
                                            SubFeatures: [
                                                {
                                                    TargetObjectType: "PayrollIntelligencePreviewPaymentsLegalEntities",
                                                    SubFeatures: [
                                                        {
                                                            TargetObjectType: "PayrollIntelligencePreviewPaymentsLegalEntitiesEmployees",
                                                            RoleSequence: 1
                                                        }
                                                    ],
                                                    RoleSequence: 1
                                                }
                                            ],
                                            RoleSequence: 3
                                        },
                                        {
                                            TargetObjectType: "PayrollIntelligenceManageWageAndTax",
                                            RoleSequence: 4
                                        }
                                    ],
                                    RoleSequence: 2
                                },
                                {
                                    TargetObjectType: "PayrollIntelligencePayRunDataEntry",
                                    SubFeatures: [
                                        {
                                            TargetObjectType: "PayrollIntelligenceQuickEntries",
                                            SubFeatures: [
                                                {
                                                    TargetObjectType: "PayrollIntelligenceImportQuickEntries",
                                                    RoleSequence: 1
                                                },
                                                {
                                                    TargetObjectType: "PayrollIntelligenceManageQuickEntries",
                                                    RoleSequence: 2
                                                }
                                            ],
                                            RoleSequence: 1
                                        },
                                        {
                                            TargetObjectType: "PayrollIntelligenceTimeData",
                                            RoleSequence: 2
                                        },
                                        {
                                            TargetObjectType: "PayrollIntelligenceChecks",
                                            SubFeatures: [
                                                {
                                                    TargetObjectType: "PayrollIntelligenceImportChecks",
                                                    RoleSequence: 1
                                                },
                                                {
                                                    TargetObjectType: "PayrollIntelligenceManageChecks",
                                                    RoleSequence: 2
                                                }
                                            ],
                                            RoleSequence: 3
                                        },
                                        {
                                            TargetObjectType: "PayrollIntelligenceAdjustments",
                                            SubFeatures: [
                                                {
                                                    TargetObjectType: "PayrollIntelligenceImportAdjustments",
                                                    RoleSequence: 1
                                                },
                                                {
                                                    TargetObjectType: "PayrollIntelligenceManageAdjustments",
                                                    RoleSequence: 2
                                                }
                                            ],
                                            RoleSequence: 4
                                        }
                                    ],
                                    RoleSequence: 3
                                },
                                {
                                    TargetObjectType: "PayrollIntelligencePayRunIssues",
                                    RoleSequence: 4
                                },
                                {
                                    TargetObjectType: "PayrollIntelligenceEmployeePanel",
                                    SubFeatures: [
                                        {
                                            TargetObjectType: "PayrollIntelligenceEmployeePanelOverview",
                                            RoleSequence: 1
                                        },
                                        {
                                            TargetObjectType: "PayrollIntelligenceEmployeePanelEarningStatement",
                                            RoleSequence: 2
                                        },
                                        {
                                            TargetObjectType: "PayrollIntelligenceEmployeePanelTimesheet",
                                            RoleSequence: 3
                                        },
                                        {
                                            TargetObjectType: "PayrollIntelligenceEmployeePanelPreview",
                                            RoleSequence: 4
                                        },
                                        {
                                            TargetObjectType: "PayrollIntelligenceEmployeePanelTimeData",
                                            RoleSequence: 5
                                        },
                                        {
                                            TargetObjectType: "PayrollIntelligenceEmployeePanelGeneralLedger",
                                            RoleSequence: 6
                                        },
                                        {
                                            TargetObjectType: "PayrollIntelligenceEmployeePanelWageTax",
                                            RoleSequence: 7
                                        }
                                    ],
                                    RoleSequence: 5
                                },
                                {
                                    TargetObjectType: "PayrollIntelligenceConfigureOffCyclePayRuns",
                                    RoleSequence: 6
                                },
                                {
                                    TargetObjectType: "PayrollIntelligencePayRunReports",
                                    SubFeatures: [
                                        {
                                            TargetObjectType: "PayrollIntelligencePayRunReportsAudits",
                                            RoleSequence: 1
                                        },
                                        {
                                            TargetObjectType: "PayrollIntelligencePayRunReportsAllReports",
                                            RoleSequence: 2
                                        },
                                        [
                                            {
                                                TargetObjectType: "PayrollIntelligencePayRunReportsDeliveryPackages",
                                                RoleSequence: 1
                                            },
                                            {
                                                TargetObjectType: "PayrollIntelligencePayRunReportsExports",
                                                RoleSequence: 1
                                            }
                                        ]
                                    ],
                                    RoleSequence: 7
                                }
                            ],
                            RoleSequence: 1
                        },
                        {
                            TargetObjectType: "PayrollIntelligenceOverviewRecalculate",
                            RoleSequence: 2
                        }
                    ],
                    RoleSequence: 1
                }
            ],
            RoleSequence: 1
        },
        {
            TargetObjectType: "DayforceApplicationContainer",
            SubFeatures: [
                {
                    TargetObjectType: "EmployeeProfile",
                    SubFeatures: [
                        {
                            TargetObjectType: "EmployeeProfile.ProfileMenu",
                            RoleSequence: 1
                        }
                    ],
                    RoleSequence: 1
                }
            ],
            RoleSequence: 2
        },
        {
            TargetObjectType: "PayrollAdmin",
            SubFeatures: [
                {
                    TargetObjectType: "AllowPensionerContractorConfig",
                    RoleSequence: 8
                }
            ],
            RoleSequence: 1
        },
        {
            TargetObjectType: "DayforceApplicationContainer",
            SubFeatures: [
                {
                    TargetObjectType: "EmployeeProfile",
                    SubFeatures: [
                        {
                            TargetObjectType: "EmployeeProfile.ProfileMenu",
                            SubFeatures: [
                                {
                                    TargetObjectType: "EmployeeProfile.Personal",
                                    SubFeatures: [
                                        {
                                            TargetObjectType: "EmployeeProfile.PersonalContact.ConfidentialInformation",
                                            RoleSequence: 5
                                        }
                                    ],
                                    RoleSequence: 4
                                }
                            ],
                            RoleSequence: 3
                        }
                    ],
                    RoleSequence: 2
                }
            ],
            RoleSequence: 1
        },
        {
            TargetObjectType: "DayforceApplicationContainer123456",
            SubFeatures: [
                {
                    TargetObjectType: "EmployeeProfile",
                    SubFeatures: [
                        {
                            TargetObjectType: "EmployeeProfile.ProfileMenu",
                            SubFeatures: [
                                {
                                    TargetObjectType: "EmployeeProfile.Personal",
                                    SubFeatures: [
                                        {
                                            TargetObjectType: "EmployeeProfile.PersonalContact.ConfidentialInformation",
                                            RoleSequence: 5
                                        }
                                    ],
                                    RoleSequence: 4
                                }
                            ],
                            RoleSequence: 3
                        }
                    ],
                    RoleSequence: 2
                }
            ],
            RoleSequence: 1
        }
    ]
}

export  {mockFeatureControlProvider}