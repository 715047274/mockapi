import { OffCycleRunTypeType } from '@models/off-cycle';

export interface IOffCycleRunTypeApi {
    getOffCycleRunTypesAsync(
        abortSignal?: AbortSignal
    ): Promise<OffCycleRunTypeType[]>;
}
