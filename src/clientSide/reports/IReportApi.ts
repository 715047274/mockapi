import { ApiPaginResultType } from '@models/common/ApiResultTypes';
import { PageInfo } from '@models/common/PageInfoType';
import { ReportJob } from '@models/reports';

export interface IReportApi {
    getPayRunReportJobs(
        payRunId: number,
        pageInfo: PageInfo,
        searchTerm: string,
        signal: AbortSignal
    ): Promise<ApiPaginResultType<ReportJob>>;

    downloadReport(DocumentGuid: string, fileName: string): Promise<void>;
}
