import { MessageLevel } from '@models/common/MessageTypes';
import {
    MultiPayRunProcessResultType,
    PayRunProcessResultType,
} from '@models/pay-run';

let singleCalcIteration = 0;
export function getCalculationResult(
    payRunId: number
): PayRunProcessResultType {
    return { payRunId, ...mockCalculationResults[singleCalcIteration++ % 3] };
}

export const mockCalculationResults: PayRunProcessResultType[] = [
    {
        success: true,
        message: {
            messageKey: 'CalculationSuccess',
            messageTitle: 'Success',
            messageText:
                'Your pay run calculation request has begun. You will be notified when {0} {1} has finished calculating.',
            messageLevel: MessageLevel.SUCCESS,
            messageParams: ['MockPayGroupName', '01-00'],
        },
    },
    {
        success: false,
        message: {
            messageKey: 'PayRunCommittedAlready',
            messageTitle: 'Committed',
            messageText:
                '{0} {1} has been committed. Pay run calculations are no longer allowed for this pay run.',
            messageLevel: MessageLevel.WARN,
            messageParams: ['MockPayGroupName', '01-00'],
        },
    },
    {
        success: false,
        message: {
            messageKey: 'PayRunBlocked',
            messageTitle: 'Blocked',
            messageText: `{0} {1} cannot be calculated at this time. 
                This pay run is currently locked for a job in progress. 
                You can request a pay run calculation once the current request has finished processing.`,
            messageLevel: MessageLevel.WARN,
            messageParams: ['MockPayGroupName', '01-00'],
        },
    },
];

let multiCalcIteration = 0;
export function getMultipleCalculationResult(
    payRunIds: number[]
): MultiPayRunProcessResultType[] {
    const results = [...mockMultiCalculationResults];
    payRunIds.forEach((payRunId) => {
        results[multiCalcIteration++ % 3].payRunIds ??= [];
        results[multiCalcIteration++ % 3].payRunIds.push(payRunId);
    });
    return results;
}

export const mockMultiCalculationResults: MultiPayRunProcessResultType[] = [
    {
        success: true,
        message: {
            messageKey: 'CalculationSuccess',
            messageTitle: 'Success',
            messageText:
                'Your pay run calculation request has begun. You will be notified when {0} {1} has finished calculating.',
            messageLevel: MessageLevel.SUCCESS,
            messageParams: ['MockPayGroupName', '01-00'],
        },
        payRunIds: [],
    },
    {
        success: false,
        message: {
            messageKey: 'PayRunCommittedAlready',
            messageTitle: 'Committed',
            messageText:
                '{0} {1} has been committed. Pay run calculations are no longer allowed for this pay run.',
            messageLevel: MessageLevel.WARN,
            messageParams: ['MockPayGroupName', '01-00'],
        },
        payRunIds: [],
    },
    {
        success: false,
        message: {
            messageKey: 'PayRunBlocked',
            messageTitle: 'Blocked',
            messageText: `{0} {1} cannot be calculated at this time. 
                This pay run is currently locked for a job in progress. 
                You can request a pay run calculation once the current request has finished processing.`,
            messageLevel: MessageLevel.WARN,
            messageParams: ['MockPayGroupName', '01-00'],
        },
        payRunIds: [],
    },
];
