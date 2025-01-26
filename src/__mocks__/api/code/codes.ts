import { CodeInfoType, CodeType } from '@models/code/CodeTypes';
import { CodeTypeEnum } from '@models/enums/CodeTypeEnum';

export const earningCodes: CodeInfoType[] = [
    {
        codeId: 1,
        shortName: 'Earning Code #1',
        codeTypeId: CodeTypeEnum.Earning,
    },
    {
        codeId: 2,
        shortName: 'Earning Code #2',
        codeTypeId: CodeTypeEnum.Earning,
    },
    {
        codeId: 3,
        shortName: 'Earning Code #3',
        codeTypeId: CodeTypeEnum.Earning,
    },
    {
        codeId: 4,
        shortName: 'Earning Code #4',
        codeTypeId: CodeTypeEnum.Earning,
    },
    {
        codeId: 5,
        shortName: 'Earning Code #5',
        codeTypeId: CodeTypeEnum.Earning,
    },
    {
        codeId: 6,
        shortName: 'Earning Code #6',
        codeTypeId: CodeTypeEnum.Earning,
    },
    {
        codeId: 7,
        shortName: 'Earning Code #7',
        codeTypeId: CodeTypeEnum.Earning,
    },
    {
        codeId: 8,
        shortName: 'Earning Code #8',
        codeTypeId: CodeTypeEnum.Earning,
    },
    {
        codeId: 9,
        shortName: 'Earning Code #9',
        codeTypeId: CodeTypeEnum.Earning,
    },
];

export const deductionCodes = [
    {
        codeId: 1,
        shortName: 'Deduction Code #1',
        codeTypeId: CodeTypeEnum.Deduction,
    },
    {
        codeId: 2,
        shortName: 'Deduction Code #2',
        codeTypeId: CodeTypeEnum.Deduction,
    },
    {
        codeId: 3,
        shortName: 'Deduction Code #3',
        codeTypeId: CodeTypeEnum.Deduction,
    },
    {
        codeId: 4,
        shortName: 'Deduction Code #4',
        codeTypeId: CodeTypeEnum.Deduction,
    },
    {
        codeId: 5,
        shortName: 'Deduction Code #5',
        codeTypeId: CodeTypeEnum.Deduction,
    },
    {
        codeId: 6,
        shortName: 'Deduction Code #6',
        codeTypeId: CodeTypeEnum.Deduction,
    },
    {
        codeId: 7,
        shortName: 'Deduction Code #7',
        codeTypeId: CodeTypeEnum.Deduction,
    },
    {
        codeId: 8,
        shortName: 'Deduction Code #8',
        codeTypeId: CodeTypeEnum.Deduction,
    },
    {
        codeId: 9,
        shortName: 'Deduction Code #9',
        codeTypeId: CodeTypeEnum.Deduction,
    },
];

export const taxCodes: CodeType[] = [
    {
        codeId: 1,
        uniqueId: '3-1',
        shortName: 'USA-00250000-092',
        codeTypeId: CodeTypeEnum.Tax,
        taxCategoryId: 'USA-092',
        taxAuthorityInstanceId: 'USA-00250000-092',
    },
    {
        codeId: 2,
        uniqueId: '3-2',
        shortName: 'USA-00340000-010',
        codeTypeId: CodeTypeEnum.Tax,
        taxCategoryId: 'USA-010',
        taxAuthorityInstanceId: 'USA-00340000-010',
    },
    {
        codeId: 3,
        uniqueId: '3-3',
        shortName: 'CAN-10140000-05',
        codeTypeId: CodeTypeEnum.Tax,
        taxCategoryId: 'CAN-05',
        taxAuthorityInstanceId: 'CAN-10140000-05',
    },
    {
        codeId: 4,
        uniqueId: '3-4',
        shortName: 'CAN-10140000-06',
        codeTypeId: CodeTypeEnum.Tax,
        taxCategoryId: 'CAN-06',
        taxAuthorityInstanceId: 'CAN-10140000-06',
    },
    {
        codeId: 5,
        uniqueId: '3-5',
        shortName: 'CAN-10000000-01',
        codeTypeId: CodeTypeEnum.Tax,
        taxCategoryId: 'CAN-01',
        taxAuthorityInstanceId: 'CAN-10000000-01',
    },
    {
        codeId: 6,
        uniqueId: '3-6',
        shortName: 'CAN-10000000-03',
        codeTypeId: CodeTypeEnum.Tax,
        taxCategoryId: 'CAN-03',
        taxAuthorityInstanceId: 'CAN-10000000-03',
    },
    {
        codeId: 7,
        uniqueId: '3-7',
        shortName: 'CAN-10000000-01',
        codeTypeId: CodeTypeEnum.Tax,
        taxCategoryId: 'CAN-01',
        taxAuthorityInstanceId: 'CAN-10000000-01',
    },
    {
        codeId: 8,
        uniqueId: '3-8',
        shortName: 'USA-00120000-010',
        codeTypeId: CodeTypeEnum.Tax,
        taxCategoryId: 'USA-010',
        taxAuthorityInstanceId: 'USA-00120000-010',
    },
    {
        codeId: 9,
        uniqueId: '3-9',
        shortName: 'USA-00250000-018',
        codeTypeId: CodeTypeEnum.Tax,
        taxCategoryId: 'USA-018',
        taxAuthorityInstanceId: 'USA-00250000-018',
    },
];
