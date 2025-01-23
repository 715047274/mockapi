import { ModuleEnum } from '@models/enums/ModuleEnum';
import { IPrmExportApi } from './IPrmExportApi';
import { mutate, query } from '@api/common/GraphqlUtil';
import GetGlExportDefinitions from './graphql/GetGlExportDefinitions.graphql';
import requestGlCalculate from './graphql/RequestGlCalculate.graphql';
import requestPayrollDataExport from './graphql/RequestPayrollDataExport.graphql';
import { IDataItem } from '@ceridianhcm/components';

export type ConfigForGlExportType = {
    payRunIds?: number[];
    payDateRangeStart?: Date;
    payDateRangeEnd?: Date;
    payGroupIds?: number[];
    payPeriodNumber?: string;
    exportDefinitionsIncluded?: string[];
};

export const PrmExportApi: IPrmExportApi = {
    async getGlExportDefinitions(
        payGroupId: number,
        abortSignal: AbortSignal
    ): Promise<IDataItem[]> {
        const variables = {
            payGroupId,
        };
        try {
            const response = await query(
                GetGlExportDefinitions,
                variables,
                ModuleEnum.GeneralLedger,
                abortSignal
            );
            const glExportDefinitions =
                response?.data?.glExportDefinitions || [];
            return glExportDefinitions.map((definition) => ({
                id: definition.dataExportDefinitionId,
                title: definition.shortName,
            }));
        } catch {
            console.error('GL Export Definitions failed to load.');
            return [];
        }
    },

    async requestGlExport(config: ConfigForGlExportType): Promise<boolean> {
        const variables = {
            payRunIds: config.payRunIds || [],
            exportDefinitionIds: config.exportDefinitionsIncluded || [],
        };
        try {
            const response = await mutate(
                requestGlCalculate, //button says 'export' but it's for a 'calculate' endpoint
                variables,
                ModuleEnum.PayRunProcess
            );

            if (response.errors?.length) {
                return false;
            }

            return response?.data?.requestGLCalculate?.success ?? false;
        } catch {
            console.error('Error requesting GL Export');
            return false;
        }
    },
    async requestPayrollDataExport(payRunId: number): Promise<boolean> {
        const variables = {
            payRunId,
            forceGenerate: false,
            exportConfigIds: null,
        };
        try {
            const response = await mutate(
                requestPayrollDataExport,
                variables,
                ModuleEnum.PayRunProcess
            );

            if (response.errors?.length) {
                return false;
            }

            return response?.data?.requestPayrollDataExport?.success ?? false;
        } catch {
            console.error('Error requesting Payroll Data Export');
            return false;
        }
    },
};
