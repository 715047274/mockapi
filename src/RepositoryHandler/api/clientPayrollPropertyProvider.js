import {
    ALLOW_MULTI_JTRAILING_TAXATION,
    ALLOW_PAYROLL_ASSIGN_HISTORIC_PRIMARY_WA_ON_BUSINESS_DATE,
    ENABLE_PAYROLL_HYPERSCALE_SERVICE
} from "../constant/constant.js";

const ClientPayrollPropertyMockData = [
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
    {
        codeName: ALLOW_MULTI_JTRAILING_TAXATION,
        value: 'true',
        defaultValue: 'false',
    },
];


export const getClientPayrollProperties = ()=> {
    // todo never pass codeName
    return  ClientPayrollPropertyMockData

}
