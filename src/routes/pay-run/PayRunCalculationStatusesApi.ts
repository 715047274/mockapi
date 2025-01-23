import { PayRunCalculationStatusesType } from '@models/pay-run';
import { ApiPaginResultType } from '@models/common/ApiResultTypes';
import { IPayRunCalculationStatusesApi } from '.';
import {
    convertToApiErrorResult,
    convertToApiResult,
} from '@utils/ApiResultUtils';
import { query } from '@api/common/GraphqlUtil';
import GetPayRunEmployeeProcessStateCount from './graphql/GetPayRunEmployeeProcessStateCount.graphql';
import { ModuleEnum } from '@models/enums/ModuleEnum';

export const PayRunCalculationStatusesApi: IPayRunCalculationStatusesApi = {
    async getPayRunCalculationStatusesCountAsync(
        payRunIds: number[],
        abortSignal: AbortSignal,
        isPolling = false
    ): Promise<ApiPaginResultType<PayRunCalculationStatusesType[]>> {
        const withCommittingCount = true; //flag needed for backend to use newer code
        const variables = {
            payRunIds,
            withCommittingCount,
            randomNumForAbort: Math.random(), //NOSONAR - it thinks the random number is for cryptography
        };
        const response = await query(
            GetPayRunEmployeeProcessStateCount,
            variables,
            ModuleEnum.PayRuns,
            abortSignal,
            isPolling
        ).catch((error) => {
            return convertToApiErrorResult({ error });
        });
        return convertToApiResult(response, 'payRunEmployeeProcessStateCount');
    },
};
