import { IExportQuickEntriesApi } from '@api/data-entry/quick-entry/IExportQuickEntriesApi';
import { IQuickEntryApi } from '@api/data-entry/quick-entry/IQuickEntryApi';
import { IEmployeePreviewApi } from '@api/employee/IEmployeePreviewApi';
import { IEmployeeDetailApi } from '@api/employee/IEmployeeDetailApi';
import {
    IPayRunProcessApi,
    IPayRunPreviewApi,
    IPayRunIssuesApi,
} from '@api/pay-run';
import { IFeatureControlApi } from '@api/feature-control/IFeatureControlApi';
import { mockHyperscaleFeatures } from '@mocks/api/feature-control/feature-control-provider';
import { IAuditsApi, IReportApi } from '@api/reports';

export const mockedQuickEntryApi: jest.Mocked<IQuickEntryApi> = {
    getQuickEntriesAsync: jest.fn(),
    getQuickEntryCountAsync: jest.fn(),
    getLatestQuickEntriesAsync: jest.fn(),
    createQuickEntryAsync: jest.fn(),
    deleteQuickEntriesAsync: jest.fn(),
    searchProjectsAsync: jest.fn(),
    searchDocketsAsync: jest.fn(),
    getQuickEntryBundle: jest.fn(),
    getSavedByFilterOptions: jest.fn(),
    getEmploymentStatusFilterOptions: jest.fn(),
    getImportSetFilterOptions: jest.fn(),
};

export const mockedExportQuickEntriesApi: jest.Mocked<IExportQuickEntriesApi> =
    {
        getExportEntriesBlobAsync: jest.fn(),
    };

export const mockedEmployeePreviewApi: jest.Mocked<IEmployeePreviewApi> = {
    GetFilteredPreviewEmployeesAsync: jest.fn(),
    getPayRunEmployeesAsync: jest.fn(),
    getEmployeePreviewSummaryAsync: jest.fn(),
    getEmployeePreviewsAsync: jest.fn(),
    GetPreviewEmployeeCodeLevelDetailsAsync: jest.fn(),
    getPreviewFilterLookUpValuesByPayRunAsync: jest.fn(),
    getPreviewEmployeeLegalEntitiesAsync: jest.fn(),
    GetPaymentEmployeeDetailsAsync: jest.fn(),
    getOverThresholdEmployeesAsync: jest.fn(),
};

export const mockedEmployeeDetailApi: jest.Mocked<IEmployeeDetailApi> = {
    getPayRunEmployeeProcessStatesAsync: jest.fn(),
    searchEmployeesAsync: jest.fn(),
    searchEmployeesForAdjustmentAsync: jest.fn(),
    getEmployeePayrollTaxSubBundleAsync: jest.fn(),
    getEmployeeTaxCodesAsync: jest.fn(),
    getEmployeeWageAttachmentCodesAsync: jest.fn(),
    getEmployeeWorkAssignmentsAsync: jest.fn(),
    getEmployeeWorkAssignmentsByDateAsync: jest.fn(),
    getPersonAddressAsync: jest.fn(),
    getEmployeePsdCodesAsync: jest.fn(),
    getEmployeePriorStateBundleAsync: jest.fn(),
    getEmployeeEstateInfo: jest.fn(),
};

export const mockedPayRunProcessApi: jest.Mocked<IPayRunProcessApi> = {
    getPayRunProgressAsync: jest.fn(),
    revalidatePayRunAsync: jest.fn(),
    calculatePayRunAsync: jest.fn(),
    calculatePayRunsAsync: jest.fn(),
    commitPayRunAsync: jest.fn(),
    queueCommitPayRunAsync: jest.fn(),
    doInAuditPayRunAsync: jest.fn(),
};

export const mockedPayRunPreviewApi: jest.Mocked<IPayRunPreviewApi> = {
    getPayRunPreviewAsync: jest.fn(),
    getPayRunCodeLevelPreviewAsync: jest.fn(),
    getPreviewProcessStatusAsync: jest.fn(),
    getPreviewPaymentAsync: jest.fn(),
    getPreviewPaymentItemsAsync: jest.fn(),
    getPaymentTotalItemsLegalCount: jest.fn(),
};

export const mockedPayRunIssuesApi: jest.Mocked<IPayRunIssuesApi> = {
    getPayRunIssuesCountAsync: jest.fn(),
    getPayRunIssuesAsync: jest.fn(),
    getPayRunIssuesSummaryAsync: jest.fn(),
    getEntryIssuesAsync: jest.fn(),
    getDataEntryIssuesBannerGridDataAsync: jest.fn(),
};

export const mockedReportApi: jest.Mocked<IReportApi> = {
    getPayRunReports: jest.fn(),
    downloadReport: jest.fn().mockResolvedValue(null),
    downloadArchiveReport: jest.fn().mockResolvedValue(null),
};

export const mockedAuditsApi: jest.Mocked<IAuditsApi> = {
    getAuditCountAsync: jest.fn(),
    getAuditItemsAsync: jest.fn(),
    getAuditDetailsAsync: jest.fn(),
    runAudits: jest.fn().mockResolvedValue(null),
};

export const mockedFeatureControlApi: jest.Mocked<IFeatureControlApi> = {
    getFeatures: jest
        .fn()
        .mockImplementation(() => Promise.resolve(mockHyperscaleFeatures)),
};
