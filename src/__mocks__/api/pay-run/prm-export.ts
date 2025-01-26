import { IDataItem } from '@ceridianhcm/components';
import { IPrmExportApi } from '@api/pay-run';
import { ConfigForGlExportType } from '@api/pay-run/PrmExportApi';

export function getGlExportDefinitionsMocked(payGroupId: number): IDataItem[] {
    const glExportDefinitions = [];
    for (let i = 1; i < 10; i++) {
        glExportDefinitions.push({
            shortName: `Export Definition ${payGroupId}-${i}`,
            dataExportDefinitionId: i.toString(),
        });
    }
    return glExportDefinitions;
}

let requestGlCalculateAlternator = true;
export function requestGlCalculateMocked(
    _configForExport: ConfigForGlExportType
): {
    requestGLCalculate: { success: boolean };
} {
    if (requestGlCalculateAlternator) {
        requestGlCalculateAlternator = false;
        return { requestGLCalculate: { success: true } };
    } else {
        requestGlCalculateAlternator = true;
        return { requestGLCalculate: { success: false } };
    }
}
let payrollDataExportAlternator = true;
export function requestPayrollDataExportMocked(_payRunId: number): {
    requestPayrollDataExport: { success: boolean };
} {
    if (payrollDataExportAlternator) {
        payrollDataExportAlternator = false;
        return { requestPayrollDataExport: { success: true } };
    } else {
        payrollDataExportAlternator = true;
        return { requestPayrollDataExport: { success: false } };
    }
}

export function getMockPrmExportApi(): IPrmExportApi {
    const mockedPrmExportApi: jest.Mocked<IPrmExportApi> = {
        getGlExportDefinitions: jest.fn(),
        requestGlExport: jest.fn(),
        requestPayrollDataExport: jest.fn(),
    };

    mockedPrmExportApi.getGlExportDefinitions.mockImplementation(
        (payGroupId) => {
            return Promise.resolve(getGlExportDefinitionsMocked(payGroupId));
        }
    );
    mockedPrmExportApi.requestGlExport.mockImplementation((configForExport) => {
        return Promise.resolve(
            requestGlCalculateMocked(configForExport)?.requestGLCalculate
                ?.success
        );
    });
    mockedPrmExportApi.requestPayrollDataExport.mockImplementation(
        (payRunId) => {
            return Promise.resolve(
                requestPayrollDataExportMocked(payRunId)
                    ?.requestPayrollDataExport?.success
            );
        }
    );

    return mockedPrmExportApi;
}
