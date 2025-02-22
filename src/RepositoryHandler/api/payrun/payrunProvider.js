import {FilterTypeEnum, PayRunStatusEnum} from "../../constant/constant.js";
import {mockPayRuns} from "./payruns.js";

export const getPayRunsWithProcessState = (variables)=> {
    const {filter, searchTerm, skip, take} = variables
   // todo filter not work
    const filteredItems = filter ?  mockPayRuns : mockPayRuns.filter(
        (pr) => {
           return  (filter[FilterTypeEnum.PPN].length || filter[FilterTypeEnum.PPN].includes(pr.ppn.toString()))
            && (filter[FilterTypeEnum.PERIOD].length || filter[FilterTypeEnum.PERIOD].some((period) => pr.payRunPeriods.includes(period.toString())))
            && (searchTerm || pr.payGroupName.toLowerCase().includes(searchTerm.toLowerCase()))
        })   ;
    const pagedItems = filteredItems.slice(
        variables.skip,
        variables.skip + variables.take
    );
    const items = pagedItems ?  pagedItems.map((pr) => {
            return {
                payRunId: pr.payRunId,
                payGroupId: pr.payGroupId,
                payGroupName: pr.payGroupName,
                payGroupIdentifier: null,
                payGroupCalendarId: pr.payGroupCalendarId,
                countryCode: pr.countryCode,
                countryName: pr.countryName,
                isoCurrencyCode: pr.isoCurrencyCode,
                payPeriodDisplay: pr.payPeriodDisplay,
                payDate: pr.payDate,
                periodStart: pr.periodStart,
                periodEnd: pr.periodEnd,
                commitDate: pr.commitDate,
                payrollLocked: pr.payrollLocked,
                payrollCommitted: pr.payrollCommitted,
                payrollCommittedDate: pr.payrollCommittedDate,
                isQuarterAmendment: pr.isQuarterAmendment,
                isYearEndAmendment: pr.isYearEndAmendment,
                hoursDisplayPrecisionInStatements:
                pr.hoursDisplayPrecisionInStatements,
                payRunStatus: pr.payRunId < 100 ? pr.payRunStatus : PayRunStatusEnum.COMMITTED,
                isOffCyclePayRun: pr.isOffCyclePayRun,
                isIPSRun: pr.isIPSRun ?? false,
                isFasterPayment: pr.isFasterPayment ?? false,
                effectiveDate: pr.effectiveDate,
                payImpoundDaysOffest: pr.payImpoundDaysOffest ?? null,
                payHolidayGroupId: pr.payHolidayGroupId ?? null,
                payRunDefId: pr.payRunDefId ?? null,
                geoCountryId: pr.geoCountryId ?? null,
                payPeriodSuffix: pr.payPeriodSuffix ?? null,
                payPeriod: pr.payPeriod ?? null,
                payRunDateOffset: pr.payRunDateOffset ?? null,
                offCyclePayRunId: pr.offCyclePayRunId ?? null,
                offCyclePayRunName: pr.offCyclePayRunName ?? null,
                offCyclePayRunTypeId: pr.offCyclePayRunTypeId ?? null,
                offCyclePayRunTypeCode: pr.offCyclePayRunTypeCode ?? null,
                offCycleReasonId: pr.offCycleReasonId ?? null,
                offCycleXRefCode: pr.offCycleXRefCode ?? null,
                impoundDate: pr.impoundDate ?? null,
                glAccrualPercent: pr.glAccrualPercent ?? null,
                ledgerCode1: pr.ledgerCode1 ?? null,
                ledgerCode2: pr.ledgerCode2 ?? null,
                isAlternateFunding: pr.isAlternateFunding ?? null,
                isLateDepositRun: pr.isLateDepositRun ?? null,
                payEntryBatchId: pr.payEntryBatchId ?? 1,
            };
        }) : null ;

    return {
        items,
        totalCount: filteredItems.length,
    };
};

// todo no needed get mock employee calculation state
export const getPayRunEmployeeProcessStateCount = (payRunIds)  => {
    const payruns = mockPayRuns?.filter((pr) =>
        payRunIds.includes(pr.payRunId)
    );

    return !payruns
        ? null
        : payruns.map((pr) => {
            return getMockEmployeeCalculationStates([pr.payRunId]);
        })[0];
};

export const getMockEmployeeCalculationStates = (payRunIds) => {
    const states = payRunIds.map((id) => {
        return {
            payRunId: id,
            notStartedCount: { count: 1, percent: 14 },
            calculatingCount: { count: 1, percent: 14 },
            calculatedCount: { count: 2, percent: 29 },
            committedCount: { count: 3, percent: 43 },
            committingCount: { count: 0, percent: 0 },
            blockedCount: { count: 0, percent: 0 },
            totalEmployees: 7,
        };
    });
    return states;
};

export const getPayRunIssueCounts = (payRunIds) => {
    const payruns = mockPayRuns?.filter((pr) =>
        payRunIds.includes(pr.payRunId)
    );
    if (!payruns?.length) {
        return null;
    }
    const payRunIssueCounts = [];

    payruns.forEach((pr) => {
        const issues = pr.payRunIssueCounts?.map((pri) => {
            return { ...pri, payRunId: pr.payRunId };
        });
        if (issues?.length) {
            payRunIssueCounts.push(...issues);
        }
    });
    return payRunIssueCounts;
};

export const getPayRunIssuesSummary = () => {
    if (!mockPayRuns?.length) {
        return null;
    }
    return mockPayRuns[0].payRunIssuesSummary;
};

export const getPayRunIssues = ({payRunId, issueType, skip, take, filters,}) => {
    const payrun = mockPayRuns?.find((pr) => pr.payRunId === payRunId);
    if (!payrun) {
        return null;
    }
    let issues =
        payrun.payRunIssues.filter((issue) => issue.issueType === issueType)
            .map((issue) => ({ ...issue, payRunId: payrun.payRunId })) || [];

    if (filters.length) {
        filters.forEach((filter) => {
            const searchTerm = filter.parameterValue.value.toString().toLowerCase();
            if (searchTerm && filterHandlers[filter.field]) {
                issues = issues.filter((issue) =>
                    filterHandlers[filter.field](issue, searchTerm)
                );
            }
        });
    }

    const pagedIssues = issues.slice(skip, skip + take);

    return {
        items: pagedIssues,
        totalCount: issues.length,
    };
};