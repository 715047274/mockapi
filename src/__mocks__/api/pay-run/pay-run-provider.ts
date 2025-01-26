import { ApiPagingDataType } from '@models/common/ApiResultTypes';
import { FilterTypeEnum } from '@models/constants/FilterConstants';

import {
    PayRunCalculationStatusesType,
    PayRunType,
    PayRunIssuesCountType,
    PayRunStatusType,
    PayRunPollingResultType,
    PayRunIssueType,
    GetPayRunIssuesRequestType,
    PayRunIssuesSummaryType,
} from '@models/pay-run';
import { PayRunStatusEnum } from '@models/enums/PayRunStatusEnums';
import { mockPayRuns } from './pay-runs';
import { filterHandlers } from '@utils/FilterModelUtils';
import { IFilter } from '@models/common/FilterTypes';
import { PayRunCalculationStatusEnums } from '@models/enums/PayRunCalculationStatusEnums';

export const getPayRunsWithProcessState = (
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    variables: any
): ApiPagingDataType<PayRunType> => {
    const filter: IFilter = variables?.filter;
    const searchTerm: string = variables?.searchTerm;

    const filteredItems = !filter
        ? mockPayRuns
        : mockPayRuns.filter(
              (pr) =>
                  (!filter[FilterTypeEnum.PPN]?.length ||
                      filter[FilterTypeEnum.PPN]?.includes(
                          pr.ppn.toString()
                      )) &&
                  (!filter[FilterTypeEnum.PERIOD]?.length ||
                      filter[FilterTypeEnum.PERIOD]?.some((period) =>
                          pr.payRunPeriods.includes(period)
                      )) &&
                  (!searchTerm ||
                      pr.payGroupName
                          .toLowerCase()
                          .includes(searchTerm.toLowerCase()))
          );

    const pagedItems = filteredItems?.slice(
        variables?.skip,
        variables?.skip + variables?.take
    );
    const items: PayRunType[] = !pagedItems
        ? null
        : pagedItems.map((pr) => {
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
                  payRunStatus:
                      pr.payRunId < 100
                          ? pr.payRunStatus
                          : PayRunStatusEnum.COMMITTED,
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
          });

    return {
        items,
        totalCount: filteredItems?.length,
    };
};

export const getPayRunsProcessState = (
    payRunIds: number[]
): Array<PayRunStatusType> | null => {
    const payruns = mockPayRuns?.filter((pr) =>
        payRunIds.includes(pr.payRunId)
    );

    return !payruns || payruns.length === 0
        ? null
        : payruns.map((pr) => ({
              payRunId: pr.payRunId,
              payRunStatus: pr.payRunStatus,
              payrollCommitted: pr.payrollCommitted,
              payrollCommittedDate: pr.payrollCommittedDate,
              calculationStatus:
                  pr.calculationStatus ??
                  PayRunCalculationStatusEnums.NotStarted,
              detailedCalculationStatus: pr.detailedCalculationStatus,
          }));
};

export const getPayRunEmployeeProcessStateCount = (
    payRunIds: number[]
): Array<PayRunCalculationStatusesType> | null => {
    const payruns = mockPayRuns?.filter((pr) =>
        payRunIds.includes(pr.payRunId)
    );

    return !payruns
        ? null
        : payruns.map((pr) => {
              return getMockEmployeeCalculationState(pr.payRunId);
          });
};

export const getMockEmployeeCalculationState = (
    payRunId: number
): PayRunCalculationStatusesType => ({
    payRunId,
    notStartedCount: { count: 1, percent: 14 },
    calculatingCount: { count: 1, percent: 14 },
    calculatedCount: { count: 2, percent: 29 },
    committedCount: { count: 3, percent: 43 },
    committingCount: { count: 0, percent: 0 },
    blockedCount: { count: 0, percent: 0 },
    totalEmployees: 7,
});

export const getPayRunIssueCounts = (
    payRunIds: number[]
): Array<PayRunIssuesCountType> | null => {
    const payruns = mockPayRuns?.filter((pr) =>
        payRunIds.includes(pr.payRunId)
    );
    if (!payruns?.length) {
        return null;
    }
    const payRunIssueCounts: PayRunIssuesCountType[] = [];

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

export const getPayRunIssuesSummary =
    (): Array<PayRunIssuesSummaryType> | null => {
        if (!mockPayRuns?.length) {
            return null;
        }
        return mockPayRuns[0].payRunIssuesSummary;
    };

export const getPayRunIssues = ({
    payRunId,
    issueType,
    skip,
    take,
    filters,
}: GetPayRunIssuesRequestType): {
    items: Array<PayRunIssueType>;
    totalCount: number;
} | null => {
    const payrun = mockPayRuns?.find((pr) => pr.payRunId === payRunId);
    if (!payrun) {
        return null;
    }
    let issues =
        payrun.payRunIssues
            ?.filter((issue) => issue.issueType === issueType)
            .map((issue) => ({ ...issue, payRunId: payrun.payRunId })) || [];

    if (filters?.length) {
        filters.forEach((filter) => {
            const searchTerm = filter?.parameterValue?.value
                ?.toString()
                ?.toLowerCase();

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

export const getPayRunMessageTypes = (
    payRunId: number,
    returnDistinctShortName: boolean
): any => {
    const payrun = mockPayRuns?.find((pr) => pr.payRunId === payRunId);
    if (!payrun) {
        return [];
    }
    return returnDistinctShortName
        ? payrun.payRunMessageTypes.filter((mt) => mt.shortName)
        : payrun.payRunMessageTypes;
};

export const getLastCommittedPayRun = (payGroupId: number): any => {
    const date = new Date();
    date.setDate(date.getDate() - 20);
    return {
        payRunId: 101,
        payGroupId,
        payDate: date.toString(),
    };
};

export const pollPayRuns = (
    payRunIds: Array<number>
): PayRunPollingResultType => {
    return {
        payRunProcessStates: getPayRunsProcessState(payRunIds),
        payRunIssuesCount: getPayRunIssueCounts(payRunIds),
    };
};
