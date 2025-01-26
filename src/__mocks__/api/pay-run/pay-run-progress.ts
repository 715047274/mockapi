import {
    PayRunIdType,
    PayRunProgressType,
    PayRunStatesType,
} from '@models/pay-run';
import { PayRunProcessStateEnum } from '@models/enums/PayRunStatusEnums';
import { getMillisecond } from '@models/handlers/utils/TimeUtil';

const now = new Date();

let iteration = 0;

export const getPayRunStates = (variables: PayRunStatesType): any => {
    let result = [];
    variables.payRunIds.forEach((element) => {
        result = [
            ...result,
            [
                {
                    payRunId: element,
                    stateType: 'CalculationState',
                    updated: 0,
                },
                { payRunId: element, stateType: 'PreviewState', updated: 0 },
                { payRunId: element, stateType: 'CommitState', updated: 0 },
                { payRunId: element, stateType: 'IssueState', updated: 0 },
            ],
        ];
    });

    return result;
};

export const getPayRunProgress = (
    variables: PayRunIdType
): PayRunProgressType => {
    //const randomIndex = Math.floor(Math.random() * payRunStatuses.length);

    const payRunStatus: PayRunProcessStateEnum =
        variables?.payRunId % 5 === 1
            ? PayRunProcessStateEnum.NONE
            : variables?.payRunId % 5 === 2
            ? PayRunProcessStateEnum.CALCULATING
            : variables?.payRunId % 5 === 3
            ? PayRunProcessStateEnum.CALCULATED
            : variables?.payRunId % 5 === 4
            ? PayRunProcessStateEnum.COMMITTING
            : PayRunProcessStateEnum.COMMITTED;

    const applicableStatuses = payRunsProgress.filter(
        (s) => s.payRunProcessState === payRunStatus
    );
    if (payRunStatus === PayRunProcessStateEnum.CALCULATING) {
        applicableStatuses.push(
            ...payRunsProgress.filter(
                (s) =>
                    s.payRunProcessState === PayRunProcessStateEnum.CALCULATED
            )
        );
    }
    if (payRunStatus === PayRunProcessStateEnum.COMMITTING) {
        applicableStatuses.push(
            ...payRunsProgress.filter(
                (s) => s.payRunProcessState === PayRunProcessStateEnum.COMMITTED
            )
        );
    }
    const index = iteration++ % applicableStatuses.length;
    return applicableStatuses[index];
};

export const getLastCalculatedTimestamps = (
    payRunIds: number[]
): Array<{ payRunId: number; lastCalculatedTimestamp: string }> => {
    return payRunIds.map((payRunId) => {
        const timestamp = new Date(2024, 11, 14, 18, 6, 51);
        timestamp.setMinutes(payRunId * 37);
        return {
            payRunId,
            lastCalculatedTimestamp: timestamp.toISOString(),
        };
    });
};

