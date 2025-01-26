import {
    OffCyclePayRunResponseType,
    OffCycleSaveRequestType,
} from '@models/off-cycle';
import { getMockPayRuns } from '../pay-run/pay-runs';

export const saveOffCyclePayRunResponse = (
    offCycle: OffCycleSaveRequestType
): OffCyclePayRunResponseType => {
    const payRuns = getMockPayRuns();
    const payRun = payRuns.find((x) => x.payGroupId === offCycle.payGroupId);
    return {
        offCyclePayRun: {
            ...payRun,
        },
        success: true,
        messages: null,
    };
};
