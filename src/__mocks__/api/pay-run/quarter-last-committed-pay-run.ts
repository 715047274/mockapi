import { getMockPayRuns } from './pay-runs';
import { PayRunBaseType } from '@models/pay-run';
import { addDaysToDate, formatDate } from '@utils/DateUtils';
import { getQuarterLastDay } from '@utils/QuarterUtils';

export const getQuarterLastCommittedPayRun = (
    payGroupId: number
): PayRunBaseType => {
    const payRuns = getMockPayRuns();
    const result = payRuns.find(
        (x) => x.payGroupId === payGroupId && !x.isOffCyclePayRun
    );
    const quarterLastDay = getQuarterLastDay(result.payDate);
    return result.payRunId % 2
        ? null
        : ({
              payRunId: result.payRunId,
              periodStart: formatDate(addDaysToDate(quarterLastDay, -10)),
              periodEnd: formatDate(addDaysToDate(quarterLastDay, -2)),
              payDate: formatDate(addDaysToDate(quarterLastDay, -1)),
              commitDate: formatDate(addDaysToDate(quarterLastDay, -1)),
              effectiveDate: formatDate(addDaysToDate(quarterLastDay, -10)),
              payPeriod: result.payPeriod + 1,
              payPeriodSuffix: '00',
              payPeriodDisplay: `${result.payPeriod + 1} - 00`,
              payGroupId: result.payGroupId,
              payRunDefId: result.payRunDefId,
              isFasterPayment: result.isFasterPayment,
              isOffCyclePayRun: false,
              offCyclePayRunId: null,
          } as PayRunBaseType);
};
