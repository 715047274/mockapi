import { ApiPaginResultType } from '@models/common/ApiResultTypes';
import { PageInfo } from '@models/common/PageInfoType';
import { AuditDetails, AuditItem } from '@models/reports';

export interface IAuditsApi {
    getAuditItemsAsync(
        pageInfo: PageInfo,
        searchTerm: string,
        signal: AbortSignal
    ): Promise<ApiPaginResultType<AuditItem>>;
    getAuditDetailsAsync(
        payRunId: number,
        featureId: number,
        signal: AbortSignal
    ): Promise<AuditDetails>;
    getAuditCountAsync(
        payRunId: number,
        countryCode: string,
        featureId: number,
        signal: AbortSignal
    ): Promise<number>;
    runAudits(
        payRunId: number,
        featureIds: number[],
        signal?: AbortSignal
    ): Promise<void>;
}
