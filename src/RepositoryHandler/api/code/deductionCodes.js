import {CodeTypeEnum, ProcessForEmploymentTypeEnum} from "../../constant/constant.js";


const deductionTemplate = {
    codeTypeId: CodeTypeEnum.Deduction,
    isActive: true,
    uniqueId: null,
    codeId: null,
    defaultCheckTypeId: null,
    isHoursRateInPayEntryEnabled: null,
    isHoursRateInPayEntryErrorOverride: null,
    isGenerated: null,
    isWcbDeduction: null,
    processForEmployment: null,
    isEmployerDeduction: null,
    payoutBalanceId: null,
    allowPayee: null,
    allowImpromptuArrears: null,
    isFlsaAdjustable: null,
    debitArrearsByDefault: null,
    earningTaxability: null,
    earningTypeCodeName: null,
    isPayEntryWageAttachment: null,
    isInternal: null,
    useInPayrollEntry: null,
};

export const DeductionCodes = [
    {
        ...deductionTemplate,
        uniqueId: '2-1',
        codeId: 1,
        shortName: 'Deduction 1',
        isWcbDeduction: true,
        processForEmployment: ProcessForEmploymentTypeEnum.REGULAR,
        allowPayee: true,
        allowImpromptuArrears: true,
    },
    {
        ...deductionTemplate,
        uniqueId: '2-2',
        codeId: 2,
        shortName: 'Deduction 2',
        isWcbDeduction: true,
        processForEmployment: ProcessForEmploymentTypeEnum.REGULAR,
        allowImpromptuArrears: false,
    },
    {
        ...deductionTemplate,
        uniqueId: '2-3',
        codeId: 3,
        shortName: 'Deduction 3',
        isWcbDeduction: true,
        processForEmployment: ProcessForEmploymentTypeEnum.REGULAR,
        allowImpromptuArrears: false,
    },
    {
        ...deductionTemplate,
        uniqueId: '2-4',
        codeId: 4,
        shortName: 'Deduction 4',
        isWcbDeduction: true,
        processForEmployment: ProcessForEmploymentTypeEnum.CONTRACTOR,
        allowImpromptuArrears: false,
    },
    {
        ...deductionTemplate,
        uniqueId: '2-5',
        codeId: 5,
        shortName: 'Deduction 5',
        isWcbDeduction: true,
        processForEmployment: ProcessForEmploymentTypeEnum.REGULAR,
        allowImpromptuArrears: false,
    },
    {
        ...deductionTemplate,
        uniqueId: '2-6',
        codeId: 6,
        shortName: 'Deduction 6',
        isWcbDeduction: true,
        processForEmployment: ProcessForEmploymentTypeEnum.REGULAR,
        allowImpromptuArrears: false,
    },
    {
        ...deductionTemplate,
        uniqueId: '2-7',
        codeId: 7,
        shortName: 'Deduction 7',
        isWcbDeduction: true,
        processForEmployment: ProcessForEmploymentTypeEnum.CONTRACTOR,
        allowImpromptuArrears: false,
    },
    {
        ...deductionTemplate,
        uniqueId: '2-8',
        codeId: 8,
        shortName: 'Deduction 8',
        isWcbDeduction: true,
        processForEmployment: ProcessForEmploymentTypeEnum.CONTRACTOR,
        allowImpromptuArrears: false,
    },
    {
        ...deductionTemplate,
        uniqueId: '2-20',
        codeId: 20,
        shortName: 'Workers Comp EE (US)',
        isWcbDeduction: true,
        processForEmployment: 0,
        isEmployerDeduction: false,
        allowPayee: true,
        allowImpromptuArrears: false,
        debitArrearsByDefault: false,
        isPayEntryWageAttachment: false,
    },
    {
        ...deductionTemplate,
        uniqueId: '2-21',
        codeId: 21,
        shortName: 'Workers Comp ER',
        isWcbDeduction: true,
        processForEmployment: 0,
        isEmployerDeduction: true,
        allowPayee: true,
        allowImpromptuArrears: false,
        debitArrearsByDefault: false,
        isPayEntryWageAttachment: false,
    },
    {
        ...deductionTemplate,
        uniqueId: '2-19',
        codeId: 19,
        shortName: 'Workers Comp ER (US)',
        isWcbDeduction: true,
        processForEmployment: 0,
        isEmployerDeduction: true,
        allowPayee: true,
        allowImpromptuArrears: false,
        debitArrearsByDefault: false,
        isPayEntryWageAttachment: false,
    },
    {
        ...deductionTemplate,
        uniqueId: '2-241',
        codeId: 241,
        shortName: 'Workers Comp ER WYO',
        isWcbDeduction: false,
        processForEmployment: 0,
        isEmployerDeduction: true,
        allowPayee: true,
        allowImpromptuArrears: false,
        debitArrearsByDefault: false,
        isPayEntryWageAttachment: false,
    },
    {
        ...deductionTemplate,
        uniqueId: '1-358',
        codeId: 358,
        codeTypeId: CodeTypeEnum.Earning,
        shortName: 'ZZZ__new',
        isHoursRateInPayEntryEnabled: false,
        isHoursRateInPayEntryErrorOverride: false,
        isGenerated: true,
        processForEmployment: 0,
        isFlsaAdjustable: false,
        allowPayee: false,
        isPayEntryWageAttachment: false,
        earningTaxability: 'BSIE037',
        earningTypeCodeName: 'TAXABLEBENEFIT',
    },
];