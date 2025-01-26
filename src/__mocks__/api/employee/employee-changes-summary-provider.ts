import { EmployeeChangesSummaryType } from '@models/employee/employee-change-summary/EmployeeChangesSummaryType';
import { EmploymentStatusTypeEnum } from '@models/enums/EmploymentStatusTypeEnum';
import {
    getEmployeeAllChangesSummaryData,
    getEmployeeChangesSummaryData,
} from './employee-changes-summary-options';
import { AllEmployeeChangesSummaryType } from '@models/employee/employee-change-summary/AllEmployeeChangesSummaryType';

export const getEmployeeChangesSummaryMock = (
    employmentStatusType: EmploymentStatusTypeEnum,
    payRunId?: number
): EmployeeChangesSummaryType => {
    /*
    1st payrunId = 1 => 0 employees
    2nd payrunId = 2 => 1 employee
    3rd payrunId = 3 => 2 employees
    4th payrunId = 4 / onwards => 3 employees
    */
    const maxEmployeeCount = payRunId > 4 ? 3 : payRunId - 1;
    return getEmployeeChangesSummaryData(
        employmentStatusType,
        maxEmployeeCount
    );
};

export const getEmployeeAllChangesSummaryMock =
    (): AllEmployeeChangesSummaryType => {
        return getEmployeeAllChangesSummaryData();
    };
