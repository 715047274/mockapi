import { employeePreviews } from './preview/employee-previews';
import { EmployeePreviewType } from '@models/preview/EmployeePreviewSummaryType';

export function getEmployeePreviews(
    employeeId: number,
    payRunId: number,
    toComparePayRunId?: number,
    legalEntityIds?: number[]
): EmployeePreviewType | null {
    if ((employeeId && payRunId) || toComparePayRunId || legalEntityIds) {
        const legalCount = legalEntityIds?.length;
        const employeePreviewStructure = {
            employeeId: 123,
            employeeName: '',
            employeeNumber: '',
            items: [],
        };
        const ep = {
            ...employeePreviewStructure,
            ...employeePreviews?.filter((x) => x.employeeId === employeeId)[0],
        };
        if (legalCount) {
            ep.items = ep.items.map((it) => ({
                ...it,
                currentAmount: (it.currentAmount / 9) * legalCount,
                toCompareCurrentAmount:
                    (it.toCompareCurrentAmount / 9) * legalCount,
                currentAmountVariance:
                    (it.currentAmountVariance / 9) * legalCount,
                currentHours: (it.currentHours / 9) * legalCount,
                currentHoursVariance:
                    (it.currentHoursVariance / 9) * legalCount,
                toCompareCurrentHours:
                    (it.toCompareCurrentHours / 9) * legalCount,
                adjustmentAmount: (it.adjustmentAmount / 9) * legalCount,
                adjustmentHours: (it.adjustmentHours / 9) * legalCount,
                currentLimitedTaxableWages:
                    (it.currentLimitedTaxableWages / 9) * legalCount,
                currentTotalTaxableWages:
                    (it.currentTotalTaxableWages / 9) * legalCount,
                mtdAmount: (it.mtdAmount / 9) * legalCount,
                ytdAmount: (it.ytdAmount / 9) * legalCount,
                qtdAmount: (it.qtdAmount / 9) * legalCount,
            }));
        }

        return ep;
    } else {
        return null;
    }
}
