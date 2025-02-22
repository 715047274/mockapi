import {chaoticInt, chaoticObjects, chaoticSelect} from "../../utils/chaoticGenerationUtils.js";
import {mockDataOptions} from "../dataEntry/adjustment/adjustmentProviderOptions.js";
import {EntryIssueEmployeeActionTypeEnum, EntryIssueEmployeeIssueTypeEnum} from "../../constant/constant.js";


export const getPayRunIssuesSummary = ()=>{
    return [
        {
            messageCategoryShortName: null,
            messageLevelId: null,
            count: 2960,
        },
        {
            messageCategoryShortName: 'Payroll Engine',
            messageLevelId: null,
            count: 2622,
        },
        {
            messageCategoryShortName: 'My Pay',
            messageLevelId: null,
            count: 308,
        },
        {
            messageCategoryShortName: 'POS Publish',
            messageLevelId: null,
            count: 15,
        },
        {
            messageCategoryShortName: 'POS Commit',
            messageLevelId: null,
            count: 13,
        },
        {
            messageCategoryShortName: 'Adjustments',
            messageLevelId: null,
            count: 2,
        },
        {
            messageCategoryShortName: null,
            messageLevelId: 2,
            count: 12,
        },
        {
            messageCategoryShortName: 'Payroll Engine',
            messageLevelId: 2,
            count: 9,
        },
        {
            messageCategoryShortName: 'POS Commit',
            messageLevelId: 2,
            count: 3,
        },
        {
            messageCategoryShortName: null,
            messageLevelId: 3,
            count: 2906,
        },
        {
            messageCategoryShortName: 'Payroll Engine',
            messageLevelId: 3,
            count: 2590,
        },
        {
            messageCategoryShortName: 'My Pay',
            messageLevelId: 3,
            count: 305,
        },
        {
            messageCategoryShortName: 'POS Commit',
            messageLevelId: 3,
            count: 9,
        },
        {
            messageCategoryShortName: 'Adjustments',
            messageLevelId: 3,
            count: 2,
        },
        {
            messageCategoryShortName: null,
            messageLevelId: 4,
            count: 42,
        },
        {
            messageCategoryShortName: 'Payroll Engine',
            messageLevelId: 4,
            count: 23,
        },
        {
            messageCategoryShortName: 'POS Publish',
            messageLevelId: 4,
            count: 15,
        },
        {
            messageCategoryShortName: 'My Pay',
            messageLevelId: 4,
            count: 3,
        },
        {
            messageCategoryShortName: 'POS Commit',
            messageLevelId: 4,
            count: 1,
        },
    ];
}

export const getEmployeeIssues = (issueCount) =>{
    const employeeIssues = [
        {
            employeeId: 1917,
            employeeName: 'Marie Lindgren',
            amount: 2844,
            employeeIssueType: EntryIssueEmployeeIssueTypeEnum.Earnings,
            employeeIssueActionType:
            EntryIssueEmployeeActionTypeEnum.EditEmployeeProfile,
        },
        {
            employeeId: 2612,
            employeeName: 'Audrey Treutel',
            amount: 3500,
            employeeIssueType: EntryIssueEmployeeIssueTypeEnum.Earnings,
            employeeIssueActionType:
            EntryIssueEmployeeActionTypeEnum.EditEmployeeProfile,
        },
        {
            employeeId: 3158,
            employeeName: 'Gwen Denesik',
            amount: 2500,
            employeeIssueType: EntryIssueEmployeeIssueTypeEnum.Earnings,
            employeeIssueActionType:
            EntryIssueEmployeeActionTypeEnum.EditEmployeeProfile,
        },
        {
            employeeId: 4281,
            employeeName: 'Ian Schimmel',
            amount: 2000,
            employeeIssueType: EntryIssueEmployeeIssueTypeEnum.Earnings,
            employeeIssueActionType:
            EntryIssueEmployeeActionTypeEnum.EditEmployeeProfile,
        },
    ];

    if (issueCount) {
        return Array.from(
            { length: issueCount },
            (_, i) => employeeIssues[i % 4]
        );
    }

    return employeeIssues.slice(0, Math.ceil(Math.random() * 4));
}

export const getWageTaxEmployeeIssues = (
    issueCount
)  => {
    const { employeeName, employmentTypes } = mockDataOptions;
    return Array.from({ length: issueCount }, (_, idx) => ({
        employeeId: idx + 1,
        employeeName: employeeName[idx],
        amount: chaoticInt(400, idx),
        employeeIssueType: EntryIssueEmployeeIssueTypeEnum.Earnings,
        employeeIssueActionType:
        EntryIssueEmployeeActionTypeEnum.EditEmployeeProfile,
        employmentTypeCode: employmentTypes[idx % employmentTypes.length],
        legalEntityId: 1,
    }));
};

export const getEntryIssues = (
        payRunId,
    payEntryBatchDataIds
) => {
    const issueOptions = {
        messageLabel: [
            'Quick entry for {0} cannot be saved witout a pay rate entered. Please add a pay rate to save it.',
            'Invalid check template: {0}',
            'Invalid employee name: {0}, or number: {1}',
            'Employee {0} is inactive',
            'Invalid amount: {1}',
        ],
        messageTitle: ['Pay rate missing'],
        messageParams: [
            ['Ekrem Suca', '657659'],
            ['Moira ODeorain', '864654'],
            ['Leonel Messi', '456'],
            ['Christiano Ronaldo', '66874165'],
        ],
        payEntryBatchDataId: [],
        payEntryBatchDataStageId: [],
        payRunId: [payRunId],
        payRunMessageId: [chaoticInt(10000, payRunId)],
        payRunMessageLevelId: [4],
    };
    const issues = chaoticObjects(
        issueOptions,
        Math.ceil(payEntryBatchDataIds.length / 3),
        payRunId
    );
    issues.forEach((issue, idx) => {
        issue.payEntryBatchDataId = chaoticSelect(
            payEntryBatchDataIds,
            payRunId + idx
        );
        issue.payEntryBatchDataStageId = null;
    });
    return issues;
};