export const payRunsProgress: PayRunProgressType[] = [
    {
        payRunProcessState: PayRunProcessStateEnum.NONE,
        payRunBlocked: false,
        remainingTime: null,
        lastUpdateTimestamp: null,
        currentTimestamp: now.toString(),
        payrollCommittedDate: null,
        previewGenerating: false,
    },
    {
        payRunProcessState: PayRunProcessStateEnum.CALCULATING,
        payRunBlocked: false,
        remainingTime: null,
        lastUpdateTimestamp: null,
        currentTimestamp: now.toString(),
        payrollCommitted: false,
        payrollCommittedDate: null,
    },
    {
        payRunProcessState: PayRunProcessStateEnum.CALCULATING,
        payRunBlocked: false,
        remainingTime: getMillisecond(10, 12, 45, 0),
        lastUpdateTimestamp: null,
        currentTimestamp: now.toString(),
        payrollCommitted: false,
        payrollCommittedDate: null,
    },
    {
        payRunProcessState: PayRunProcessStateEnum.CALCULATING,
        payRunBlocked: false,
        remainingTime: getMillisecond(0, 11, 45, 0),
        lastUpdateTimestamp: null,
        currentTimestamp: now.toString(),
        payrollCommitted: false,
        payrollCommittedDate: null,
    },
    {
        payRunProcessState: PayRunProcessStateEnum.CALCULATING,
        payRunBlocked: false,
        remainingTime: getMillisecond(0, 1, 10, 0),
        lastUpdateTimestamp: null,
        currentTimestamp: now.toString(),
        payrollCommitted: false,
        payrollCommittedDate: null,
    },
    {
        payRunProcessState: PayRunProcessStateEnum.CALCULATING,
        payRunBlocked: false,
        remainingTime: getMillisecond(0, 0, 56, 50),
        lastUpdateTimestamp: null,
        currentTimestamp: now.toString(),
        payrollCommitted: false,
        payrollCommittedDate: null,
    },
    {
        payRunProcessState: PayRunProcessStateEnum.CALCULATING,
        payRunBlocked: false,
        remainingTime: getMillisecond(0, 0, 1, 20),
        lastUpdateTimestamp: null,
        currentTimestamp: now.toString(),
        payrollCommitted: false,
        payrollCommittedDate: null,
    },
    {
        payRunProcessState: PayRunProcessStateEnum.CALCULATING,
        payRunBlocked: false,
        remainingTime: getMillisecond(0, 0, 0, 0),
        lastUpdateTimestamp: null,
        currentTimestamp: now.toString(),
        payrollCommitted: false,
        payrollCommittedDate: null,
    },
    {
        payRunProcessState: PayRunProcessStateEnum.CALCULATED,
        payRunBlocked: false,
        remainingTime: null,
        lastUpdateTimestamp: new Date(2023, 8, 25, 13, 45, 45).toString(),
        currentTimestamp: new Date(2023, 8, 25, 13, 45, 45).toString(),
        payrollCommitted: false,
        payrollCommittedDate: null,
    },
    {
        payRunProcessState: PayRunProcessStateEnum.CALCULATED,
        payRunBlocked: false,
        remainingTime: null,
        lastUpdateTimestamp: new Date(2023, 8, 25, 13, 42, 1).toString(),
        currentTimestamp: new Date(2023, 8, 25, 13, 45, 45).toString(),
        payrollCommitted: false,
        payrollCommittedDate: null,
    },
    {
        payRunProcessState: PayRunProcessStateEnum.CALCULATED,
        payRunBlocked: false,
        remainingTime: null,
        lastUpdateTimestamp: new Date(2023, 8, 25, 12, 45, 45).toString(),
        currentTimestamp: new Date(2023, 8, 25, 13, 45, 45).toString(),
        payrollCommitted: false,
        payrollCommittedDate: null,
    },
    {
        payRunProcessState: PayRunProcessStateEnum.CALCULATED,
        payRunBlocked: false,
        remainingTime: null,
        lastUpdateTimestamp: new Date(2023, 8, 23, 1, 45, 45).toString(),
        currentTimestamp: new Date(2023, 8, 25, 13, 45, 45).toString(),
        payrollCommitted: false,
        payrollCommittedDate: null,
    },
    {
        payRunProcessState: PayRunProcessStateEnum.CALCULATED,
        payRunBlocked: false,
        remainingTime: null,
        lastUpdateTimestamp: new Date(2023, 8, 16, 15, 45, 45).toString(),
        currentTimestamp: new Date(2023, 8, 25, 13, 45, 45).toString(),
        payrollCommitted: false,
        payrollCommittedDate: null,
    },
    {
        payRunProcessState: PayRunProcessStateEnum.COMMITTING,
        payRunBlocked: true,
        remainingTime: null,
        lastUpdateTimestamp: null,
        currentTimestamp: now.toString(),
        payrollCommitted: false,
        payrollCommittedDate: null,
    },
    {
        payRunProcessState: PayRunProcessStateEnum.COMMITTING,
        payRunBlocked: true,
        remainingTime: getMillisecond(10, 12, 45, 0),
        lastUpdateTimestamp: null,
        currentTimestamp: now.toString(),
        payrollCommitted: false,
        payrollCommittedDate: null,
    },
    {
        payRunProcessState: PayRunProcessStateEnum.COMMITTING,
        payRunBlocked: false,
        remainingTime: getMillisecond(0, 11, 45, 0),
        lastUpdateTimestamp: null,
        currentTimestamp: now.toString(),
        payrollCommitted: false,
        payrollCommittedDate: null,
    },
    {
        payRunProcessState: PayRunProcessStateEnum.COMMITTING,
        payRunBlocked: true,
        remainingTime: getMillisecond(0, 1, 10, 0),
        lastUpdateTimestamp: null,
        currentTimestamp: now.toString(),
        payrollCommitted: false,
        payrollCommittedDate: null,
    },
    {
        payRunProcessState: PayRunProcessStateEnum.COMMITTING,
        payRunBlocked: true,
        remainingTime: getMillisecond(0, 0, 56, 50),
        lastUpdateTimestamp: null,
        currentTimestamp: now.toString(),
        payrollCommitted: false,
        payrollCommittedDate: null,
    },
    {
        payRunProcessState: PayRunProcessStateEnum.COMMITTING,
        payRunBlocked: true,
        remainingTime: getMillisecond(0, 0, 1, 20),
        lastUpdateTimestamp: null,
        currentTimestamp: now.toString(),
        payrollCommitted: false,
        payrollCommittedDate: null,
    },
    {
        payRunProcessState: PayRunProcessStateEnum.COMMITTING,
        payRunBlocked: false,
        remainingTime: getMillisecond(0, 0, 0, 0),
        lastUpdateTimestamp: null,
        currentTimestamp: now.toString(),
        payrollCommitted: false,
        payrollCommittedDate: null,
    },
    {
        payRunProcessState: PayRunProcessStateEnum.COMMITTED,
        payRunBlocked: false,
        remainingTime: null,
        payrollCommittedDate: new Date(2023, 8, 25, 13, 45, 45).toString(),
        currentTimestamp: new Date(2023, 8, 25, 13, 45, 45).toString(),
        payrollCommitted: true,
    },
    {
        payRunProcessState: PayRunProcessStateEnum.COMMITTED,
        payRunBlocked: false,
        remainingTime: null,
        payrollCommittedDate: new Date(2023, 8, 25, 13, 42, 1).toString(),
        currentTimestamp: new Date(2023, 8, 25, 13, 45, 45).toString(),
        payrollCommitted: true,
    },
];
