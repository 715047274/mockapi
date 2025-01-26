import { EmployeeResidentStateResponseType } from '@models/employee/EmployeeResidentStateType';

export function employeePriorStateBundle(
    _payRunId: number,
    employeeId: number
): EmployeeResidentStateResponseType | null {
    if ([1, 2, 4].includes(employeeId)) {
        return { employeePriorStateBundle: null };
    }
    return {
        employeePriorStateBundle: [
            { legalEntityId: 1, employeeStateCode: 'CA' },
            { legalEntityId: 2, employeeStateCode: 'SN' },
            { legalEntityId: 12, employeeStateCode: 'MX-MEX' },
            { legalEntityId: 3, employeeStateCode: 'NJ' },
        ],
    };
}
