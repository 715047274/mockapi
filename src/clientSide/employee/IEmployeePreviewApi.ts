import { LoadEmployeePreviewRequestType } from '@models/employee/request/LoadEmployeePreviewRequestType';
import {
    EmployeePreviewSummaryType,
    EmployeePreviewCodeLevelDetailsType,
    EmployeePreviewType,
    EmployeePaymentDetailsType,
    OverThresholdEmployeesType,
} from '@models/preview/EmployeePreviewSummaryType';
import {
    ApiResultType,
    ApiPaginResultType,
} from '@models/common/ApiResultTypes';
import { PageInfo } from '@models/common/PageInfoType';
import { CodeBaseInfoType } from '@models/code/CodeTypes';
import {
    PreviewFilterType,
    EmployeePreviewFilterType,
    EmployeePreviewFilterResultType,
    EmployeeFilterResultType,
} from '@models/preview/PreviewSummaryType';
import { EmployeeType } from '@models/employee/EmployeeTypes';
import { PreviewPaymentItemTypeEnum } from '@models/enums/PreviewPaymentEnums';

export interface IEmployeePreviewApi {
    getPayRunEmployeesAsync(
        payRunId: number,
        employeeIds?: number[],
        signal?: AbortSignal
    ): Promise<ApiResultType<EmployeeType[]> | null>;

    getOverThresholdEmployeesAsync(
        payRunId: number,
        toComparePayRunId?: number,
        signal?: AbortSignal
    ): Promise<OverThresholdEmployeesType | null>;

    getEmployeePreviewsAsync(
        variables: LoadEmployeePreviewRequestType,
        signal?: AbortSignal
    ): Promise<ApiResultType<EmployeePreviewType> | null>;

    getEmployeePreviewSummaryAsync(
        payRunId: number,
        employeeIds: Array<number>,
        toComparePayRunId?: number,
        legalEntityIds?: number[],
        codes?: CodeBaseInfoType[],
        includeNetPay?: boolean,
        signal?: AbortSignal
    ): Promise<ApiResultType<Array<EmployeePreviewSummaryType>> | null>;

    GetPreviewEmployeeCodeLevelDetailsAsync(
        payRunId: number,
        pageInfo: PageInfo,
        itemType: number,
        codeTypeId: number,
        codeId: number,
        legalEntityIds?: number[],
        toComparePayRunId?: number,
        employeeIds?: number[],
        signal?: AbortSignal
    ): Promise<ApiPaginResultType<EmployeePreviewCodeLevelDetailsType> | null>;

    GetPaymentEmployeeDetailsAsync(
        payRunId: number,
        pageInfo: PageInfo,
        itemType: PreviewPaymentItemTypeEnum,
        legalEntityId: number,
        taxServiceId: string,
        toComparePayRunId?: number,
        signal?: AbortSignal
    ): Promise<ApiPaginResultType<EmployeePaymentDetailsType> | null>;

    getPreviewFilterLookUpValuesByPayRunAsync: (
        payRunId: number,
        toComparePayRunId?: number,
        signal?: AbortSignal
    ) => Promise<ApiResultType<PreviewFilterType> | null>;

    getPreviewEmployeeLegalEntitiesAsync: (
        payRunId: number,
        employeeId: number,
        toComparePayRunId?: number,
        signal?: AbortSignal
    ) => Promise<ApiResultType<PreviewFilterType> | null>;

    GetFilteredPreviewEmployeesAsync(
        payRunId: number,
        pageInfo: PageInfo,
        filter: EmployeePreviewFilterType,
        uniqueId: string,
        isPolling?: boolean,
        signal?: AbortSignal
    ): Promise<EmployeePreviewFilterResultType<EmployeeFilterResultType> | null>;
}
