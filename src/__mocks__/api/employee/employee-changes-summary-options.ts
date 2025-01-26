import { AllEmployeeChangesSummaryType } from '@models/employee/employee-change-summary/AllEmployeeChangesSummaryType';
import {
    EmployeeChangeDetailType,
    EmployeeChangesSummaryType,
} from '@models/employee/employee-change-summary/EmployeeChangesSummaryType';
import { EmploymentStatusTypeEnum } from '@models/enums/EmploymentStatusTypeEnum';

const MAX_EMPLOYEE_LIST_COUNT = 3;
const DEFAULT_TOTAL_TERMINATED_EMPLOYEES_COUNT = 28; // USING AS SPECIFIC NUMBER IF 3 OR MORE IN TOTAL
const DEFAULT_TOTAL_NEWHIRE_EMPLOYEES_COUNT = 11; // USING AS SPECIFIC NUMBER IF 3 OR MORE IN TOTAL

const terminatedEmployees: EmployeeChangeDetailType[] = [
    {
        employeeId: 319322491,
        employeeName: "Moira O'Deorain",
        employeeNumber: '319322491',
        amount: 2277.34,
        effectiveTime: '01/17/23',
    },
    {
        employeeId: 322491913,
        employeeName: 'Jean-Baptiste Augustin',
        employeeNumber: '322491913',
        amount: 1906.55,
        effectiveTime: '01/19/23',
    },
    {
        employeeId: 320701160,
        employeeName: 'Hana Song',
        employeeNumber: '320701160',
        amount: 2543.23,
        effectiveTime: '01/24/23',
    },
];

const newHireEmployees: EmployeeChangeDetailType[] = [
    {
        employeeId: 322499564,
        employeeName: 'Angela Zeigler',
        employeeNumber: '322499564',
        amount: 1648.72,
        effectiveTime: '01/20/23',
    },
    {
        employeeId: 322632906,
        employeeName: 'Wilhelm Reinhardt',
        employeeNumber: '322632906',
        amount: 1208.46,
        effectiveTime: '01/23/23',
    },
    {
        employeeId: 322809111,
        employeeName: 'Hanzo Shimada',
        employeeNumber: '322809111',
        amount: 895.8,
        effectiveTime: '01/23/23',
    },
];

export const getEmployeeChangesSummaryData = (
    employmentStatusType: EmploymentStatusTypeEnum,
    maxCount: number
): EmployeeChangesSummaryType => {
    const defaultTotalEmployeesCount =
        employmentStatusType === EmploymentStatusTypeEnum.NewHire
            ? DEFAULT_TOTAL_NEWHIRE_EMPLOYEES_COUNT
            : DEFAULT_TOTAL_TERMINATED_EMPLOYEES_COUNT;
    const srcEmployees =
        employmentStatusType === EmploymentStatusTypeEnum.NewHire
            ? newHireEmployees
            : terminatedEmployees;
    const newEmployees = srcEmployees.slice(0, maxCount < 0 ? 0 : maxCount);
    return {
        totalCount:
            maxCount >= MAX_EMPLOYEE_LIST_COUNT
                ? defaultTotalEmployeesCount
                : maxCount,
        employmentStatusType:
            employmentStatusType === EmploymentStatusTypeEnum.NewHire
                ? EmploymentStatusTypeEnum.NewHire.toString()
                : EmploymentStatusTypeEnum.Terminated.toString(),
        differencePercentage:
            employmentStatusType === EmploymentStatusTypeEnum.NewHire
                ? 32
                : -18,
        employees: newEmployees,
    };
};

export const getEmployeeAllChangesSummaryData =
    (): AllEmployeeChangesSummaryType => {
        return {
            differencePercentageTerminated: 100,
            differencePercentageHired: 100,
            differencePercentageReactivated: 100,
            termedEmployees: terminatedEmployees,
            hiredEmployees: newHireEmployees,
            reactivatedEmployees: [],
            termedEmployeesCount: DEFAULT_TOTAL_TERMINATED_EMPLOYEES_COUNT,
            hiredEmployeesCount: DEFAULT_TOTAL_NEWHIRE_EMPLOYEES_COUNT,
            reactivatedEmployeesCount: 0,
        };
    };
