export const DATA_ENTRY_PROPERTIES_AUTO_POPULATION = {
    employeeId: true,
    codeId: true,
    payRunDefId: true,
};

export const DATA_ENTRY_PROPERTY_RECURSIVE_RESET_PROPERTIES = {
    employeeId: [
        'codeId',
        'payRunDefId',
        'workAssignmentId',
        'orgUnitId',
        'deptJobId',
        'legalEntityId',
        'useLaborSplit',
    ],
    codeId: ['rawCodeId', 'codeType', 'codeTypeId', 'isBalancePayOut'],
    payRunDefId: ['codeType', 'codeTypeId'],
};
