import { query } from '@api/common/GraphqlUtil';
import { ModuleEnum } from '@models/enums/ModuleEnum';
import { GetUrl } from '@utils/ApiUrlUtils';
import { suffixFetch } from '@utils/AppModeUtil';
import { IFilter } from '@models/common/FilterTypes';
import {
    PayRunIdType,
    PayRunType,
    PayRunPollingResultType,
    PriorPayRunResponseType,
    PayRunBaseType,
} from '@models/pay-run';
import {
    ApiLookupResultType,
    ApiPaginResultType,
    ApiResultType,
} from '@models/common/ApiResultTypes';
import { IPayRunApi } from './IPayRunApi';
import { PageInfo } from '@models/common/PageInfoType';
import {
    convertToApiPaginResult,
    convertToApiErrorResult,
    convertToApiLookupResult,
    convertToApiResult,
} from '@utils/ApiResultUtils';
import { postModuleData } from '@api/common/FetchModuleData';

import GetPayRunsWithProcessState from './graphql/PayRunsWithProcessState.graphql';
import GetPreviousPayRunForPreview from './graphql/GetPreviousPayRunForPreview.graphql';
import GetPayRunPeriods from './graphql/GetPayRunPeriods.graphql';
import GetPPNs from './graphql/GetPPNs.graphql';
import GetLastCommittedPayRunGraphql from './graphql/GetLastCommittedPayRun.graphql';
import GetPriorPayRunsGraphql from './graphql/GetPriorPayRuns.graphql';
import GetQuarterLastCommittedPayRunGraphql from './graphql/GetQuarterLastCommittedPayRun.graphql';
import GetPayRunEmployeeProcessStateCountGraphql from './graphql/GetPayRunEmployeeProcessStateCount.graphql';

export const PayRunApi: IPayRunApi = {
    async getOverviewPayRunsAsync(
        page?: PageInfo,
        filter?: IFilter,
        searchTerm?: string,
        abortSignal?: AbortSignal
    ): Promise<ApiPaginResultType<PayRunType> | null> {
        const variables = {
            ...page,
            filter,
            searchTerm,
        };
        const response = await query(
            GetPayRunsWithProcessState,
            {
                ...variables,
                randomNumForAbort: Math.random(), //NOSONAR - it thinks the random number is for cryptography
            },
            ModuleEnum.PayRuns,
            abortSignal
        ).catch((error) => {
            return convertToApiErrorResult({ error });
        });
        return convertToApiPaginResult(response, 'payRunsWithProcessState');
    },

    async getDefaultPreviousPayRunForPreviewAsync(
        payRunId: number,
        abortSignal?: AbortSignal
    ): Promise<ApiPaginResultType<PayRunIdType> | null> {
        const variables = {
            payRunId: payRunId,
        };
        const response = await query(
            GetPreviousPayRunForPreview,
            variables,
            ModuleEnum.PayRuns,
            abortSignal
        ).catch((error) => {
            return convertToApiErrorResult({ error });
        });
        return convertToApiPaginResult(response, 'previousPayRuns');
    },

    async getPayRunPeriodLookupAsync(): Promise<ApiLookupResultType> {
        const response = await query(
            GetPayRunPeriods,
            {},
            ModuleEnum.PayRuns
        ).catch((error) => {
            return convertToApiErrorResult({ error });
        });
        return convertToApiLookupResult(
            response,
            'payRunPeriods',
            'codeName',
            'shortName'
        );
    },

    async getPPNLookupAsync(
        abortSignal?: AbortSignal
    ): Promise<ApiLookupResultType> {
        const response = await query(
            GetPPNs,
            {},
            ModuleEnum.PayRuns,
            abortSignal
        ).catch((error) => {
            return convertToApiErrorResult({ error });
        });
        return convertToApiLookupResult(
            response,
            'ppNs',
            'shortName',
            'shortName'
        );
    },

    async getLastCommittedPayDate(
        payGroupId: number,
        abortSignal: AbortSignal
    ): Promise<string> {
        const response = await query(
            GetLastCommittedPayRunGraphql,
            { payGroupId },
            ModuleEnum.PayRuns,
            abortSignal
        );
        return response?.data?.lastCommittedPayRun?.payDate ?? null;
    },

    async getQuarterLastCommittedPayRun(
        payGroupId: number,
        payDate: string,
        signal?: AbortSignal
    ): Promise<ApiResultType<PayRunBaseType>> {
        const response = await query(
            GetQuarterLastCommittedPayRunGraphql,
            { payGroupId, payDate },
            ModuleEnum.PayRuns,
            signal
        );
        return convertToApiResult(response, 'quarterLastCommittedPayRun');
    },

    async getPayRunEmployeeCountAsync(
        payRunId: number,
        abortSignal?: AbortSignal
    ): Promise<number> {
        // This is temporary code will update when backend was ready
        const response = await query(
            GetPayRunEmployeeProcessStateCountGraphql,
            { payRunIds: [payRunId], withCommittingCount: false },
            ModuleEnum.PayRuns,
            abortSignal
        );

        return (
            (response?.data?.payRunEmployeeProcessStateCount[0] ?? {})
                .totalEmployees ?? 0
        );
    },

    pollingPayRunStatusAsync(
        payRunIds: Array<number>,
        abortSignal: AbortSignal,
        isPolling = false
    ): Promise<{ data?: PayRunPollingResultType; error?: Error }> {
        const url = GetUrl(ModuleEnum.PayRuns) + suffixFetch();

        return postModuleData<PayRunPollingResultType>(
            url,
            {
                operationName: 'pollPayRuns',
                query: `query pollPayRuns($payRunIds: [Long!]!, $ctx: ServiceContextInput!) {
                    payRunProcessStates(payRunIds: $payRunIds, ctx: $ctx) {
                        payRunId
                        payRunStatus
                        payRunBlocked
                        payrollCommitted
                        payrollCommittedDate
                        calculationStatus
                        detailedCalculationStatus
                    }
                    payRunIssuesCount(payRunIds: $payRunIds, ctx: $ctx) {
                        payRunId
                        messageCode
                        total
                    }
                }`,
                variables: { payRunIds },
            },
            {},
            {},
            isPolling,
            abortSignal
        ).catch((error) => {
            return { error };
        });
    },

    async getPriorPayRunsAsync(
        variables: PayRunIdType,
        abortSignal?: AbortSignal
    ): Promise<PriorPayRunResponseType> {
        const response = await query(
            GetPriorPayRunsGraphql,
            variables,
            ModuleEnum.QuickEntry,
            abortSignal
        );
        return response?.data;
    },
};
