import { IDataItem } from '@ceridianhcm/components';
import { ConfigForGlExportType } from './PrmExportApi';

export interface IPrmExportApi {
    getGlExportDefinitions(
        payGroupId: number,
        abortSignal: AbortSignal
    ): Promise<IDataItem[]>;
    requestGlExport(configForExport: ConfigForGlExportType): Promise<boolean>;
    requestPayrollDataExport(payRunId: number): Promise<boolean>;
}
