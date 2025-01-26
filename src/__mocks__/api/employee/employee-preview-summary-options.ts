import {
    EmployeePreviewSummaryType,
    EmployeePreviewCodeLevelDetailsType,
    EmployeePaymentDetailsType,
} from '@models/preview/EmployeePreviewSummaryType';
import { PreviewItemTypeEnum } from '@models/enums/PreviewEnums';
import {
    EmployeeStatusItem,
    PayRunEmployeeStatus,
} from '@models/employee/EmployeeTypes';
import { EmployeeProcessStateEnum } from '@models/enums/PayRunStatusEnums';
import { ApiPaginResultType } from '@models/common/ApiResultTypes';
import { PageInfo } from '@models/common/PageInfoType';
import { CodeBaseInfoType } from '@models/code/CodeTypes';
import { EmployeeFilterResultType } from '@models/preview/PreviewSummaryType';
import { chaoticObjects } from '../../chaoticGenerationUtils';

export const TOTAL_COUNT = 1002;

const amounts = [
    { amount: 100.0, toCompareAmount: 910, variance: -810 },
    { amount: 23786.0, toCompareAmount: 23780, variance: 6 },
    { amount: 58.0, toCompareAmount: 58, variance: 0 },
];

export const getEmployees1Mock = (
    employeeIds: number[]
): Array<EmployeePreviewSummaryType> => {
    const a = Array(employeeIds?.length)
        .fill({
            employeeId: null,
            employeeName: null,
            employeeNumber: null,
            status: null,
            payClass: null,
            payType: null,
        })
        .map((_, idx) => ({
            payRunId: 1,
            employeeId: employeeIds[+idx],
            employeeName: 'First Last',
            employeeNumber: '1234567890',
            payClass: 'payClass',
            payType: 'payType',
            items: [
                {
                    itemType: PreviewItemTypeEnum.Earning,
                    ...amounts[Math.floor(Math.random() * amounts.length)],
                },
                {
                    itemType: PreviewItemTypeEnum.EmployeeTax,
                    ...amounts[Math.floor(Math.random() * amounts.length)],
                },
                {
                    itemType: PreviewItemTypeEnum.PreTaxDeduction,
                    ...amounts[Math.floor(Math.random() * amounts.length)],
                },
                {
                    itemType: PreviewItemTypeEnum.EmployerTax,
                    ...amounts[Math.floor(Math.random() * amounts.length)],
                },
                {
                    itemType: PreviewItemTypeEnum.Hours,
                    ...amounts[Math.floor(Math.random() * amounts.length)],
                },
                {
                    itemType: PreviewItemTypeEnum.NetPay,
                    ...amounts[Math.floor(Math.random() * amounts.length)],
                },
                {
                    itemType: PreviewItemTypeEnum.MemoCalc,
                    ...amounts[Math.floor(Math.random() * amounts.length)],
                },
                {
                    itemType: PreviewItemTypeEnum.PostTaxDeduction,
                    ...amounts[Math.floor(Math.random() * amounts.length)],
                },
                {
                    itemType: PreviewItemTypeEnum.TaxableBenefit,
                    ...amounts[Math.floor(Math.random() * amounts.length)],
                },
                {
                    itemType: PreviewItemTypeEnum.Deduction,
                    ...amounts[Math.floor(Math.random() * amounts.length)],
                },
            ],
        }));
    return a.map((item) => ({
        ...item,
        items: item.items.map((item) => ({
            ...item,
            percentVariance: 0, // Add the missing percentVariance property
        })),
    }));
};

