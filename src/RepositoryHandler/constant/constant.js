// code Type
export const CodeTypeEnum ={
    None:0,
    Earning: 1,
    Deduction: 2,
    Tax: 3,
    WageAttachment: 4,
}
// client property

export const ENABLE_PAYROLL_HYPERSCALE_SERVICE = 'EnablePayrollHyperscaleService';
export const IPS_ENABLED = 'IPS_Enabled';
export const ENABLE_ORG_PICKER_ON_MY_PAY = 'EnableOrgPickerOnMyPay';
export const ENABLE_ALTERNATE_DIRECT_DEPOSIT = 'ENABLE_ALTERNATE_DIRECT_DEPOSIT';
export const ROUNDING_PRECISION = 'rounding_precision';
export const SHOW_MESSAGE_ON_EARNING_STATEMENT = 'SHOW_MESSAGE_ON_EARNING_STATEMENT';
export const USE_ONSITE_STATEMENT = 'UseOnsiteEarningStatementTemplateForUSEarningStatements';
export const ALLOW_MULTI_JTRAILING_TAXATION = 'AllowMultiJTrailingTaxation';
export const USE_PDF_STATEMENT_DEU_PAYGROUPS = 'USE_PDF_EARNING_STATEMENT_FOR_GERMAN_PAY_GROUPS';
export const ALLOW_PAYROLL_ASSIGN_HISTORIC_PRIMARY_WA_ON_BUSINESS_DATE = 'AllowImportAssignPWAOnBusinessDate';


//#region adjustment type
export const ADJUSTMENT_TYPE_CODE = 'ADJUSTMENT';
export const THIRD_PARTY_SICK_PAY_TYPE_CODE = 'THIRD_PARTY_SICK_PAY_ADJUSTMENT';
//#endregion adjustment type

//#region third party sick pay tax taxability
export const THIRD_PARTY_SICK_TAX_TAXABILITY = 'BSIE037';
//#endregion third party sick pay tax taxability

//#region earning type
export const EARNING_TYPE_NORMAL_CODE_NAME = 'NORMAL';
export const EARNING_TYPE_REIMBURSEMENT_CODE_NAME = 'REIMBURSEMENT';
export const EARNING_TYPE_MEMO_CALC_CODE_NAME = 'MEMOCALC';
export const EARNING_TYPE_TAXABLE_BENEFIT_CODE_NAME = 'TAXABLEBENEFIT';
//#endregion eanring type

export const ADJUSTMENT_TYPE_ID_FIELD = 'payRunAdjustmentTypeId';
export const ADJUSTMENT_TYPE_CODE_FIELD = 'adjustmentTypeCode';
export const EMPLOYMENT_TYPE_CODE_FIELD = 'employmentTypeCode';
// check template
export const CheckTemplateConstants = {
    CODE_NAME_NORMAL: 'NORMAL',
    CODE_NAME_NORMAL_ADDITIONAL: 'REGULAR_ADDITIONAL',
    CODE_NAME_MANUAL: 'MANUAL',
    CODE_NAME_ONSITE: 'ONSITE',
    CODE_NAME_ADDITIONAL: 'ADDITIONAL',
    CODE_NAME_ADJUSTMENT: 'ADJUSTMENT',
    CODE_NAME_AUTO_VOID: 'AUTO_VOID',
    CODE_NAME_THIRD_PARTY_SICK_PAY_ADJUSTMENT:
        'THIRD_PARTY_SICK_PAY_ADJUSTMENT',
    CODE_NAME_ON_DEMAND: 'ONDEMAND',
    CODE_NAME_ON_DEMAND_TRUEUP: 'ONDEMAND_TRUEUP',
    CODE_NAME_OFF_CYCLE: 'OFF_CYCLE',
    CODE_NAME_PENSIONER: 'PENSIONER',
    CODE_NAME_DECEASED: 'DECEASED',
    CODE_NAME_ADVANCE_PAY: 'ADVANCE_PAY',
    CODE_NAME_RETRO_PAY: 'RETRO_PAY',
    CODE_NAME_MANUAL_WO_ER_TAX: 'MANUAL_WO_ER_TAX',
    CODE_NAME_MANUAL_ERetention: 'MANUAL_ERetention',
    CODE_NAME_MANUAL_Covid19: 'MANUAL_Covid19',
    CODE_NAME_PRIORPERIODSNEWSTARTERS: 'PRIORPERIODSNEWSTARTERS',
    CODE_NAME_ADVANCEPAY_TAFW_1: 'ADVANCEPAY_TAFW_1',
    CODE_NAME_ADVANCEPAY_TAFW_2: 'ADVANCEPAY_TAFW_2',
    CODE_NAME_AUTO_GENERATE_NEW_HIRE_INACTIVE_TERMINATION_EMPLOYEES:
        'AUTO_GENERATE_NEW_HIRE_INACTIVE_TERMINATION_EMPLOYEES',
    CODE_NAME_AUTO_GENERATE_TERMINATION_EMPLOYEES:
        'AUTO_GENERATE_TERMINATION_EMPLOYEES',
};
export const CheckTemplateSpecialPayConstants = {
    ADVANCE_PAY_TYPE: 1,
    RETRO_PAY_TYPE: 2,
};


