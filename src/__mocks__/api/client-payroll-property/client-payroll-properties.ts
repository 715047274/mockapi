import {
    ALLOW_PAYROLL_ASSIGN_HISTORIC_PRIMARY_WA_ON_BUSINESS_DATE,
    ENABLE_PAYROLL_HYPERSCALE_SERVICE,
} from '../../constants/ClientPayrollPropertyConstants';

export const ClientPayrollPropertyMockData = [
    {
        codeName: ENABLE_PAYROLL_HYPERSCALE_SERVICE,
        value: 'true',
        defaultValue: 'false',
    },
    {
        codeName: ALLOW_PAYROLL_ASSIGN_HISTORIC_PRIMARY_WA_ON_BUSINESS_DATE,
        value: 'true',
        defaultValue: 'false',
    },
];
