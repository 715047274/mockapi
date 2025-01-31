import { ApiResultType } from '@models/common/ApiResultTypes';
import {
    ThirdPartySickPayProviderType,
    ThirdPartySickPayTaxExemptionType,
} from '@models/third-party-sick-pay/ThirdPartySickPayType';

export interface IThirdPartySickPayApi {
    getActiveThirdPartySickPayProvidersAsync(
        payRunId: number,
        abortSignal: AbortSignal,
        waitIfStillPending: boolean
    ): Promise<ApiResultType<Array<ThirdPartySickPayProviderType>> | null>;

    getThirdPartySickPayTaxExemptionsAsync(
        payRunId: number,
        abortSignal: AbortSignal,
        waitIfStillPending: boolean
    ): Promise<ApiResultType<Array<ThirdPartySickPayTaxExemptionType>> | null>;
}