export const mockDataOption1: Array<EmployeePreviewSummaryType> = [
    {
        payRunId: 1,
        employeeId: 1,
        employeeName: 'First Last',
        employeeNumber: '1234567890',
        items: [
            {
                itemType: PreviewItemTypeEnum.Earning,
                amount: 100.0,
                toCompareAmount: 910.0,
                variance: -810.0,
                percentVariance: 10,
            },
            {
                itemType: PreviewItemTypeEnum.EmployeeTax,
                amount: 100.0,
                toCompareAmount: 910.0,
                variance: -810.0,
                percentVariance: 10,
            },
            {
                itemType: 4,
                amount: 100.0,
                toCompareAmount: 910.0,
                variance: -810.0,
                percentVariance: 10,
            },
            {
                itemType: 5,
                amount: 100.0,
                toCompareAmount: 910.0,
                variance: -810.0,
                percentVariance: 10,
            },
            {
                itemType: 6,
                amount: 100.0,
                toCompareAmount: 910.0,
                variance: -810.0,
                percentVariance: 10,
            },
            {
                itemType: 7,
                amount: 100.0,
                toCompareAmount: 910.0,
                variance: -810.0,
                percentVariance: 10,
            },
            {
                itemType: 8,
                amount: 100.0,
                toCompareAmount: 910.0,
                variance: -810.0,
                percentVariance: 10,
            },
        ],
    },
    {
        payRunId: 1,
        employeeId: 2,
        employeeName: 'First Last',
        employeeNumber: '1234567890',
        items: [
            {
                itemType: 2,
                amount: 100.0,
                toCompareAmount: 91.0,
                variance: 9.0,
                percentVariance: 10,
            },
            {
                itemType: 3,
                amount: 100.0,
                toCompareAmount: 100.0,
                variance: 0,
                percentVariance: 10,
            },
            {
                itemType: 4,
                amount: 100.0,
                toCompareAmount: 910.0,
                variance: -810.0,
                percentVariance: 10,
            },
            {
                itemType: 5,
                amount: 100.0,
                toCompareAmount: 910.0,
                variance: -810.0,
                percentVariance: 10,
            },
            {
                itemType: 6,
                amount: 100.0,
                toCompareAmount: 910.0,
                variance: -810.0,
                percentVariance: 10,
            },
            {
                itemType: 7,
                amount: 100.0,
                toCompareAmount: 910.0,
                variance: -810.0,
                percentVariance: 10,
            },
            {
                itemType: 8,
                amount: 100.0,
                toCompareAmount: 910.0,
                variance: -810.0,
                percentVariance: 10,
            },
        ],
    },
];

export const getPreviewEmployeeSummaries =
    (): Array<EmployeePreviewSummaryType> => {
        return mockDataOption1;
    };

const processStateCodes = [
    EmployeeProcessStateEnum.CALCULATED,
    EmployeeProcessStateEnum.CALCULATED,
    EmployeeProcessStateEnum.CALCULATED,
    EmployeeProcessStateEnum.CALCULATED,
    EmployeeProcessStateEnum.CALCULATED,
    EmployeeProcessStateEnum.CALCULATED,
    EmployeeProcessStateEnum.NONE,
    EmployeeProcessStateEnum.CALCULATING,
    EmployeeProcessStateEnum.NOTSTART,
    EmployeeProcessStateEnum.BLOCKED,
    EmployeeProcessStateEnum.COMMITTED,
];
export const lastCalculatedOptions = [
    new Date('2023-07-05T05:02:04'),
    new Date('2023-07-01T21:07:24'),
    new Date('2023-06-25T15:59:54'),
    new Date('2023-06-17T00:42:14'),
];
const errorCounts = [0, 0, 0, 0, 1];

export const mockDataOption2: PayRunEmployeeStatus =
    makeEmployeeProcessStateMockData(
        Array.from(new Array<number>(TOTAL_COUNT))
    );
export function makeEmployeeProcessStateMockData(
    employeeIds: number[]
): PayRunEmployeeStatus {
    return {
        payRunId: 1,
        statuses: employeeIds.map((id, idx) => {
            const datasetIdx = id ? id - 1 : idx;
            return {
                employeeId: datasetIdx + 1,
                processStateCode:
                    processStateCodes[datasetIdx % processStateCodes.length],
                lastCalculated:
                    lastCalculatedOptions[
                        datasetIdx % lastCalculatedOptions.length
                    ],
                errorCount: errorCounts[datasetIdx % errorCounts.length],
            };
        }),
    };
}

