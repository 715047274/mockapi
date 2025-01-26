import { SourceOffCyclePayRunType } from '@models/off-cycle';
import { getMockPayRuns } from '../pay-run/pay-runs';
import { PayRunBaseType } from '@models/pay-run';

export const getOffCycleSourcePayRun = (
    offCyclePayRunId: number
): SourceOffCyclePayRunType => {
    const payRuns = getMockPayRuns();
    const payRun = payRuns.find((x) => x.offCyclePayRunId === offCyclePayRunId);
    const result = payRuns.find(
        (x) => x.payGroupId === payRun.payGroupId && !x.isOffCyclePayRun
    );
    return {
        payRunId: result.payRunId,
        periodStart: result.periodStart,
        periodEnd: result.periodEnd,
        payDate: result.payDate,
        commitDate: result.commitDate,
        effectiveDate: result.effectiveDate,
        payPeriod: result.payPeriod,
        payPeriodSuffix: result.payPeriodSuffix,
        payPeriodDisplay: result.payPeriodDisplay,
        payGroupId: result.payGroupId,
        payRunDefId: result.payRunDefId,
        isFasterPayment: result.isFasterPayment,
        isOffCyclePayRun: result.isOffCyclePayRun,
        offCyclePayRunId: result.offCyclePayRunId,
        offCyclePayRunName: result.offCyclePayRunName,
    } as PayRunBaseType;
};
