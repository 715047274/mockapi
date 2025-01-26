import { EmployeeType } from '@models/employee/EmployeeTypes';
import { GetEmployeesRequestType } from '@models/employee/grid-summary/GetEmployeesRequestType';
import { GetEmployeesResultType } from '@models/employee/grid-summary/GetEmployeesResultType';
import { EmploymentTypeCode } from '@models/constants/EmploymentTypeCodeConstants';
import { NAME_SAMPLE } from './employee-preview-summary-options';
import { EmployeeSearchResultType } from '@models/employee/SearchEmployeesResponseType';

export const getEmployeesMock = (
    payload: GetEmployeesRequestType
): GetEmployeesResultType => {
    const STATUS_SAMPLE = ['Calculated', 'Validated'];
    const { skip, take } = payload;

    const employees = Array<EmployeeType>(take)
        .fill({
            employeeId: null,
            employeeName: null,
            employeeNumber: null,
            status: null,
            payClass: null,
            payType: null,
        })
        .map((_, idx) => ({
            employeeId: 1 + skip + idx,
            employeeName:
                NAME_SAMPLE[Math.floor(Math.random() * NAME_SAMPLE.length)],
            employeeNumber: (1 + skip + idx).toString(),
            status: STATUS_SAMPLE[
                Math.floor(Math.random() * STATUS_SAMPLE.length)
            ],
            payClass: 'Full Time',
            payType: 'Hourly',
        }));
    return { employees: { totalCount: 820, items: employees } };
};

export const getEmployeesMock1 = (
    payload: GetEmployeesRequestType
): EmployeeType[] => {
    const STATUS_SAMPLE = ['Active', 'Inactive', 'Probation', 'Terminated'];
    const employees = Array<EmployeeType>(1002)
        .fill({
            employeeId: null,
            employeeName: null,
            employeeNumber: null,
            status: null,
            payClass: null,
            payType: null,
        })
        .map((_, idx) => ({
            employeeId: idx + 1,
            employeeName: NAME_SAMPLE[idx % NAME_SAMPLE.length],
            employeeNumber: (idx + 1).toString(),
            status: STATUS_SAMPLE[idx % STATUS_SAMPLE.length],
            payClass: 'Full Time',
            payType: 'Hourly',
        }));
    const filteredItems = employees.filter(
        (pr) =>
            !payload?.employeeIds ||
            payload?.employeeIds?.includes(pr.employeeId)
    );
    return filteredItems;
};

export function getEmployeeRate(employeeId: number): EmployeeSearchResultType {
    return {
        employeeId,
        displayName: 'Mock M Employee',
        employeeName: 'Mock M Employee',
        employeeNumber: '111',
        displayNameWithFullMiddleName: 'Mock Middle Employee',
        displayNameWithOnlyFirstAndLast: 'Mock Employee',
        employmentType: EmploymentTypeCode.EMPLOYEE,
        baseRate: 5000,
        vacationRate: 4500,
        alternateRate: 6000,
        averageOvertimeRate: 7500,
        isMovedIntoPayRun: false,
    };
}