export function makeChaoticEmployeeProcessStateMockData(
    employeeIds: number[],
    seed = 1
): PayRunEmployeeStatus {
    let id = 1;
    function giveId(item: EmployeeStatusItem) {
        item.employeeId = id++;
    }
    return {
        payRunId: 1,
        statuses: chaoticObjects(
            {
                employeeId: [1],
                processStateCode: processStateCodes,
                lastCalculated: lastCalculatedOptions,
                errorCount: errorCounts,
            },
            employeeIds.length,
            seed,
            giveId
        ),
    };
}

const details = [
    {
        amount: 100.0,
        toCompareAmount: 910,
        amountVariance: -810,
        hours: 10,
        toCompareHours: 2,
        hourVariance: 8,
        mtdAmount: 10,
        qtdAmount: 10,
        ytdAmount: 10,
        currentTotalTaxableWages: 15.6,
        currentLimitedTaxableWages: 29.3,
        adjustmentHours: 39,
        adjustmentAmount: 28.2,
        toCompareTotalTaxableWages: 12,
        toCompareLimitedTaxableWages: 30.4,
        totalTaxableWagesVariance: 3.6,
        limitedTaxableWagesVariance: -1.1,
    },
    {
        amount: 23786.0,
        toCompareAmount: 23780,
        amountVariance: 6,
        hours: 10,
        toCompareHours: 2,
        hourVariance: 8,
        mtdAmount: 10,
        qtdAmount: 10,
        ytdAmount: 10,
        currentTotalTaxableWages: 15.6,
        currentLimitedTaxableWages: 29.3,
        adjustmentHours: 39,
        adjustmentAmount: 28.2,
        toCompareTotalTaxableWages: 12,
        toCompareLimitedTaxableWages: 30.4,
        totalTaxableWagesVariance: 3.6,
        limitedTaxableWagesVariance: -1.1,
    },
    {
        amount: 58.0,
        toCompareAmount: 58,
        amountVariance: 0,
        hours: 10,
        toCompareHours: 2,
        hourVariance: 8,
        mtdAmount: 10,
        qtdAmount: 10,
        ytdAmount: 10,
        currentTotalTaxableWages: 15.6,
        currentLimitedTaxableWages: 29.3,
        adjustmentHours: 39,
        adjustmentAmount: 28.2,
        toCompareTotalTaxableWages: 12,
        toCompareLimitedTaxableWages: 30.4,
        totalTaxableWagesVariance: 3.6,
        limitedTaxableWagesVariance: -1.1,
    },
];
const STATUS_SAMPLE = ['Active', 'Active', 'Active', 'Inactive', 'Terminated'];

const paymentDetails = [
    {
        amount: 100.0,
        toCompareAmount: 910,
        amountVariance: -810,
        count: 3,
        countVariance: 1,
    },
    {
        amount: 23786.0,
        toCompareAmount: 23780,
        amountVariance: 6,
        count: 3,
        countVariance: 1,
    },
    {
        amount: 58.0,
        toCompareAmount: 58,
        amountVariance: 0,
        count: 3,
        countVariance: 1,
    },
];