export const ProcessForEmploymentTypeEnum = {
    NONE: 0,
    REGULAR: 1,
    PENSIONER: 2,
    CONTRACTOR: 3,
    PENSIONERANDCONTRACTOR: 4,
}


export const PayRunReason = {
    ADJUSTMENT_CORRECTION : 'ADJUSTMENT_CORRECTION',
    BONUS : 'BONUS',
    COMMISSION : 'COMMISSION',
    ENTITLEMENT_PAYOUT : 'ENTITLEMENT_PAYOUT',
    MISSED_PAY : 'MISSED_PAY',
    REFUND : 'REFUND',
    RETRO_PAY : 'RETRO_PAY',
    ROE : 'ROE',
    STOCK_OPTIONS : 'STOCK_OPTIONS',
    TERMINATION : 'TERMINATION',
    VOID : 'VOID',
}

export const PayRunReasonScope = {
    CORRECTION_REASON : 'CORRECTION_REASON',
    OFF_CYCLE_PAY_RUN : 'OFF_CYCLE_PAY_RUN',
    REJECT_PAY_RUN : 'REJECT_PAY_RUN',
    QUICK_ENTRY : 'QUICK_ENTRY',
    ADJUSTMENT : 'ADJUSTMENT',
    ADDITIONAL_CHECK : 'ADDITIONAL_CHECK',
    AUTOVOID_CHECK : 'AUTOVOID_CHECK',
    ONSITE_CHECK : 'ONSITE_CHECK',
    MANUAL_CHECK : 'MANUAL_CHECK',
}


export const PayrollReasonConstants = {
    CODE_NAME_ADJUSTMENT_CORRECTION: 'ADJUSTMENT_CORRECTION',
    CODE_NAME_BONUS: 'BONUS',
    CODE_NAME_COMMISSION: 'COMMISSION',
    CODE_NAME_ENTITLEMENT_PAYOUT: 'ENTITLEMENT_PAYOUT',
    CODE_NAME_MISSED_PAY: 'MISSED_PAY',
    CODE_NAME_REFUND: 'REFUND',
    CODE_NAME_RETRO_PAY: 'RETRO_PAY',
    CODE_NAME_ROE: 'ROE',
    CODE_NAME_STOCK_OPTIONS: 'STOCK_OPTIONS',
    CODE_NAME_TERMINATION: 'TERMINATION',
    CODE_NAME_VOID: 'VOID',
};


export const EmploymentTypeCode = {
    CONTRACTOR: 'Contractor',
    PENSIONER: 'Pensioner',
    EMPLOYEE: 'Employee',
    NONE: '',
};

