import { ApiLookupResultType } from '@models/common/ApiResultTypes';

export interface ILegalEntityApi {
    getLegalEntityLookupAsync: (
        payRunId: number,
        abortSignal?: AbortSignal
    ) => Promise<ApiLookupResultType | null>;

    getLegalEntitiesByIdsAsync: (
        legalEntityIds: number[],
        abortSignal?: AbortSignal
    ) => Promise<ApiLookupResultType | null>;
}
