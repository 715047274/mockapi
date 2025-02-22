import {MessageLevel} from "../../constant/constant.js";

let iteration = 0;

export const getCommitResult = (payRunId) =>{
    return {
        payRunId,
        ...mockCommitResults[iteration++ % 3],
        enableHyperscaleCommit: true,
    };
}
export const mockCommitResults = [
    {
        success: true,
        message: {
            messageKey: 'CommitSuccess',
            messageTitle: 'Success',
            messageText:
                'Your pay run commit request has begun. You will be notified when {0} {1} has finished commit.',
            messageLevel: MessageLevel.SUCCESS,
            messageParams: ['MockPayGroupName', '01-00'],
        },
        enableHyperscaleCommit: true,
    },
    {
        success: false,
        message: {
            messageKey: 'PayRunCommittedAlready',
            messageTitle: 'Committed',
            messageText:
                '{0} {1} has been committed. Pay run committing are no longer allowed for this pay run.',
            messageLevel: MessageLevel.WARN,
            messageParams: ['MockPayGroupName', '01-00'],
        },
        enableHyperscaleCommit: true,
    },
    {
        success: false,
        message: {
            messageKey: 'PayRunBlocked',
            messageTitle: 'Blocked',
            messageText: `{0} {1} cannot be commit at this time. 
                This pay run is currently locked for a job in progress. 
                You can request a pay run commit once the current request has finished processing.`,
            messageLevel: MessageLevel.WARN,
            messageParams: ['MockPayGroupName', '01-00'],
        },
        enableHyperscaleCommit: true,
    },
];