export const  EmploymentTypeEnum  ={
    NONE: 0,
    EMPLOYEE: 1,
    CONTRACTOR: 2,
    PENSIONER: 3,
}

export const employmentTypeCodeEnumMapping = {
    [EmploymentTypeCode.NONE]: EmploymentTypeEnum.NONE,
    [EmploymentTypeCode.EMPLOYEE]: EmploymentTypeEnum.EMPLOYEE,
    [EmploymentTypeCode.CONTRACTOR]: EmploymentTypeEnum.CONTRACTOR,
    [EmploymentTypeCode.PENSIONER]: EmploymentTypeEnum.PENSIONER,
};

export const MessageLevel = {
    SUCCESS : 'SUCCESS',
    INFO : 'INFO',
    DEBUG : 'DEBUG',
    ERROR : 'ERROR',
    WARN : 'WARN',
    WARNASERROR : 'WARNASERROR',
}
export const ToasterType = {
    Success : 'SUCCESS',
    Error : 'ERROR',
    Warning : 'WARNING',
    Info : 'INFO',
}

export const MessageLevelToastTypeMapping = {
    [MessageLevel.SUCCESS]: ToasterType.Success,
    [MessageLevel.INFO]: ToasterType.Info,
    [MessageLevel.DEBUG]: ToasterType.Info,
    [MessageLevel.WARN]: ToasterType.Warning,
    [MessageLevel.ERROR]: ToasterType.Error,
    [MessageLevel.WARNASERROR]: ToasterType.Error,
};


export const EntryIssueLevelEnum  ={
    All : 0, // Excludes Debug Level in the back end - Used for grouped counts
    Information : 2,
    Warning : 3,
    Error : 4, // Includes WarningAsError Level
}

export const EntryIssueActionTypeEnum  ={
    ContactAdmin : 'Contact Admin',
    EditQuickEntry : 'Edit Quick Entry',
    DeleteQuickEntry : 'Delete Quick Entry',
    EditEmployeeProfile : 'Edit Employee Profile',
    SeeAll : 'See All',
    SeeDetails : 'See Details',
    PrimaryResolution : 'Primary Resolution',
    BulkResolution : 'Bulk Resolution',
    PrimaryAction : 'Primary Action',
    SecondaryAction : 'Secondary Action',
}

export const EntryIssueEmployeeActionTypeEnum = {
    EditEmployeeProfile : 'Edit Employee Profile',
    SeeAll : 'See All',
    SeeDetails : 'See Details',
    PrimaryResolution : 'Primary Resolution',
    BulkResolution : 'Bulk Resolution',
    PrimaryAction : 'Primary Action',
    SecondaryAction : 'Secondary Action',
}

export const EntryIssueEmployeeIssueTypeEnum  ={
    Earnings : 'Earnings',
    Deductions : 'Deductions',
}

export const EntryIssueLevelString = {
    [EntryIssueLevelEnum.Information]: 'Information',
    [EntryIssueLevelEnum.Warning]: 'Warning',
    [EntryIssueLevelEnum.Error]: 'Error',
};

export const PayRunCalculationStatusEnums = {
    NotStarted : 'NotStarted',
    Blocked : 'Blocked',
    Calculated : 'Calculated',
    Committed : 'Committed',
    Committing : 'Committing',
}


export const PayRunPeriod = {
    CURRENT_PERIOD : 'CURRENT_PERIOD',
    NEXT_PERIOD : 'NEXT_PERIOD',
    LAST_PERIOD : 'LAST_PERIOD',
    LAST_MONTH : 'LAST_MONTH',
    LAST_QUARTER : 'LAST_QUARTER',
}

export const PayRunProcessStateEnum= {
    NONE : 'NONE',
    VALIDATING : 'VALIDATING',
    VALIDATED : 'VALIDATED',
    CALCULATING : 'CALCULATING',
    CALCULATED : 'CALCULATED',
    COMMITTING : 'COMMITTING',
    COMMITTED : 'COMMITTED',
}

