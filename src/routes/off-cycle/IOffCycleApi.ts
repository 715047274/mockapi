import {
    OffCyclePayRunResponseType,
    OffCycleSaveRequestType,
    SourceOffCyclePayRunType,
} from '@models/off-cycle';
import {
    DeleteResponseType,
    CanDeleteResponseType,
} from '@models/common/DeleteResponseTypes';

export interface IOffCycleApi {
    saveOffCyclePayRunAsync(
        model: OffCycleSaveRequestType,
        signal?: AbortSignal
    ): Promise<OffCyclePayRunResponseType>;

    canDeleteOffCycleRunAsync(
        offCyclePayRunId: number,
        signal?: AbortSignal
    ): Promise<CanDeleteResponseType>;

    deleteOffCycleRunAsync(
        offCyclePayRunId: number,
        signal?: AbortSignal
    ): Promise<DeleteResponseType>;

    getOffCycleSourcePayRun(
        offCyclePayRunId: number,
        signal?: AbortSignal
    ): Promise<SourceOffCyclePayRunType>;
}
