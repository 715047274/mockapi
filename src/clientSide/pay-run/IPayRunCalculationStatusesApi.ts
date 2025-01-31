import { PayRunCalculationStatusesType } from '@models/pay-run';
import { ApiResultType } from '@models/common/ApiResultTypes';

export interface IPayRunCalculationStatusesApi {
    getPayRunCalculationStatusesCountAsync(
        payRunIds: number[],
        abortSignal: AbortSignal,
        isPolling: boolean
    ): Promise<ApiResultType<PayRunCalculationStatusesType[]>>;
}
