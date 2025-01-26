import { ClientPayrollPropertyType } from '@models/common/ClientPayrollPropertyType';
import { ClientPayrollPropertyMockData as initData } from './client-payroll-properties';

const stimulateData: Array<ClientPayrollPropertyType> = initData;

export function getClientPayrollProperties(codeName: string | null | undefined): {
    clientPayrollProperties: Array<ClientPayrollPropertyType>;
} {
    return {
        clientPayrollProperties: codeName ? stimulateData.filter((x) => x.codeName === codeName) : stimulateData,
    };
}
