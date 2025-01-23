import { mutate, query } from '@api/common/GraphqlUtil';
import { ModuleEnum } from '@models/enums/ModuleEnum';
import {
    CommitPayRunResponseType,
    MultiPayRunProcessResultType,
    PayRunProcessResultType,
    PayRunProgressType,
} from '@models/pay-run';
import { ApiResultType } from '@models/common/ApiResultTypes';
import {
    convertToApiErrorResult,
    convertToApiResult,
} from '@utils/ApiResultUtils';
import { IPayRunProcessApi } from './IPayRunProcessApi';
import GetPayRunProgressGraphql from './graphql/GetPayRunProgress.graphql';
import CommitPayRunGraphql from './graphql/CommitPayRun.graphql';
import ValidatePayRunGraphql from './graphql/ValidatePayRun.graphql';
import CalculatePayRunGraphql from './graphql/CalculatePayRun.graphql';
import CalculatePayRunsGraphql from './graphql/CalculatePayRuns.graphql';
import InAuditPayRun from './graphql/InAuditPayRun.graphql';
import { GetUrl } from '../../utils/ApiUrlUtils';
import { fetchData } from '../common/FetchData';

export const PayRunProcessApi: IPayRunProcessApi = {
    async getPayRunProgressAsync(
        payRunId: number,
        abortSignal: AbortSignal,
        isPolling = false
    ): Promise<ApiResultType<PayRunProgressType> | null> {
        let response;
        try {
            const variables = {
                payRunId,
            };
            response = await query(
                GetPayRunProgressGraphql,
                variables,
                ModuleEnum.PayRunProcess,
                abortSignal,
                isPolling
            );
            return convertToApiResult(response, 'payRunProgress');
        } catch (e) {
            return convertToApiErrorResult(response);
        }
    },

    async validatePayRunAsync(
        payRunId: number,
        abortSignal: AbortSignal
    ): Promise<ApiResultType<PayRunProcessResultType>> {
        const variables = { payRunId };
        const response = await mutate(
            ValidatePayRunGraphql,
            variables,
            ModuleEnum.PayRunProcess,
            abortSignal
        ).catch((error) => {
            return convertToApiErrorResult({ error });
        });

        return convertToApiResult(response, 'validatePayRun');
    },

    async calculatePayRunAsync(
        payRunId: number,
        isForceRecalc: boolean,
        abortSignal: AbortSignal
    ): Promise<ApiResultType<PayRunProcessResultType>> {
        const variables = { payRunId, isForceRecalc };
        const response = await mutate(
            CalculatePayRunGraphql,
            variables,
            ModuleEnum.PayRunProcess,
            abortSignal
        ).catch((error) => {
            return convertToApiErrorResult({ error });
        });

        return convertToApiResult(response, 'calculatePayRun');
    },

    async calculatePayRunsAsync(
        payRunIds: number[],
        abortSignal: AbortSignal
    ): Promise<ApiResultType<MultiPayRunProcessResultType[]>> {
        const variables = { payRunIds };
        const response = await mutate(
            CalculatePayRunsGraphql,
            variables,
            ModuleEnum.PayRunProcess,
            abortSignal
        ).catch((error) => {
            return convertToApiErrorResult({ error });
        });

        return convertToApiResult(response, 'calculatePayRuns');
    },

    async commitPayRunAsync(
        payRunId: number,
        abortSignal?: AbortSignal
    ): Promise<ApiResultType<CommitPayRunResponseType>> {
        const variables = {
            payRunId: payRunId,
        };
        const response = await mutate(
            CommitPayRunGraphql,
            variables,
            ModuleEnum.PayRunProcess,
            abortSignal
        ).catch((error) => {
            return convertToApiErrorResult({ error });
        });

        return convertToApiResult(response, 'commitPayRun');
    },

    async queueCommitPayRunAsync(
        payRunId: number
    ): Promise<{ success: boolean; warnings: string[]; errorMessage: string }> {
        const params = {
            runIds: [payRunId],
            clientNow: new Date(Date.now()),
        };
        const response = await fetchData(GetUrl(ModuleEnum.CommitPayRun), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(params),
        });
        const result = await response.json();
        return {
            success: result.Success,
            warnings: result.Warnings,
            errorMessage: result.ErrorMessage,
        };
    },

    async doInAuditPayRunAsync(
        payRunId: number,
        userId: number,
        isLock,
        abortSignal?: AbortSignal
    ): Promise<{ inAuditPayRun: PayRunProcessResultType } | null> {
        const variables = {
            payRunId,
            userId,
            isLock,
        };
        const response = await mutate(
            InAuditPayRun,
            variables,
            ModuleEnum.PayRunProcess,
            abortSignal
        );

        return response?.data;
    },
};