export const PayRunStatusEnum= {
    // values are mirrored in PayRunStatuses enum in PayRunProcessState.cs in payroll-info-service repo
    LOCKED : 'Locked',
    UNLOCKED : 'Unlocked',
    COMMITTING : 'Committing',
    COMMITTED : 'Committed',
}

export const PayRunDetailedCalcStatus ={
    NOT_STARTED : 'NotStarted',
    IN_PROGRESS : 'InProgress',
    COMPLETE : 'Complete',
}

//NOTICE: any change on this enum please take care useEarningStatementFormViewModel
export const EmployeeProcessStateEnum= {
    NONE : 'NONE',
    NOTSTART : 'NOTSTART',
    BLOCKED : 'BLOCKED',
    CALCULATING : 'CALCULATING',
    CALCULATED : 'CALCULATED',
    CALCULATED_ERROR : 'CALCULATED_ERROR', //BLOCKED
    COMMITTED : 'COMMITTED',
    COMMITTED_ERROR : 'COMMITTED_ERROR', //BLOCKED
    COMMIT_STAGED_ERROR : 'COMMIT_STAGED_ERROR', //BLOCKED
    COMMIT_STAGED : 'COMMIT_STAGED', //CALCULATED
    COMMIT_STAGING : 'COMMIT_STAGING', //CALCULATED
    NOT_APPLICABLE : 'NOT_APPLICABLE', //will never returned from payRunEmployeeProcessStates, only used in preview
}

export const PayRunMessageCodeEnum = {
    Debug : 'DEBUG',
    Information : 'INFO',
    Warning : 'WARN',
    Error : 'ERROR',
    WarningAsError : 'WARNASERROR',
}

export const RelativePayPeriodsEnum ={
    CurrentPeriod : 'Current period',
    LastPeriod : 'Last period',
    NextPeriod : 'Next period',
    LastYear : 'Last Year',
    NextYear : 'Next Year',
}
export const RelativePayPeriodsLocal = {
    CurrentPeriod: 'CurrentPayPeriod',
    LastPeriod: 'PreviousPayPeriod',
    NextPeriod:  'NextPayPeriod',
    LastYear:  'YearOfPreviousPayPeriods',
    NextYear:  'YearOfNextPayPeriods',
};

export const BaseRunTypeCode = {
    SCHEDULED_RUN : 'SCHEDULED_RUN',
    OFFCYCLE : 'OFFCYCLE',
}

export const OffCyclePayRunTypeCode = {
    NORMAL : 'NORMAL',
    ROE : 'ROE', //Canada Specific
    MAINTENANCE : 'MAINTENANCE', //Canada Specific
    PRIOR_PERIOD_ADJUSTMENT : 'PRIOR_PERIOD_ADJUSTMENT',
    PAY_PERIOD_ADJUSTMENT : 'PAY_PERIOD_ADJUSTMENT', // Canada specific, ony IPS users.
    ODP_OFFCYCLE : 'ODP_OFFCYCLE', // ODP Specific
    AUTO_GENERATE_ALL_EMPLOYEES : 'AUTO_GENERATE_ALL_EMPLOYEES',
    AUS_FBT_REPORTING : 'AUS_FBT_REPORTING', //Australia Specific
    EARLY_YEAR_ADJUSTMENT : 'EARLY_YEAR_ADJUSTMENT', //USA and UK specific
    DEU_RECALCULATION_AUTO : 'DEU_RECALCULATION_AUTO', //Germany specific
    DEU_MARCH_CLAUSE_AUTO : 'DEU_MARCH_CLAUSE_AUTO', //Germany specific
    SGP_AUTO_GENERATE_NEW_HIRE_OFFCYCLE : 'SGP_AUTO_GENERATE_NEW_HIRE_OFFCYCLE', //Singapore specific
    SGP_AUTO_GENERATE_TERMINATION_OFFCYCLE : 'SGP_AUTO_GENERATE_TERMINATION_OFFCYCLE', //Singapore specific
    //IsLateDepositRun : true, ID : NormalTypeId
    LATE_DEPOSIT : 'LATE_DEPOSIT', //USA Specific
    //IsAlternateFunding : true, ID : NormalTypeId
    ALTERNATE_FUNDED : 'ALTERNATE_FUNDED', //USA Specific
    //IsAlternateFunding : true, IsLateDepositRun : true, ID : NormalTypeId
    ALTERNATE_FUNDED_LATE_DEPOSIT : 'ALTERNATE_FUNDED_LATE_DEPOSIT', //USA Specific
}
export const AdjustmentState = {
    Created : 'Created',
    Error : 'Error',
    Processing : 'Processing',
    Completed : 'Completed',
}
export const IssuesBannerType = {
    GridTypeSingleEmployeeSingleError : 'GridTypeSingleEmployeeSingleError',
    GridTypeSingleEmployeeMultipleErrors : 'GridTypeSingleEmployeeMultipleErrors',
    GridTypeMultipleEmployeesMultipleErrors : 'GridTypeMultipleEmployeesMultipleErrors',
    GridTypeMultipleEmployeesSameError : 'GridTypeMultipleEmployeesSameError',
    FlyoutTypeSingleError : 'FlyoutTypeSingleError',
    FlyoutTypeMultipleError : 'FlyoutTypeMultipleError',
}


