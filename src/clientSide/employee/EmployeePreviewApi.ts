import { query } from '@api/common/GraphqlUtil';
import { ModuleEnum } from '@models/enums/ModuleEnum';
import GetEmployeePreviewGraphql from '@api/employee/graphql/GetEmployeePreview.graphql';
import GetEmployeePreviewCodeDetails from '@api/employee/graphql/GetEmployeePreviewCodeDetails.graphql';
import { LoadEmployeePreviewRequestType } from '@models/employee/request/LoadEmployeePreviewRequestType';
import { IEmployeePreviewApi } from './IEmployeePreviewApi';
import {
    EmployeePreviewSummaryType,
    EmployeePreviewCodeLevelDetailsType,
    EmployeePreviewType,
    EmployeePaymentDetailsType,
    OverThresholdEmployeesType,
} from '@models/preview/EmployeePreviewSummaryType';
import getPreviewEmployeeSummaries from '@api/employee/graphql/GetPreviewEmployeeSummaries.graphql';
import {
    convertToApiErrorResult,
    convertToApiResult,
    convertToApiPaginResult,
} from '@utils/ApiResultUtils';
import {
    ApiResultType,
    ApiPaginResultType,
} from '@models/common/ApiResultTypes';
import { PageInfo } from '@models/common/PageInfoType';
import { CodeBaseInfoType } from '@models/code/CodeTypes';
import GetPreviewFilterLookUpValuesByPayRun from './graphql/GetPreviewFilterLookUpValuesByPayRun.graphql';
import GetPreviewEmployeeLegalEntities from './graphql/GetPreviewEmployeeLegalEntities.graphql';
import GetFilteredPreviewEmployees from './graphql/GetFilteredPreviewEmployees.graphql';
import GetEmployeePaymentDetails from './graphql/GetEmployeePaymentDetails.graphql';
import GetOverThresholdEmployees from './graphql/GetOverThresholdEmployees.graphql';
import {
    PreviewFilterType,
    EmployeePreviewFilterType,
    EmployeePreviewFilterResultType,
    EmployeeFilterResultType,
} from '@models/preview/PreviewSummaryType';
import GetPayRunEmployees from '@api/employee/graphql/GetPayRunEmployees.graphql';
import { EmployeeType } from '@models/employee/EmployeeTypes';
import { PreviewPaymentItemTypeEnum } from '@models/enums/PreviewPaymentEnums';

