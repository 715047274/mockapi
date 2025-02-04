const mockPayRunQueryResponse = {
    payRunProcessStates: [
        {
            payRunId: 1,
            payRunStatus: "Locked",
            payrollCommitted: false,
            payrollCommittedDate: null,
            calculationStatus: "NotStarted",
            detailedCalculationStatus: "NotStarted"
        },
        {
            payRunId: 2,
            payRunStatus: "Unlocked",
            payrollCommitted: false,
            payrollCommittedDate: null,
            calculationStatus: "Blocked",
            detailedCalculationStatus: "InProgress"
        },
        {
            payRunId: 3,
            payRunStatus: "Unlocked",
            payrollCommitted: false,
            payrollCommittedDate: null,
            calculationStatus: "Calculated",
            detailedCalculationStatus: "Complete"
        },
        {
            payRunId: 4,
            payRunStatus: "Committing",
            payrollCommitted: false,
            payrollCommittedDate: null,
            calculationStatus: "Calculated",
            detailedCalculationStatus: "Complete"
        },
        {
            payRunId: 5,
            payRunStatus: "Committed",
            payrollCommitted: true,
            payrollCommittedDate: "2024-12-08 19:10:01",
            calculationStatus: "Committed",
            detailedCalculationStatus: "Complete"
        },
        {
            payRunId: 6,
            payRunStatus: "Locked",
            payrollCommitted: false,
            payrollCommittedDate: null,
            calculationStatus: "NotStarted",
            detailedCalculationStatus: "NotStarted"
        },
        {
            payRunId: 7,
            payRunStatus: "Unlocked",
            payrollCommitted: false,
            payrollCommittedDate: null,
            calculationStatus: "Blocked",
            detailedCalculationStatus: "InProgress"
        },
        {
            payRunId: 8,
            payRunStatus: "Unlocked",
            payrollCommitted: false,
            payrollCommittedDate: null,
            calculationStatus: "Calculated",
            detailedCalculationStatus: "Complete"
        },
        {
            payRunId: 9,
            payRunStatus: "Committing",
            payrollCommitted: false,
            payrollCommittedDate: null,
            calculationStatus: "Calculated",
            detailedCalculationStatus: "Complete"
        },
        {
            payRunId: 10,
            payRunStatus: "Committed",
            payrollCommitted: true,
            payrollCommittedDate: "2024-12-08 19:10:01",
            calculationStatus: "Committed",
            detailedCalculationStatus: "Complete"
        }
    ],
    payRunIssuesCount: [
        {
            messageCode: "DEBUG",
            total: 33,
            payRunId: 2
        },
        {
            messageCode: "INFO",
            total: 12,
            payRunId: 2
        },
        {
            messageCode: "WARN",
            total: 21,
            payRunId: 2
        },
        {
            messageCode: "ERROR",
            total: 0,
            payRunId: 2
        },
        {
            messageCode: "WARNASERROR",
            total: 0,
            payRunId: 2
        },
        {
            messageCode: "DEBUG",
            total: 143,
            payRunId: 4
        },
        {
            messageCode: "INFO",
            total: 332,
            payRunId: 4
        },
        {
            messageCode: "WARN",
            total: 18,
            payRunId: 4
        },
        {
            messageCode: "ERROR",
            total: 12,
            payRunId: 4
        },
        {
            messageCode: "WARNASERROR",
            total: 2,
            payRunId: 4
        },
        {
            messageCode: "DEBUG",
            total: 32,
            payRunId: 5
        },
        {
            messageCode: "INFO",
            total: 21,
            payRunId: 5
        },
        {
            messageCode: "WARN",
            total: 18,
            payRunId: 5
        },
        {
            messageCode: "ERROR",
            total: 0,
            payRunId: 5
        },
        {
            messageCode: "WARNASERROR",
            total: 0,
            payRunId: 5
        },
        {
            messageCode: "DEBUG",
            total: 33,
            payRunId: 7
        },
        {
            messageCode: "INFO",
            total: 12,
            payRunId: 7
        },
        {
            messageCode: "WARN",
            total: 21,
            payRunId: 7
        },
        {
            messageCode: "ERROR",
            total: 0,
            payRunId: 7
        },
        {
            messageCode: "WARNASERROR",
            total: 0,
            payRunId: 7
        },
        {
            messageCode: "DEBUG",
            total: 143,
            payRunId: 9
        },
        {
            messageCode: "INFO",
            total: 332,
            payRunId: 9
        },
        {
            messageCode: "WARN",
            total: 18,
            payRunId: 9
        },
        {
            messageCode: "ERROR",
            total: 12,
            payRunId: 9
        },
        {
            messageCode: "WARNASERROR",
            total: 2,
            payRunId: 9
        },
        {
            messageCode: "DEBUG",
            total: 32,
            payRunId: 10
        },
        {
            messageCode: "INFO",
            total: 21,
            payRunId: 10
        },
        {
            messageCode: "WARN",
            total: 18,
            payRunId: 10
        },
        {
            messageCode: "ERROR",
            total: 0,
            payRunId: 10
        },
        {
            messageCode: "WARNASERROR",
            total: 0,
            payRunId: 10
        }
    ]
}


export {mockPayRunQueryResponse}