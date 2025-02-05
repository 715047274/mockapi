
const mockPayRunProgressResponse={
    payRunProgress: {
        payRunProcessState: "NONE",
        payRunBlocked: false,
        remainingTime: null,
        lastUpdateTimestamp: null,
        currentTimestamp: "Sun Feb 02 2025 19:53:29 GMT-0500 (Eastern Standard Time)",
        payrollCommittedDate: null,
        previewGenerating: false
    },
    payRunStates: [
        {
            payRunId: 1,
            stateType: "CalculationState",
            updated: 1
        },
        {
            payRunId: 1,
            stateType: "PreviewState",
            updated: 0
        },
        {
            payRunId: 1,
            stateType: "CommitState",
            updated: 0
        },
        {
            payRunId: 1,
            stateType: "IssuesState",
            updated: 0
        },
        {
            payRunId: 1,
            stateType: "DataEntryState",
            updated: 0
        }
    ]
}

const mockPollPayRunsResponse =  {
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
        }
    ]
}

export {mockPayRunProgressResponse, mockPollPayRunsResponse }