export const EmployeePreviewApi: IEmployeePreviewApi = {
    async getPayRunEmployeesAsync(
        payRunId: number,
        employeeIds?: number[],
        signal?: AbortSignal
    ): Promise<ApiResultType<EmployeeType[]> | null> {
        const variables = {
            payRunId: payRunId,
            employeeIds,
            randomNumForAbort: Math.random(), //NOSONAR - it thinks the random number is for cryptography
        };
        const response = await query(
            GetPayRunEmployees,
            variables,
            ModuleEnum.Employee,
            signal
        ).catch((error) => {
            return convertToApiErrorResult({ error });
        });
        return convertToApiResult(response, 'payRunEmployees');
    },
    async getOverThresholdEmployeesAsync(
        payRunId: number,
        toComparePayRunId?: number,
        signal?: AbortSignal
    ): Promise<OverThresholdEmployeesType | null> {
        const variables = {
            payRunId: payRunId,
            toComparePayRunId,
            randomNumForAbort: Math.random(), //NOSONAR - it thinks the random number is for cryptography
        };
        const response = await query(
            GetOverThresholdEmployees,
            variables,
            ModuleEnum.EmployeePreview,
            signal
        ).catch((error) => {
            return convertToApiErrorResult({ error });
        });

        const data = (response as { error?: any; data?: any })?.data
            ? (response as { error?: any; data?: any })?.data[
                  'previewOverThresholdEmployees'
              ]
            : null;
        return {
            totalCount: data?.totalCount,
            previewOverThreshholdEmployees: data?.employeeIds,
        };
    },
    async getEmployeePreviewsAsync(
        variables: LoadEmployeePreviewRequestType,
        signal?: AbortSignal
    ): Promise<ApiResultType<EmployeePreviewType> | null> {
        const response = await query(
            GetEmployeePreviewGraphql,
            variables,
            ModuleEnum.EmployeePreview,
            signal
        ).catch((error) => {
            return convertToApiErrorResult({ error });
        });
        return convertToApiResult(response, 'previewEmployee');
    },
    async getEmployeePreviewSummaryAsync(
        payRunId: number,
        employeeIds: Array<number>,
        toComparePayRunId?: number,
        legalEntityIds?: number[],
        codes?: CodeBaseInfoType[],
        includeNetPay?: boolean,
        signal?: AbortSignal
    ): Promise<ApiResultType<Array<EmployeePreviewSummaryType>> | null> {
        const variables = {
            payRunId: payRunId,
            toComparePayRunId: toComparePayRunId,
            employeeIds: employeeIds,
            legalEntityIds: legalEntityIds,
            codes: codes,
            includeNetPay: includeNetPay ?? false,
            randomNumForAbort: Math.random(), //NOSONAR - it thinks the random number is for cryptography
        };
        const response = await query(
            getPreviewEmployeeSummaries,
            variables,
            ModuleEnum.EmployeePreview,
            signal
        ).catch((error) => {
            return convertToApiErrorResult({ error });
        });
        return convertToApiResult(response, 'previewEmployeeSummaries');
    },
    async GetPreviewEmployeeCodeLevelDetailsAsync(
        payRunId: number,
        pageInfo: PageInfo,
        itemType: number,
        codeTypeId: number,
        codeId: number,
        legalEntityIds?: number[],
        toComparePayRunId?: number,
        employeeIds?: number[],
        signal?: AbortSignal
    ): Promise<ApiPaginResultType<EmployeePreviewCodeLevelDetailsType> | null> {
        const variables = {
            payRunId: payRunId,
            toComparePayRunId: toComparePayRunId,
            skip: pageInfo.skip,
            take: pageInfo.take,
            itemType: itemType,
            codeTypeId: codeTypeId,
            codeId: codeId,
            employeeIds: employeeIds,
            legalEntityIds: legalEntityIds,
            randomNumForAbort: Math.random(), //NOSONAR - it thinks the random number is for cryptography
        };
        const response = await query(
            GetEmployeePreviewCodeDetails,
            variables,
            ModuleEnum.EmployeePreview,
            signal
        ).catch((error) => {
            return convertToApiErrorResult({ error });
        });
        return convertToApiPaginResult(
            response,
            'previewCodeLevelEmployeeDetails'
        );
    },
    async GetPaymentEmployeeDetailsAsync(
        payRunId: number,
        pageInfo: PageInfo,
        itemType: PreviewPaymentItemTypeEnum,
        legalEntityId: number,
        taxServiceId: string,
        toComparePayRunId?: number,
        signal?: AbortSignal
    ): Promise<ApiPaginResultType<EmployeePaymentDetailsType> | null> {
        const variables = {
            payRunId: payRunId,
            toComparePayRunId: toComparePayRunId,
            skip: pageInfo.skip,
            take: pageInfo.take,
            legalEntityId: legalEntityId,
            taxServiceId: taxServiceId,
            itemType: itemType,
            randomNumForAbort: Math.random(), //NOSONAR - it thinks the random number is for cryptography
        };
        const response = await query(
            GetEmployeePaymentDetails,
            variables,
            ModuleEnum.EmployeePreview,
            signal
        ).catch((error) => {
            return convertToApiErrorResult({ error });
        });
        return convertToApiPaginResult(response, 'paymentEmployeeDetails');
    },
    async getPreviewFilterLookUpValuesByPayRunAsync(
        payRunId: number,
        toComparePayRunId?: number,
        signal?: AbortSignal
    ): Promise<ApiResultType<PreviewFilterType> | null> {
        const response = await query(
            GetPreviewFilterLookUpValuesByPayRun,
            {
                payRunId: payRunId,
                toComparePayRunId: toComparePayRunId,
                randomNumForAbort: Math.random(), //NOSONAR - it thinks the random number is for cryptography
            },
            ModuleEnum.PayRunPreviewSummary,
            signal
        ).catch((error) => {
            return convertToApiErrorResult({ error });
        });
        return convertToApiResult(
            response,
            'previewFilterLookUpValuesByPayRun'
        );
    },

    async getPreviewEmployeeLegalEntitiesAsync(
        payRunId: number,
        employeeId: number,
        toComparePayRunId?: number,
        signal?: AbortSignal
    ): Promise<ApiResultType<PreviewFilterType> | null> {
        const response = await query(
            GetPreviewEmployeeLegalEntities,
            {
                payRunId,
                toComparePayRunId,
                employeeId,
            },
            ModuleEnum.EmployeePreview,
            signal
        ).catch((error) => {
            return convertToApiErrorResult({ error });
        });
        return convertToApiResult(response, 'previewEmployeeLegalEntities');
    },

    async GetFilteredPreviewEmployeesAsync(
        payRunId: number,
        pageInfo: PageInfo,
        filter: EmployeePreviewFilterType,
        uniqueId: string,
        isPolling?: boolean,
        signal?: AbortSignal
    ): Promise<EmployeePreviewFilterResultType<EmployeeFilterResultType> | null> {
        const response = await query(
            GetFilteredPreviewEmployees,
            {
                payRunId,
                skip: pageInfo.skip,
                take: pageInfo.take,
                filter,
                uniqueId,
                randomNumForAbort: Math.random(), //NOSONAR - it thinks the random number is for cryptography
            },
            ModuleEnum.EmployeePreview,
            signal,
            isPolling
        ).catch((error) => {
            return convertToApiErrorResult({ error });
        });

        if (response?.error) {
            return { ...convertToApiErrorResult(response), loading: false };
        }
        const data = (response as { error?: any; data?: any })?.data
            ? (response as { error?: any; data?: any })?.data[
                  'filteredPreviewEmployees'
              ]
            : null;
        return {
            loading: false,
            items: data?.items,
            totalCount: data?.totalCount,
            filterUniqueId: data?.filterUniqueId,
            varianceStatus: data?.varianceStatus,
        };
    },
};
