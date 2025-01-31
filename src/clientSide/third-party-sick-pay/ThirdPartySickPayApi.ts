import { query } from '@api/common/GraphqlUtil';
import { ModuleEnum } from '@models/enums/ModuleEnum';
import ActiveThirdPartySickPayProviderGraphql from '@api/third-party-sick-pay/graphql/GetActiveThirdPartySickPayProvider.graphql';
import ThirdPartySickPayTaxExemptionGraphql from '@api/third-party-sick-pay/graphql/GetThirdPartySickPayTaxExemption.graphql';
import {
    ThirdPartySickPayProviderType,
    ThirdPartySickPayTaxExemptionType,
} from '@models/third-party-sick-pay/ThirdPartySickPayType';
import { IThirdPartySickPayApi } from './IThirdPartySickPayApi';
import { convertToApiResult } from '@utils/ApiResultUtils';
import { ApiResultType } from '@models/common/ApiResultTypes';

export const ThirdPartySickPayApi: IThirdPartySickPayApi = {
    async getActiveThirdPartySickPayProvidersAsync(
        payRunId: number,
        abortSignal: AbortSignal,
        waitIfStillPending = false
    ): Promise<ApiResultType<Array<ThirdPartySickPayProviderType>> | null> {
        const response = await query(
            ActiveThirdPartySickPayProviderGraphql,
            { payRunId },
            ModuleEnum.ThirdPartySickPay,
            abortSignal,
            waitIfStillPending
        );
        return convertToApiResult(response, 'activeThirdPartySickPayProviders');
    },

    async getThirdPartySickPayTaxExemptionsAsync(
        payRunId: number,
        abortSignal: AbortSignal,
        waitIfStillPending: boolean
    ): Promise<ApiResultType<Array<ThirdPartySickPayTaxExemptionType>> | null> {
        const response = await query(
            ThirdPartySickPayTaxExemptionGraphql,
            { payRunId },
            ModuleEnum.ThirdPartySickPay,
            abortSignal,
            waitIfStillPending
        );
        return convertToApiResult(response, 'thirdPartySickPayTaxExemptions');
    },
};
