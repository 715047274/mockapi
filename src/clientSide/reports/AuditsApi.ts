import { ModuleEnum } from '@models/enums/ModuleEnum';
import { IAuditsApi } from './IAuditsApi';
import { fetchData } from '@api/common/FetchData';
import { GetUrl } from '@utils/ApiUrlUtils';
import { PageInfo } from '@models/common/PageInfoType';
import { ApiPaginResultType } from '@models/common/ApiResultTypes';
import { AuditDetails, AuditItem } from '@models/reports';
import { query } from '@api/common/GraphqlUtil';
import {
    convertToApiErrorResult,
    convertToApiPaginResult,
} from '@utils/ApiResultUtils';
import GetAuditItemsGraphql from './graphql/GetAuditItems.graphql';

export const AuditsApi: IAuditsApi = {
    async getAuditItemsAsync(
        pageInfo?: PageInfo,
        searchTerm?: string,
        abortSignal?: AbortSignal
    ): Promise<ApiPaginResultType<AuditItem>> {
        const variables = {
            ...pageInfo,
            searchTerm,
        };
        const response = await query(
            GetAuditItemsGraphql,
            variables,
            ModuleEnum.PayRuns,
            abortSignal
        ).catch((error) => {
            return convertToApiErrorResult({ error });
        });
        return convertToApiPaginResult(response, 'auditItems');
    },

    async getAuditDetailsAsync(
        payRunId: number,
        featureId: number,
        signal: AbortSignal
    ): Promise<AuditDetails> {
        try {
            const response = await fetchData(
                GetUrl(ModuleEnum.GetAuditDetails),
                {
                    signal,
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ payRunId, featureId }),
                },
                null
            );
            if (!response?.ok) {
                throw new Error(`Failed to load Audit Details.`);
            }
            const responseData = await response.json();
            return responseData?.Result as AuditDetails;
        } catch {
            throw new Error(`Server Error: Failed to load Audit Details.`);
        }
    },
    async getAuditCountAsync(
        payRunId: number,
        countryCode: string,
        featureId: number,
        signal: AbortSignal
    ): Promise<number> {
        try {
            const response = await fetchData(
                GetUrl(ModuleEnum.GetAuditCount),
                {
                    signal,
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ payRunId, countryCode, featureId }),
                },
                null
            );
            if (!response?.ok) {
                throw new Error(
                    `Audit count could not be retrieved for featureId ${featureId}.`
                );
            }
            return response.json();
        } catch {
            throw new Error(
                `Audit count could not be retrieved for featureId ${featureId}.`
            );
        }
    },
    async runAudits(
        payRunId: number,
        featureIds: number[],
        signal?: AbortSignal
    ): Promise<void> {
        try {
            const response = await fetchData(
                GetUrl(ModuleEnum.RunAudits),
                {
                    signal,
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ payRunId, featureIds }),
                },
                null
            );
            if (!response?.ok) {
                throw new Error(`Failed to run Audits`);
            }
            return response.json();
        } catch {
            throw new Error(`Failed to run Audits`);
        }
    },
};
