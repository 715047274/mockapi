import { query } from '@api/common/GraphqlUtil';
import { ILegalEntityApi } from './ILegalEntityApi';
import { ApiLookupResultType } from '@models/common/ApiResultTypes';
import { ModuleEnum } from '@models/enums/ModuleEnum';
import {
    convertToApiLookupResult,
    convertToApiErrorResult,
} from '@utils/ApiResultUtils';

import GetLegalEntityLookupGraphql from './graphql/GetLegalEntityLookup.graphql';

import GetLegalEntitiesByIds from './graphql/GetLegalEntitiesByIds.graphql';

export const LegalEntityApi: ILegalEntityApi = {
    async getLegalEntityLookupAsync(
        payRunId: number,
        abortSignal?: AbortSignal
    ): Promise<ApiLookupResultType | null> {
        const response = await query(
            GetLegalEntityLookupGraphql,
            {
                payRunId,
            },
            ModuleEnum.LegalEntities,
            abortSignal
        ).catch((error) => {
            return convertToApiErrorResult({ error });
        });
        return convertToApiLookupResult(
            response,
            'legalEntitiesByPayRun',
            'legalEntityId',
            'shortName'
        );
    },
    async getLegalEntitiesByIdsAsync(
        legalEntityIds: number[],
        abortSignal?: AbortSignal
    ): Promise<ApiLookupResultType | null> {
        const response = await query(
            GetLegalEntitiesByIds,
            {
                legalEntityIds,
                randomNumForAbort: Math.random(), //NOSONAR - it thinks the random number is for cryptography
            },
            ModuleEnum.InfoLegalEntities,
            abortSignal
        ).catch((error) => {
            return convertToApiErrorResult({ error });
        });
        return convertToApiLookupResult(
            response,
            'legalEntitiesByIds',
            'legalEntityId',
            'shortName'
        );
    },
};
