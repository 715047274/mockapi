import { EmployeeChangesSummaryType } from '@models/employee/employee-change-summary/EmployeeChangesSummaryType';
import {
    ApiPaginResultType,
    ApiResultType,
} from '@models/common/ApiResultTypes';
import { IPayRunEmployeeChangesSummaryApi } from './IPayRunEmployeeChangesSummaryApi';
import {
    convertToApiErrorResult,
    convertToApiResult,
} from '@utils/ApiResultUtils';
import { query } from '@api/common/GraphqlUtil';
import employeeChangesSummary from './graphql/GetPayRunEmployeeChangesSummary.graphql';
import allEmployeeChangesSummary from './graphql/GetPayRunEmployeeAllChangesSummary.graphql';
import { ModuleEnum } from '@models/enums/ModuleEnum';
import { EmploymentStatusTypeEnum } from '@models/enums/EmploymentStatusTypeEnum';
import { AllEmployeeChangesSummaryType } from '@models/employee/employee-change-summary/AllEmployeeChangesSummaryType';

export const PayRunEmployeeChangesSummaryApi: IPayRunEmployeeChangesSummaryApi =
    {
        async getPayRunEmployeeChangesSummaryAsync(
            payRunId: number,
            employmentStatusType: EmploymentStatusTypeEnum,
            abortSignal: AbortSignal,
            toComparePayRunId?: number
        ): Promise<ApiPaginResultType<EmployeeChangesSummaryType>> {
            const variables = {
                payRunId,
                employmentStatusType,
                toComparePayRunId,
                randomNumForAbort: Math.random(), //NOSONAR - it thinks the random number is for cryptography
            };
            const response = await query(
                employeeChangesSummary,
                variables,
                ModuleEnum.EmployeePreview,
                abortSignal
            ).catch((error) => {
                return convertToApiErrorResult({ error });
            });
            return convertToApiResult(response, 'employeeChangesSummary');
        },
        async getPayRunAllEmployeeChangesSummaryAsync(
            payRunId: number,
            abortSignal: AbortSignal,
            toComparePayRunId?: number
        ): Promise<ApiResultType<AllEmployeeChangesSummaryType>> {
            const variables = {
                payRunId,
                toComparePayRunId,
                randomNumForAbort: Math.random(), //NOSONAR - it thinks the random number is for cryptography
            };
            const response = await query(
                allEmployeeChangesSummary,
                variables,
                ModuleEnum.EmployeePreview,
                abortSignal
            ).catch((error) => {
                return convertToApiErrorResult({ error });
            });
            return convertToApiResult(response, 'allEmployeeChangesSummary');
        },
    };