export const FilterTypeEnum = {
    LEGAL_ENTITY : 'legalEntity',
    RUN_TYPE : 'runTypes',
    PERIOD : 'payRunPeriods',
    PPN : 'ppNs',
    PAY_RUN_STATUS : 'payRunStatuses',
    CALCULATION_STATUS : 'calculationStatuses',
    COMMIT_DATE : 'commitDates',
    CODE : 'codes',
    EMPLOYMENT_STATUS : 'employmentStatus',
    NETPAYVARIANCE : 'netPayVariance',
    EARNINGVARIANCE : 'earningVariance',
    ADDED_BY : 'addedBy',
    ADJUSTMENT_TYPE : 'adjustmentType',
    SAVED_BY : 'savedBy',
    SAVED_BY_USERID : 'savedByUserId',
    FIRST_NAME : 'firstName',
    DEDUCTIONCODES : 'deductionCodes',
    EARNINGCODES : 'earningCodes',
    TAXCODES : 'taxCodes',
    SALARY : 'salary',
    TOPFILTERS : 'topFilters',
    SIDEFILTERS : 'sideFilters',
    CURRENTEMPLOYEE : 'currentEmployee',
    FORMEREMPLOYEE : 'formerEmployee',
    NEVEREMPLOYEE : 'neverEmployee',
    DATE : 'date',
    DATEWITHOPERATOR : 'dateWithOperator',
    DROPDOWN : 'dropdown',
    DROPDOWNWITHOPERATOR : 'dropdownWithOperator',
    BUSINESSDATE : 'BusinessDate',
    RETRO : 'isRetro',
    IMPORT : 'import',
    IMPORT_IDENTIFIER : 'importIdentifier',
    IMPORT_SET : 'importSet',
    CHECK_TEMPLATE : 'checkTemplate',
    REPLACE : 'replace',
    LABOR_METRICS : 'laborMetrics',
    TIME_DATA_SOURCE : 'timeDataSources',
    PAYRUN_MSGTYPE_SOURCE : 'PayRunMessageType',
    HOURS : 'hours',
    SAVED_FILTERS : 'savedFilters',
    YEAR : 'year',
    QUARTER : 'quarter',
    COUNTRY : 'country',
    REGION : 'region',
    PAYGROUP : 'payGroups',
    EMPLOYEE : 'employee',
    MORE_OPTIONS_MENU : 'moreOptionsMenu',
    VIEW_BY : 'viewBy',
    CHECK : 'checks',
    PROJECT : 'project',
    DOCKET : 'docket',
    ORGLOCATION : 'orgLocation',
    WORKLOCATIONS : 'workLocations',
    SUMMARY : 'summary',
}