import { PayRunState } from '@models/pay-run';

let iteration = 0;

export const getPayRunUpdateStatuses = (payRunIds: number[]): any => {
    if (payRunIds && payRunIds[0]) {
        const payRunId = payRunIds[0];
        const payRunStatus: PayRunState[] = [
            {
                payRunId,
                stateType: 'CalculationState',
                updated: ((iteration / 8) | 0) + 1,
            },
            {
                payRunId,
                stateType: 'PreviewState',
                updated: (iteration / 8) | 0,
            },
            {
                payRunId,
                stateType: 'CommitState',
                updated: (iteration / 6) | 0,
            },
            {
                payRunId,
                stateType: 'IssuesState',
                updated: (iteration / 6) | 0,
            },
            {
                payRunId,
                stateType: 'DataEntryState',
                updated: (iteration / 6) | 0,
            },
        ];
        iteration++;
        return payRunStatus;
    } else {
        return null;
    }
};
