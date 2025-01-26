/* eslint-disable max-len */
import { PayRunMessageCodeEnum } from '@models/enums/PayRunEnums';
import {
    EntryIssueActionTypeEnum,
    EntryIssueLevelEnum,
} from '@models/enums/EntryIssueEnum';
import {
    PayRunDetailedCalcStatus,
    PayRunStatusEnum,
} from '@models/enums/PayRunStatusEnums';
import {
    PayRunCalculationStatusesType,
    PayRunIssuesCountType,
    PayRunType,
    PayRunIssueType,
    PayRunIssuesSummaryType,
    payRunMessageTypes,
} from '@models/pay-run';
import {
    getEmployeeIssues,
    getPayRunIssuesSummary,
    getWageTaxEmployeeIssues,
} from './pay-run-issues';
import { OffCyclePayRunTypeCode } from '@models/enums/RunTypeEnums';
import { PayRunCalculationStatusEnums } from '@models/enums/PayRunCalculationStatusEnums';
import { PayRunPeriod } from '@models/enums/PayRunPeriodEnum';
import { AdjustmentState } from '@models/entry-issue/EntryIssueTypes';

export type MockPayRunType = PayRunType & {
    emplyeeStatus?: PayRunCalculationStatusesType;
    payRunIssueCounts?: PayRunIssuesCountType[];
    ppn: string;
    payRunPeriods: string[];
    payRunIssues?: PayRunIssueType[];
    payRunIssuesSummary?: PayRunIssuesSummaryType[];
    payRunMessageTypes?: payRunMessageTypes[];
    calculationStatus?: string;
};

export const mockPayRuns: MockPayRunType[] = Array.from(
    { length: 25 },
    (_value, i) =>
        getMockPayRuns(i * 5 + 1)?.map((x) => {
            return {
                ...x,
                payRunIssues: x.payRunIssues?.map((y) => {
                    // Ensures employee issues are not modified for wage and tax issues
                    if (y.payRunMessageTypeId === 22) {
                        return y;
                    }
                    return {
                        ...y,
                        employeeIssues: getEmployeeIssues(),
                    };
                }),
                payRunIssuesSummary: getPayRunIssuesSummary(),
            };
        })
).flat();

