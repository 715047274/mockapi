import { EmployeePsdCodeResponseType } from '@models/employee/EmployeePsdCodeType';

export function getEmployeePsdCodes(): EmployeePsdCodeResponseType {
    return {
        employeePsdCodes: [
            { psdCode: '330203' },
            { psdCode: '510101' },
            { psdCode: '230401' },
        ],
    };
}
