import { EmploymentTypeEnum } from '@models/enums/EmploymentTypeEnum';

export const EmploymentTypeCode = {
    CONTRACTOR: 'Contractor',
    PENSIONER: 'Pensioner',
    EMPLOYEE: 'Employee',
    NONE: '',
};

export const employmentTypeCodeEnumMapping = {
    [EmploymentTypeCode.NONE]: EmploymentTypeEnum.NONE,
    [EmploymentTypeCode.EMPLOYEE]: EmploymentTypeEnum.EMPLOYEE,
    [EmploymentTypeCode.CONTRACTOR]: EmploymentTypeEnum.CONTRACTOR,
    [EmploymentTypeCode.PENSIONER]: EmploymentTypeEnum.PENSIONER,
};
