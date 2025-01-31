import { ModuleEnum } from '@models/enums/ModuleEnum';
import { PageInfo } from '@models/common/PageInfoType';
import { ApiPaginResultType } from '@models/common/ApiResultTypes';
import { ReportJob } from '@models/reports';
import { query } from '@api/common/GraphqlUtil';
import {
    convertToApiErrorResult,
    convertToApiPaginResult,
} from '@utils/ApiResultUtils';
import GetPayRunReportJobsGraphql from './graphql/GetPayRunReportJobs.graphql';
import { IReportApi } from './IReportApi';
import { GetUrl } from '@utils/ApiUrlUtils';
import { downloadBlob } from '@utils/DownloadFileUtils';
import { getModuleStreamData } from '@api/common/FetchModuleData';

export const ReportApi: IReportApi = {
    async getPayRunReportJobs(
        payRunId: number,
        pageInfo?: PageInfo,
        searchTerm?: string,
        abortSignal?: AbortSignal
    ): Promise<ApiPaginResultType<ReportJob>> {
        const variables = {
            payRunId,
            ...pageInfo,
            searchTerm,
        };
        const response = await query(
            GetPayRunReportJobsGraphql,
            variables,
            ModuleEnum.PayRuns,
            abortSignal
        ).catch((error) => {
            return convertToApiErrorResult({ error });
        });
        return convertToApiPaginResult<ReportJob>(response, 'payRunReportJobs');
    },

    async downloadReport(
        DocumentGuid: string,
        fileName: string
    ): Promise<void> {
        const url = GetUrl(ModuleEnum.DownloadReport) + DocumentGuid;
        const response = await getModuleStreamData(url);
        const blob = response.data;
        blob && downloadBlob(fileName, [blob]);
    },
};
