import {
    EmployeeFlyoutBaseInfoType,
    EmployeeCalculationInfoType,
} from '@models/employee/employee-flyout/EmployeeFlyoutApiTypes';

export interface IEmployeeFlyoutApi {
    getEmployeeFlyoutBaseInfoAsync(
        employeeId: number,
        payRunId: number,
        signal?: AbortSignal
    ): Promise<EmployeeFlyoutBaseInfoType | null>;
    getEmployeeCalculationInfoAsync(
        employeeId: number,
        payRunId: number,
        signal?: AbortSignal,
        isPolling?: boolean
    ): Promise<EmployeeCalculationInfoType | null>;
}
