export enum FeaturesEnum { //values are the TargetObjectTypes in the Feature table in the database
    PayrollUIService = 'PayrollUIService',
    //Overview
    Overview = 'PayrollIntelligenceOverview',
    PayRun = 'PayrollIntelligencePayRun',
    OverviewRecalculate = 'PayrollIntelligenceOverviewRecalculate',
    //Pay Run Management
    PayRunDashboard = 'PayrollIntelligencePayRunDashboard',
    PayRunPreview = 'PayrollIntelligencePayRunPreview',
    PayRunDataEntry = 'PayrollIntelligencePayRunDataEntry',
    PayRunIssues = 'PayrollIntelligencePayRunIssues',
    PayRunReports = 'PayrollIntelligencePayRunReports',
    EmployeePanel = 'PayrollIntelligenceEmployeePanel',
    ConfigureOffCyclePayRun = 'PayrollIntelligenceConfigureOffCyclePayRuns',

    //Preview
    PreviewSummary = 'PayrollIntelligencePreviewSummary',
    PreviewSummaryCodes = 'PayrollIntelligencePreviewSummaryCodes',
    PreviewSummaryCodesEmployees = 'PayrollIntelligencePreviewSummaryCodesEmployees',
    PreviewEmployees = 'PayrollIntelligencePreviewEmployees',
    PreviewPayments = 'PayrollIntelligencePreviewPayments',
    PreviewPaymentsLegalEntities = 'PayrollIntelligencePreviewPaymentsLegalEntities',
    PreviewPaymentsLegalEntitiesEmployees = 'PayrollIntelligencePreviewPaymentsLegalEntitiesEmployees',
    //Data Entry
    QuickEntries = 'PayrollIntelligenceQuickEntries',
    TimeData = 'PayrollIntelligenceTimeData',
    Checks = 'PayrollIntelligenceChecks',
    Adjustments = 'PayrollIntelligenceAdjustments',
    //Reports
    PayRunReportsAudits = 'PayrollIntelligencePayRunReportsAudits',
    PayRunReportsAllReports = 'PayrollIntelligencePayRunReportsAllReports',
    PayRunReportsDeliveryPackages = 'PayrollIntelligencePayRunReportsDeliveryPackages',
    PayRunReportsExports = 'PayrollIntelligencePayRunReportsExports',
    //Employee Panel
    EmployeePanelOverview = 'PayrollIntelligenceEmployeePanelOverview',
    EmployeePanelEarningStatement = 'PayrollIntelligenceEmployeePanelEarningStatement',
    EmployeePanelTimesheet = 'PayrollIntelligenceEmployeePanelTimesheet',
    EmployeePanelPreview = 'PayrollIntelligenceEmployeePanelPreview',
    EmployeePanelTimeData = 'PayrollIntelligenceEmployeePanelTimeData',
    EmployeePanelGeneralLedger = 'PayrollIntelligenceEmployeePanelGeneralLedger',
    EmployeePanelWageTax = 'PayrollIntelligenceEmployeePanelWageTax',

    //Quick Entry
    ManageQuickEntries = 'PayrollIntelligenceManageQuickEntries',
    ImportQuickEntries = 'PayrollIntelligenceImportQuickEntries',
    //Checks
    ManageChecks = 'PayrollIntelligenceManageChecks',
    ImportChecks = 'PayrollIntelligenceImportChecks',
    //Adjustments
    ManageAdjustments = 'PayrollIntelligenceManageAdjustments',
    ImportAdjustments = 'PayrollIntelligenceImportAdjustments',

    WageAndTax = 'PayrollIntelligenceManageWageAndTax',

    //Non-Payroll Intelligence
    DayforceAppContainer = 'DayforceApplicationContainer',
    EmployeeProfileParent = 'EmployeeProfile',
    EmployeeProfile = 'EmployeeProfile.ProfileMenu',
    PayrollAdmin = 'PayrollAdmin',
    PensionerContractorConfig = 'AllowPensionerContractorConfig',
    PayrollManagementReportsHTML = 'PayrollManagementReportsHTML',
    EmployeeProfilePersonal = 'EmployeeProfile.Personal',
    EmployeeConfidentialInformation = 'EmployeeProfile.PersonalContact.ConfidentialInformation',
}
