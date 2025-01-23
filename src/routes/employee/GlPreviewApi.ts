import { query } from '../common/GraphqlUtil';
import { ModuleEnum } from '@models/enums/ModuleEnum';
import { IGlPreviewApi } from './IGlPreviewApi';
import { EmployeeGlPreviewType } from '@models/preview/GlPreviewType';
import GetEmployeeGlPreviewData from '@api/employee/graphql/GetEmployeeGlPreviewData.graphql';

export const GlPreviewApi: IGlPreviewApi = {
    async getEmployeeGLPreviewAsync(
        payRunId: number,
        employeeId: number,
        signal?: AbortSignal
    ): Promise<{ data: EmployeeGlPreviewType; error?: string }> {
        const variables = {
            payRunId: payRunId,
            employeeId,
            randomNumForAbort: Math.random(), //NOSONAR - it thinks the random number is for cryptography
        };
        const response = await query(
            GetEmployeeGlPreviewData,
            variables,
            ModuleEnum.EmployeePreview,
            signal
        ).catch((error) => {
            return {
                error,
                data: [],
            };
        });

        return {
            data: response.data?.employeeGLPreview ?? [],
        };
    },
};