export function getMockPayRuns(startId = 0): MockPayRunType[] {
    const mockPayRuns = [
        {
            payRunId: startId,
            calculationStatus: PayRunCalculationStatusEnums.NotStarted,
            detailedCalculationStatus: PayRunDetailedCalcStatus.NOT_STARTED,
            payRunStatus: PayRunStatusEnum.LOCKED,
            payrollCommitted: false,
            payrollCommittedDate: null,
            payGroupId: 15,
            countryCode: 'CAN',
            countryName: 'Canada',
            isoCurrencyCode: 'CAD',
            payGroupName: 'Canadian Enterprise',
            payPeriod: '04',
            payPeriodSuffix: '00',
            payPeriodDisplay: '04 - 00',
            payDate: '2024-03-30',
            impoundDate: '2024-03-30',
            periodStart: '2024-03-19',
            periodEnd: '2024-03-26',
            commitDate: '2024-03-27',
            payRunIssueCounts: null,
            payRunIssues: null,
            payRunMessageTypes: [],
            payrollLocked: false,
            ppn: '04',
            payRunPeriods: [PayRunPeriod.LAST_PERIOD, PayRunPeriod.LAST_MONTH],
            isQuarterAmendment: false,
            isYearEndAmendment: false,
            hoursDisplayPrecisionInStatements: 4,
            isOffCyclePayRun: false,
            isIPSRun: false,
            isFasterPayment: false,
            effectiveDate: null,
            payImpoundDaysOffest: null,
            payHolidayGroupId: null,
            offCyclePayRunName: null,
            payRunDefId: null,
            geoCountryId: null,
            offCyclePayRunTypeCode: null,
            payGroupCalendarId: null,
            payRunDateOffset: null,
        },
        {
            payRunId: startId + 1,
            calculationStatus: PayRunCalculationStatusEnums.Blocked,
            detailedCalculationStatus: PayRunDetailedCalcStatus.IN_PROGRESS,
            payRunStatus: PayRunStatusEnum.UNLOCKED,
            payrollCommitted: false,
            payrollCommittedDate: null,
            payGroupId: 14,
            countryCode: 'USA',
            countryName: 'United States',
            isoCurrencyCode: 'USD',
            payGroupName: 'US Corps International',
            payPeriod: '03',
            payPeriodSuffix: '00',
            payPeriodDisplay: '03 - 00',
            payDate: '2024-03-31',
            impoundDate: '2024-03-31',
            periodStart: '2024-03-19',
            periodEnd: '2024-03-26',
            commitDate: '2024-03-25',
            payrollLocked: true,
            ppn: '02',
            payRunPeriods: ['NEXT_PERIOD', '2024'],
            isQuarterAmendment: false,
            isYearEndAmendment: false,
            hoursDisplayPrecisionInStatements: 3,
            payRunIssueCounts: [
                {
                    messageCode: PayRunMessageCodeEnum.Debug,
                    total: 33,
                },
                {
                    messageCode: PayRunMessageCodeEnum.Information,
                    total: 12,
                },
                {
                    messageCode: PayRunMessageCodeEnum.Warning,
                    total: 21,
                },
                {
                    messageCode: PayRunMessageCodeEnum.Error,
                    total: 0,
                },
                {
                    messageCode: PayRunMessageCodeEnum.WarningAsError,
                    total: 0,
                },
            ],
            payRunMessageTypes: [
                {
                    messageTypeId: 7,
                    shortName: 'Invalid business number',
                    longName: 'Invalid business number',
                },
                {
                    messageTypeId: 2,
                    shortName: 'Quick entry missing work assignment',
                    longName: 'Quick entry missing work assignment',
                },
                {
                    messageTypeId: 1,
                    shortName: 'Inaccuracy affecting Pay Run',
                    longName: 'Inaccuracy affecting Pay Run',
                },
                {
                    messageTypeId: 22,
                    shortName: 'Wage and Tax',
                    longName: 'Wage and Tax',
                },
            ],
            payRunIssues: [
                {
                    payRunMessageTypeId: 7,
                    messageTitle: 'Invalid business number',
                    issueType: EntryIssueLevelEnum.Error,
                    title: 'Invalid business number',
                    description:
                        '12345-Bob’s Burgers Federal and state taxes for Bob’s Burgers cannot be processed without a valid business number. Business numbers must contain 9 numeric characters and start with 1, 7, or 8. Please contact your admin to update the business number to ensure employees are paid.',
                    actions: [{ text: 'Contact Admin', action: 'sayHello' }],
                    employeeNumber: '12345',
                    employeeName: 'Bob’s Burgers',
                },
                {
                    payRunMessageTypeId: 2,
                    messageTitle: 'Quick entry missing work assignment',
                    issueType: EntryIssueLevelEnum.Error,
                    title: 'Quick entry missing work assignment',
                    description:
                        '67890-John Benson Quick entry for John Benson’s Bonus earnings cannot be saved without a primary work assignment. Please add a primary work assignment or delete the entry entirely to save it.',
                    actions: [
                        {
                            text: EntryIssueActionTypeEnum.EditQuickEntry,
                            action: 'edit quick entry',
                        },
                        {
                            text: EntryIssueActionTypeEnum.DeleteQuickEntry,
                            action: 'delete quick entry',
                        },
                    ],
                    employeeNumber: '67890',
                    employeeName: 'John Benson',
                },
                {
                    payRunMessageTypeId: 1,
                    messageTitle: 'Inaccuracy affecting Pay Run',
                    issueType: EntryIssueLevelEnum.Error,
                    title: 'Inaccuracy affecting Pay Run',
                    description:
                        '13579-Alleen Lorenzana Alleen Lorenzana’s earnings of $1,844 could not be sent via direct deposit. Please update their direct deposit banking details to ensure the employee is paid.',
                    actions: [
                        {
                            text: EntryIssueActionTypeEnum.EditEmployeeProfile,
                            action: 'edit employee profile',
                        },
                    ],
                    employeeNumber: '13579',
                    employeeName: 'Alleen Lorenzana',
                },
                {
                    payRunMessageTypeId: 2,
                    messageTitle: 'Quick entry missing work assignment',
                    issueType: EntryIssueLevelEnum.Error,
                    title: 'Quick entry missing work assignment',
                    description:
                        '00001-Multiple Employees 4 Employee earnings could not be sent via direct deposit. Please update each employee’s direct deposit banking details to ensure they are paid.',
                    actions: [
                        {
                            text: EntryIssueActionTypeEnum.SeeAll,
                            action: 'see all',
                        },
                    ],
                    employeeNumber: '00001',
                    employeeName: 'Multiple Employees',
                },
                {
                    payRunMessageTypeId: 1,
                    messageTitle: 'Inaccuracy affecting Pay Run',
                    issueType: EntryIssueLevelEnum.Error,
                    title: 'Inaccuracy affecting Pay Run',
                    description:
                        '22222-Multiple Employees 3 Quick entries cannot be saved without a pay rate entered. Please add a pay rate to save them.',
                    actions: [
                        {
                            text: EntryIssueActionTypeEnum.SeeAll,
                            action: 'see all',
                        },
                    ],
                    employeeNumber: '22222',
                    employeeName: 'Multiple Employees',
                },
                {
                    payRunMessageTypeId: 2,
                    messageTitle: 'Quick entry missing work assignment',
                    issueType: EntryIssueLevelEnum.Error,
                    title: 'Quick entry missing work assignment',
                    description:
                        '11111-Multiple Employees Please contact the manager “Angela Ziegler” to approve the 3 employees’ timesheets before processing your pay run.',
                    actions: [
                        {
                            text: EntryIssueActionTypeEnum.SeeDetails,
                            action: 'see details',
                        },
                    ],
                    employeeNumber: '11111',
                    employeeName: 'Multiple Employees',
                },
                {
                    payRunMessageTypeId: 7,
                    messageTitle: 'Invalid business number',
                    issueType: EntryIssueLevelEnum.Error,
                    title: 'Invalid business number',
                    description:
                        '24680-Amélie Lacroix Quick entry for Amélie Lacroix has 3 errors preventing it from saving. Please see the entry indicated below for specific details or see all issues on the issues page.',
                    actions: [
                        {
                            text: EntryIssueActionTypeEnum.PrimaryAction,
                            action: 'primary action',
                        },
                        {
                            text: EntryIssueActionTypeEnum.SecondaryAction,
                            action: 'secondary action',
                        },
                    ],
                    employeeNumber: '24680',
                    employeeName: 'Amélie Lacroix',
                },
                {
                    payRunMessageTypeId: 2,
                    messageTitle: 'Inaccuracy affecting Pay Run',
                    issueType: EntryIssueLevelEnum.Warning,
                    title: 'Inaccuracy affecting Pay Run',
                    description:
                        '54321-John Doe Indicate employee with an inaccuracy issue. Indicate how it affects the employee’s pay. Please update the employee’s earnings to ensure it is accurate.',
                    actions: [
                        {
                            text: EntryIssueActionTypeEnum.PrimaryResolution,
                            action: 'primary resolution',
                        },
                    ],
                    employeeNumber: '54321',
                    employeeName: 'John Doe',
                },
                {
                    payRunMessageTypeId: 22,
                    issueType: EntryIssueLevelEnum.Warning,
                    messageTitle: 'Wage and Tax',
                    title: 'Fed. FUTA tax is over withheld',
                    description:
                        'YTD limited wage &2,766.00 times 6.2000% equals $171.49. Over by $200.00',
                    employeeIssues: getWageTaxEmployeeIssues(1),
                    prTaxAuthorityInstanceId: 'USA-00250000-092',
                },
                {
                    payRunMessageTypeId: 22,
                    issueType: EntryIssueLevelEnum.Warning,
                    messageTitle: 'Wage and Tax',
                    title: 'NJ W/H tax is over withheld',
                    description:
                        'Fix issues by creating adjustments or resolving root causes.',
                    employeeIssues: getWageTaxEmployeeIssues(4),
                    prTaxAuthorityInstanceId: 'CAN-10140000-05',
                },
                {
                    payRunMessageTypeId: 22,
                    issueType: EntryIssueLevelEnum.Warning,
                    messageTitle: 'Wage and Tax',
                    title: 'NJ Soc. EE tax is under withheld',
                    description:
                        'Fix issues by creating adjustments or resolving root causes.',
                    employeeIssues: [
                        {
                            ...getWageTaxEmployeeIssues(1)[0],
                            adjustmentState: AdjustmentState.Processing,
                        },
                        {
                            ...getWageTaxEmployeeIssues(2)[1],
                            adjustmentState: AdjustmentState.Completed,
                        },
                    ],
                    prTaxAuthorityInstanceId: 'CAN-10000000-03',
                },
                {
                    payRunMessageTypeId: 1,
                    messageTitle: 'Quick entry missing work assignment',
                    issueType: EntryIssueLevelEnum.Warning,
                    title: 'Quick entry missing work assignment',
                    description:
                        '33333-Multiple Employees Indicate number of employees with inaccuracies. Indicate how it affects their pay and other implications with the pay run or audits. Please correct inaccuracies for each employee’s earnings to ensure it is accurate.',
                    actions: [
                        {
                            text: EntryIssueActionTypeEnum.SeeAll,
                            action: 'see all',
                        },
                        {
                            text: EntryIssueActionTypeEnum.BulkResolution,
                            action: 'bulk resolution',
                        },
                    ],
                    employeeNumber: '33333',
                    employeeName: 'Multiple Employees',
                },
                {
                    payRunMessageTypeId: 1,
                    issueType: EntryIssueLevelEnum.Warning,
                    messageTitle: 'Inaccuracy affecting Pay Run',
                    title: 'Inaccuracy affecting Pay Run',
                    description:
                        '55555-Jane Smith Indicate inaccuracy issue and how it impacts the pay run and any other aspects such as audits and reviews. Please correct inaccuracy to ensure it does not create further issues.',
                    actions: [
                        {
                            text: EntryIssueActionTypeEnum.PrimaryResolution,
                            action: 'primary resolution',
                        },
                    ],
                    employeeNumber: '55555',
                    employeeName: 'Jane Smith',
                },
                {
                    payRunMessageTypeId: 1,
                    messageTitle: 'Invalid business number',
                    issueType: EntryIssueLevelEnum.Information,
                    title: 'Invalid business number',
                    description:
                        '66666-Ben Brown Indicate employee/subject with insight. Indicate how it can improve process and what will happen.',
                    actions: [
                        {
                            text: EntryIssueActionTypeEnum.PrimaryAction,
                            action: 'primary action',
                        },
                    ],
                    employeeNumber: '66666',
                    employeeName: 'Ben Brown',
                },
                {
                    payRunMessageTypeId: 2,
                    messageTitle: 'Quick entry missing work assignment',
                    issueType: EntryIssueLevelEnum.Information,
                    title: 'Quick entry missing work assignment',
                    description:
                        '77777-Quick Entry User Indicate employee/subject with insight. Indicate how it can improve process and what will happen.',
                    actions: [
                        {
                            text: EntryIssueActionTypeEnum.SeeAll,
                            action: 'see all',
                        },
                        {
                            text: EntryIssueActionTypeEnum.BulkResolution,
                            action: 'bulk resolution',
                        },
                    ],
                    employeeNumber: '77777',
                    employeeName: 'Quick Entry User',
                },
                {
                    payRunMessageTypeId: 7,
                    issueType: EntryIssueLevelEnum.Information,
                    messageTitle: 'Inaccuracy affecting Pay Run',
                    title: 'Inaccuracy affecting Pay Run',
                    description:
                        '88888-Inaccuracy User Indicate employee/subject with insight. Indicate how it can improve process and what will happen.',
                    actions: [
                        {
                            text: EntryIssueActionTypeEnum.PrimaryAction,
                            action: 'primary action',
                        },
                    ],
                    employeeNumber: '88888',
                    employeeName: 'Inaccuracy User',
                },
            ],

            isOffCyclePayRun: false,
            isIPSRun: false,
            isFasterPayment: false,
            effectiveDate: null,
            payImpoundDaysOffest: 2,
            payHolidayGroupId: 2,
            offCyclePayRunName: null,
            payRunDefId: null,
            geoCountryId: 1,
            offCyclePayRunTypeCode: null,
            payGroupCalendarId: null,
            payRunDateOffset: 2,
        },
        {
            payRunId: startId + 2,
            calculationStatus: PayRunCalculationStatusEnums.Calculated,
            detailedCalculationStatus: PayRunDetailedCalcStatus.COMPLETE,
            payRunStatus: PayRunStatusEnum.UNLOCKED,
            payrollCommitted: false,
            payrollCommittedDate: null,
            payGroupId: 14,
            payGroupName: 'US Corps International',
            payPeriod: '03',
            payPeriodSuffix: '01',
            payPeriodDisplay: '03 - 01',
            countryCode: 'USA',
            countryName: 'United States',
            isoCurrencyCode: 'USD',
            payDate: '2024-04-06',
            impoundDate: '2024-04-05',
            periodStart: '2024-03-26',
            periodEnd: '2024-04-02',
            commitDate: '2024-04-04',
            payRunIssueCounts: [],
            payRunIssues: [],
            payRunMessageTypes: [],
            payrollLocked: null,
            ppn: '03',
            payRunPeriods: [
                PayRunPeriod.LAST_PERIOD,
                PayRunPeriod.LAST_MONTH,
                PayRunPeriod.LAST_QUARTER,
            ],
            isQuarterAmendment: false,
            isYearEndAmendment: false,
            hoursDisplayPrecisionInStatements: 4,
            isOffCyclePayRun: true,
            isIPSRun: false,
            isFasterPayment: false,
            effectiveDate: null,
            payImpoundDaysOffest: null,
            payHolidayGroupId: null,
            payRunDefId: 4,
            geoCountryId: 1,
            payGroupCalendarId: null,
            payRunDateOffset: null,
            offCyclePayRunId: 1010,
            offCyclePayRunName: 'Normal Off Cycle 22/05/2024',
            offCyclePayRunTypeId: 1,
            offCyclePayRunTypeCode: OffCyclePayRunTypeCode.NORMAL,
            offCycleReasonId: 3,
            offCycleXRefCode: 'TestXrefCode',
            glAccrualPercent: 3.4,
            ledgerCode1: 'GL1',
            ledgerCode2: null,
            isAlternateFunding: false,
            isLateDepositRun: false,
        },
        {
            payRunId: startId + 3,
            calculationStatus: PayRunCalculationStatusEnums.Calculated,
            detailedCalculationStatus: PayRunDetailedCalcStatus.COMPLETE,
            payRunStatus: PayRunStatusEnum.COMMITTING,
            payrollCommitted: false,
            payrollCommittedDate: null,
            payGroupId: 92,
            payGroupName: 'US Corps Domestic',
            countryCode: 'USA',
            countryName: 'United States',
            isoCurrencyCode: 'USD',
            payPeriod: '01',
            payPeriodSuffix: '00',
            payPeriodDisplay: '01 - 00',
            payDate: '2024-12-30',
            impoundDate: '2024-12-30',
            periodStart: '2024-12-04',
            periodEnd: '2024-12-30',
            commitDate: '2024-12-30',
            payrollLocked: false,
            ppn: '01',
            payRunPeriods: [PayRunPeriod.CURRENT_PERIOD, '2024'],
            isQuarterAmendment: false,
            isYearEndAmendment: false,
            hoursDisplayPrecisionInStatements: 3,
            payRunMessageTypes: [
                {
                    messageTypeId: 7,
                    shortName: 'Invalid business number 111',
                    longName: 'Invalid business number 111',
                },
                {
                    messageTypeId: 2,
                    shortName: 'Inaccuracy affecting Subject/Employee',
                    longName: 'Inaccuracy affecting Subject/Employee',
                },
                {
                    messageTypeId: 1,
                    shortName: 'Inaccuracy affecting Pay Run',
                    longName: 'Inaccuracy affecting Pay Run',
                },
            ],
            payRunIssueCounts: [
                {
                    messageCode: PayRunMessageCodeEnum.Debug,
                    total: 143,
                },
                {
                    messageCode: PayRunMessageCodeEnum.Information,
                    total: 332,
                },
                {
                    messageCode: PayRunMessageCodeEnum.Warning,
                    total: 18,
                },
                {
                    messageCode: PayRunMessageCodeEnum.Error,
                    total: 12,
                },
                {
                    messageCode: PayRunMessageCodeEnum.WarningAsError,
                    total: 2,
                },
            ],
            payRunIssues: [
                {
                    issueType: EntryIssueLevelEnum.Error,
                    title: 'Invalid business number 111',
                    description:
                        'Federal and state taxes for Bob’s Burgers cannot be processed without a valid business number. Business numbers must contain 9 numeric characters and start with 1, 7, or 8. Please contact your admin to update the business number to ensure employees are paid.',
                    actions: [
                        {
                            text: EntryIssueActionTypeEnum.ContactAdmin,
                            action: 'contact admin',
                        },
                    ],
                },
                {
                    issueType: EntryIssueLevelEnum.Error,
                    title: 'Quick entry missing work assignment',
                    description:
                        'Quick entry for John Benson’s Bonus earnings cannot be saved without a primary work assignment. Please add a primary work assignment or delete the entry entirely to save it.',
                    actions: [
                        {
                            text: EntryIssueActionTypeEnum.EditQuickEntry,
                            action: 'edit quick entry',
                        },
                        {
                            text: EntryIssueActionTypeEnum.DeleteQuickEntry,
                            action: 'delete quick entry',
                        },
                    ],
                },
                {
                    issueType: EntryIssueLevelEnum.Error,
                    title: 'Employee’s direct deposit information invalid',
                    description:
                        'Alleen Lorenzana’s earnings of $1,844 could not be sent via direct deposit. Please update their direct deposit banking details to ensure the employee is paid.',
                    actions: [
                        {
                            text: EntryIssueActionTypeEnum.EditEmployeeProfile,
                            action: 'edit employee profile',
                        },
                    ],
                },
                {
                    issueType: EntryIssueLevelEnum.Error,
                    title: '4 Employees’ direct deposit information invalid',
                    description:
                        '4 Employee earnings could not be sent via direct deposit. Please update each employee’s direct deposit banking details to ensure they are paid.',
                    actions: [
                        {
                            text: EntryIssueActionTypeEnum.SeeAll,
                            action: 'see all',
                        },
                    ],
                },
                {
                    issueType: EntryIssueLevelEnum.Error,
                    title: '3 Pay rates missing',
                    description:
                        '3 Quick entries cannot be saved without a pay rate entered. Please add a pay rate to save them.',
                    actions: [
                        {
                            text: EntryIssueActionTypeEnum.SeeAll,
                            action: 'see all',
                        },
                    ],
                },
                {
                    issueType: EntryIssueLevelEnum.Error,
                    title: '3 Errors blocking quick entry from committing',
                    description:
                        'Please contact the manager “Angela Ziegler” to approve the 3 employees’ timesheets before processing your pay run.',
                    actions: [
                        {
                            text: EntryIssueActionTypeEnum.SeeDetails,
                            action: 'see details',
                        },
                    ],
                },
                {
                    issueType: EntryIssueLevelEnum.Error,
                    title: '3 Timesheets Unapproved',
                    description:
                        'Quick entry for Amélie Lacroix has 3 errors preventing it from saving. Please see the entry indicated below for specific details or see all issues on the issues page.',
                    actions: [
                        {
                            text: EntryIssueActionTypeEnum.PrimaryAction,
                            action: 'primary action',
                        },
                        {
                            text: EntryIssueActionTypeEnum.SecondaryAction,
                            action: 'secondary action',
                        },
                    ],
                },
                {
                    issueType: EntryIssueLevelEnum.Warning,
                    title: 'Inaccuracy affecting Subject/Employee',
                    description:
                        'Indicate employee with an inaccuracy issue. Indicate how it affects the employee’s pay. Please update the employee’s earnings to ensure it is accurate.',
                    actions: [
                        {
                            text: EntryIssueActionTypeEnum.PrimaryResolution,
                            action: 'primary resolution',
                        },
                    ],
                },
                {
                    issueType: EntryIssueLevelEnum.Warning,
                    title: 'Inaccuracies affecting X Subject/Employees',
                    description:
                        'Indicate number of employees with an inaccuracies. Indicate how it affects the their pay and other implications with the pay run or audits. Please correct inaccuracies for each employee’s earnings to ensure it is accurate.',
                    actions: [
                        {
                            text: EntryIssueActionTypeEnum.SeeAll,
                            action: 'see all',
                        },
                        {
                            text: EntryIssueActionTypeEnum.BulkResolution,
                            action: 'bulk resolution',
                        },
                    ],
                },
                {
                    issueType: EntryIssueLevelEnum.Warning,
                    title: 'Inaccuracy affecting Pay Run',
                    description:
                        'Indicate inaccuracy issue and how it impacts the pay run and any other aspects such as audits and reviews. Please correct inaccuracy to ensure it does not create further issues.',
                    actions: [
                        {
                            text: EntryIssueActionTypeEnum.PrimaryResolution,
                            action: 'primary resolution',
                        },
                    ],
                },
                {
                    issueType: EntryIssueLevelEnum.Information,
                    title: 'Info to help with Subject/Employee',
                    description:
                        'Indicate employee/subject with insight. Indicate how it can improve process and what will happen.',
                    actions: [
                        {
                            text: EntryIssueActionTypeEnum.PrimaryAction,
                            action: 'primary action',
                        },
                    ],
                },
                {
                    issueType: EntryIssueLevelEnum.Information,
                    title: 'Inaccuracies affecting X Subject/Employees',
                    description:
                        'Indicate employee/subject with insight. Indicate how it can improve process and what will happen.',
                    actions: [
                        {
                            text: EntryIssueActionTypeEnum.SeeAll,
                            action: 'see all',
                        },
                        {
                            text: EntryIssueActionTypeEnum.BulkResolution,
                            action: 'bulk resolution',
                        },
                    ],
                },
                {
                    issueType: EntryIssueLevelEnum.Information,
                    title: 'Inaccuracy affecting Pay Run',
                    description:
                        'Indicate employee/subject with insight. Indicate how it can improve process and what will happen.',
                    actions: [
                        {
                            text: EntryIssueActionTypeEnum.PrimaryAction,
                            action: 'primary action',
                        },
                    ],
                },
            ],
            isOffCyclePayRun: false,
            isIPSRun: false,
            isFasterPayment: false,
            effectiveDate: null,
            payImpoundDaysOffest: null,
            payHolidayGroupId: null,
            offCyclePayRunName: null,
            payRunDefId: null,
            geoCountryId: null,
            offCyclePayRunTypeCode: null,
            payGroupCalendarId: null,
            payRunDateOffset: null,
        },
        {
            payRunId: startId + 4,
            calculationStatus: PayRunCalculationStatusEnums.Committed,
            detailedCalculationStatus: PayRunDetailedCalcStatus.COMPLETE,
            payRunStatus: PayRunStatusEnum.COMMITTED,
            payrollCommitted: true,
            payrollCommittedDate: '2024-12-08 19:10:01',
            payGroupId: 92,
            payGroupName: 'Canadian North',
            countryCode: 'CAN',
            countryName: 'Canada',
            isoCurrencyCode: 'CAD',
            payPeriod: '01',
            payPeriodSuffix: '00',
            payPeriodDisplay: '01 - 00',
            payDate: '2024-12-08',
            impoundDate: '2024-12-08',
            periodStart: '2024-12-01',
            periodEnd: '2024-12-08',
            commitDate: '2024-12-08',
            payrollLocked: false,
            ppn: '01',
            payRunPeriods: [PayRunPeriod.CURRENT_PERIOD, '2024'],
            isQuarterAmendment: false,
            isYearEndAmendment: false,
            hoursDisplayPrecisionInStatements: 3,
            payRunIssueCounts: [
                {
                    messageCode: PayRunMessageCodeEnum.Debug,
                    total: 32,
                },
                {
                    messageCode: PayRunMessageCodeEnum.Information,
                    total: 21,
                },
                {
                    messageCode: PayRunMessageCodeEnum.Warning,
                    total: 18,
                },
                {
                    messageCode: PayRunMessageCodeEnum.Error,
                    total: 0,
                },
                {
                    messageCode: PayRunMessageCodeEnum.WarningAsError,
                    total: 0,
                },
            ],
            payRunIssues: [
                {
                    issueType: EntryIssueLevelEnum.Error,
                    title: 'Invalid business number 222',
                    description:
                        'Federal and state taxes for Bob’s Burgers cannot be processed without a valid business number. Business numbers must contain 9 numeric characters and start with 1, 7, or 8. Please contact your admin to update the business number to ensure employees are paid.',
                    actions: [
                        {
                            text: EntryIssueActionTypeEnum.ContactAdmin,
                            action: 'contact admin',
                        },
                    ],
                },
                {
                    issueType: EntryIssueLevelEnum.Error,
                    title: 'Quick entry missing work assignment',
                    description:
                        'Quick entry for John Benson’s Bonus earnings cannot be saved without a primary work assignment. Please add a primary work assignment or delete the entry entirely to save it.',
                    actions: [
                        {
                            text: EntryIssueActionTypeEnum.EditQuickEntry,
                            action: 'edit quick entry',
                        },
                        {
                            text: EntryIssueActionTypeEnum.DeleteQuickEntry,
                            action: 'delete quick entry',
                        },
                    ],
                },
                {
                    issueType: EntryIssueLevelEnum.Error,
                    title: 'Employee’s direct deposit information invalid',
                    description:
                        'Alleen Lorenzana’s earnings of $1,844 could not be sent via direct deposit. Please update their direct deposit banking details to ensure the employee is paid.',
                    actions: [
                        {
                            text: EntryIssueActionTypeEnum.EditEmployeeProfile,
                            action: 'edit employee profile',
                        },
                    ],
                },
                {
                    issueType: EntryIssueLevelEnum.Error,
                    title: '4 Employees’ direct deposit information invalid',
                    description:
                        '4 Employee earnings could not be sent via direct deposit. Please update each employee’s direct deposit banking details to ensure they are paid.',
                    actions: [
                        {
                            text: EntryIssueActionTypeEnum.SeeAll,
                            action: 'see all',
                        },
                    ],
                },
                {
                    issueType: EntryIssueLevelEnum.Error,
                    title: '3 Pay rates missing',
                    description:
                        '3 Quick entries cannot be saved without a pay rate entered. Please add a pay rate to save them.',
                    actions: [
                        {
                            text: EntryIssueActionTypeEnum.SeeAll,
                            action: 'see all',
                        },
                    ],
                },
                {
                    issueType: EntryIssueLevelEnum.Error,
                    title: '3 Errors blocking quick entry from committing',
                    description:
                        'Please contact the manager “Angela Ziegler” to approve the 3 employees’ timesheets before processing your pay run.',
                    actions: [
                        {
                            text: EntryIssueActionTypeEnum.SeeDetails,
                            action: 'see details',
                        },
                    ],
                },
                {
                    issueType: EntryIssueLevelEnum.Error,
                    title: '3 Timesheets Unapproved',
                    description:
                        'Quick entry for Amélie Lacroix has 3 errors preventing it from saving. Please see the entry indicated below for specific details or see all issues on the issues page.',
                    actions: [
                        {
                            text: EntryIssueActionTypeEnum.PrimaryAction,
                            action: 'primary action',
                        },
                        {
                            text: EntryIssueActionTypeEnum.SecondaryAction,
                            action: 'secondary action',
                        },
                    ],
                },
                {
                    issueType: EntryIssueLevelEnum.Warning,
                    title: 'Inaccuracy affecting Subject/Employee',
                    description:
                        'Indicate employee with an inaccuracy issue. Indicate how it affects the employee’s pay. Please update the employee’s earnings to ensure it is accurate.',
                    actions: [
                        {
                            text: EntryIssueActionTypeEnum.PrimaryResolution,
                            action: 'primary resolution',
                        },
                    ],
                },
                {
                    issueType: EntryIssueLevelEnum.Warning,
                    title: 'Inaccuracies affecting X Subject/Employees',
                    description:
                        'Indicate number of employees with an inaccuracies. Indicate how it affects the their pay and other implications with the pay run or audits. Please correct inaccuracies for each employee’s earnings to ensure it is accurate.',
                    actions: [
                        {
                            text: EntryIssueActionTypeEnum.SeeAll,
                            action: 'see all',
                        },
                        {
                            text: EntryIssueActionTypeEnum.BulkResolution,
                            action: 'bulk resolution',
                        },
                    ],
                },
                {
                    issueType: EntryIssueLevelEnum.Warning,
                    title: 'Inaccuracy affecting Pay Run',
                    description:
                        'Indicate inaccuracy issue and how it impacts the pay run and any other aspects such as audits and reviews. Please correct inaccuracy to ensure it does not create further issues.',
                    actions: [
                        {
                            text: EntryIssueActionTypeEnum.PrimaryResolution,
                            action: 'primary resolution',
                        },
                    ],
                },
                {
                    issueType: EntryIssueLevelEnum.Information,
                    title: 'Info to help with Subject/Employee',
                    description:
                        'Indicate employee/subject with insight. Indicate how it can improve process and what will happen.',
                    actions: [
                        {
                            text: EntryIssueActionTypeEnum.PrimaryAction,
                            action: 'primary action',
                        },
                    ],
                },
                {
                    issueType: EntryIssueLevelEnum.Information,
                    title: 'Inaccuracies affecting X Subject/Employees',
                    description:
                        'Indicate employee/subject with insight. Indicate how it can improve process and what will happen.',
                    actions: [
                        {
                            text: EntryIssueActionTypeEnum.SeeAll,
                            action: 'see all',
                        },
                        {
                            text: EntryIssueActionTypeEnum.BulkResolution,
                            action: 'bulk resolution',
                        },
                    ],
                },
                {
                    issueType: EntryIssueLevelEnum.Information,
                    title: 'Inaccuracy affecting Pay Run',
                    description:
                        'Indicate employee/subject with insight. Indicate how it can improve process and what will happen.',
                    actions: [
                        {
                            text: EntryIssueActionTypeEnum.PrimaryAction,
                            action: 'primary action',
                        },
                    ],
                },
            ],
            isOffCyclePayRun: false,
            isIPSRun: false,
            isFasterPayment: false,
            effectiveDate: null,
            payImpoundDaysOffest: null,
            payHolidayGroupId: null,
            offCyclePayRunName: null,
            payRunDefId: null,
            geoCountryId: null,
            offCyclePayRunTypeCode: null,
            payGroupCalendarId: null,
            payRunDateOffset: null,
        },
    ];

    mockPayRuns.forEach((payRun) => {
        payRun.payRunIssues?.forEach((issue) => {
            issue.employeeName ??= null;
            issue.employeeNumber ??= null;
            issue.actions ??= null;
            //issue.payRunMessageId ??= null;
            issue.payRunMessageTypeId ??= null;
            issue.payRunMessageLevelId ??= null;
            issue.payEntryBatchDataId ??= null;
            issue.employeeId ??= null;
            issue.employeeIssues ??= null;
            issue.messageTypeCodeName ??= null;
            issue.messageLabel ??= null;
            issue.messageParams ??= null;
        });
    });

    return mockPayRuns;
}