export const getEmployeesCodeDetailsMock = (
    { skip, take }: PageInfo,
    legalEntityIds: number[]
): ApiPaginResultType<EmployeePreviewCodeLevelDetailsType> => {
    const employeeCountPerLE = 11;
    const employees = Array(take)
        .fill({
            employeeId: null,
        })
        .map((_, idx) => ({
            employeeId: +idx + skip + 1,
            employeeName: 'Name ' + idx + skip + 1,
            employeeNumber: 'Number ' + idx + skip + 1,
            statusCode: STATUS_SAMPLE[idx % STATUS_SAMPLE.length],
            ...details[idx % details.length],
        }));
    const totalCount =
        legalEntityIds?.length > 0
            ? legalEntityIds?.length * employeeCountPerLE
            : TOTAL_COUNT;
    const end = totalCount < skip + take ? totalCount - skip : take;
    return {
        loading: false,
        items: employees.slice(0, end),
        totalCount: totalCount,
    };
};
export const getEmployeesPaymentDetailsMock = ({
    skip,
    take,
}: PageInfo): ApiPaginResultType<EmployeePaymentDetailsType> => {
    const employeeCountPerLE = 11;
    const employees = Array(take)
        .fill({
            employeeId: null,
        })
        .map((_, idx) => ({
            employeeId: +idx + skip,
            employeeName: 'Name ' + idx + skip,
            employeeNumber: 'Number ' + idx + skip,
            ...paymentDetails[idx % details.length],
        }));
    const totalCount = employees.length * employeeCountPerLE;
    const end = totalCount < skip + take ? totalCount - skip : take;
    return {
        loading: false,
        items: employees.slice(0, end),
        totalCount: totalCount,
    };
};
export const NAME_SAMPLE = [
    'Nancy',
    'Andrew',
    'Janet',
    'Margaret',
    'Steven',
    'Michael',
    'Robert',
    'Laura',
    'Anne',
    'Jason',
];
export const getpreviewEmployeesByFiltersMock = (
    { skip, take }: PageInfo,
    searchTerm: string,
    legalEntityIds: number[],
    codeIds: CodeBaseInfoType[],
    employmentStatusIds: number[]
): { employees: Array<EmployeeFilterResultType>; totalCount: number } => {
    const CODEID_SAMPLE = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const EMPLOYMENT_STATUS = [1, 2, 3, 4];
    const employees = Array.from(Array(TOTAL_COUNT).keys()).map((_, idx) => ({
        employeeId: idx + 1,
        legalEntityId: (idx % 10) + 200,
        codeId: CODEID_SAMPLE[Math.floor(Math.random() * CODEID_SAMPLE.length)],
        employmentStatusId: EMPLOYMENT_STATUS[idx % EMPLOYMENT_STATUS.length],
        employeeName: NAME_SAMPLE[idx % NAME_SAMPLE.length],
    }));
    let filteredEmployees = [...employees];
    if (employmentStatusIds && employmentStatusIds.length > 0) {
        filteredEmployees = filteredEmployees.filter((emp) =>
            employmentStatusIds?.includes(emp.employmentStatusId)
        );
        if (employmentStatusIds.includes(-1)) {
            filteredEmployees.push(
                employees[Math.max(employees.length - 5, 0)]
            );
        }
        if (employmentStatusIds.includes(-2)) {
            filteredEmployees.push(
                employees[Math.max(employees.length - 3, 0)]
            );
        }
    }
    if (legalEntityIds && legalEntityIds.length > 0) {
        filteredEmployees = filteredEmployees.filter((emp) =>
            legalEntityIds?.includes(emp.legalEntityId)
        );
    }
    if (codeIds && codeIds.length > 0) {
        filteredEmployees = filteredEmployees.filter((emp) =>
            codeIds?.map((x) => +x.codeId).includes(emp.codeId)
        );
    }
    if (searchTerm) {
        filteredEmployees = filteredEmployees.filter((emp) =>
            emp.employeeName.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }
    const length = filteredEmployees.length;
    const end = length > skip + take ? skip + take : length;
    const mappedEmployees = filteredEmployees
        .map((emp) => ({ employeeId: emp.employeeId, isFromPrevPayRun: false }))
        .slice(skip, end);
    mappedEmployees[0] && (mappedEmployees[0].isFromPrevPayRun = true);
    return {
        employees: mappedEmployees,
        totalCount: length,
    };
};
