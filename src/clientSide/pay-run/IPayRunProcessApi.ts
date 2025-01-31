import { ApiResultType } from '@models/common/ApiResultTypes';
import {
    CommitPayRunResponseType,
    PayRunProcessResultType,
    MultiPayRunProcessResultType,
    PayRunProgressType,
} from '@models/pay-run';

export interface IPayRunProcessApi {
    getPayRunProgressAsync(
        payRunId: number,
        abortSignal: AbortSignal,
        isPolling: boolean
    ): Promise<ApiResultType<PayRunProgressType> | null>;

    calculatePayRunAsync(
        payRunId: number,
        isForceRecalc: boolean,
        abortSignal: AbortSignal
    ): Promise<ApiResultType<PayRunProcessResultType>>;

    validatePayRunAsync(
        payRunId: number,
        abortSignal: AbortSignal
    ): Promise<ApiResultType<PayRunProcessResultType>>;

    calculatePayRunsAsync(
        payRunIds: number[],
        abortSignal: AbortSignal
    ): Promise<ApiResultType<MultiPayRunProcessResultType[]>>;

    commitPayRunAsync(
        payRunId: number,
        abortSignal?: AbortSignal
    ): Promise<ApiResultType<CommitPayRunResponseType>>;

    queueCommitPayRunAsync(
        payRunId: number
    ): Promise<{ success: boolean; warnings: string[]; errorMessage: string }>;

    doInAuditPayRunAsync(
        payRunId: number,
        userId: number,
        isLock: boolean,
        abortSignal?: AbortSignal
    ): Promise<{ inAuditPayRun: PayRunProcessResultType } | null>;
}
