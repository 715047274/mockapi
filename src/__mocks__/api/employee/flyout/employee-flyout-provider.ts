import { EmployeeFlyoutBaseInfoType } from '@models/employee/employee-flyout/EmployeeFlyoutApiTypes';
import { employees } from './employee-flyout-options';

export const getEmployeeFlyoutBaseInfoMock = (
    employeeId: number,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    payRunId: number
): EmployeeFlyoutBaseInfoType => {
    return employees.find(
        (emp) => emp.employeeId === employeeId % employees.length
    );
};
