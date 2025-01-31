import { query } from '@api/common/GraphqlUtil';
import { ModuleEnum } from '@models/enums/ModuleEnum';
import { IEmployeeDetailApi } from './IEmployeeDetailApi';
import {
    convertToApiErrorResult,
    convertToApiResult,
} from '@utils/ApiResultUtils';
import { ApiResultType } from '@models/common/ApiResultTypes';
import {
    PayRunEmployeeStatus,
    GetEmployeeWorkAssignmentsResponseType,
    GetEmployeeWorkAssignmentsByDateResponseType,
} from '@models/employee/EmployeeTypes';

import {
    PayRunEmployeeBasedDataRequestType,
    PayRunEmployeeWorkAssignmentsByDataRequestType,
} from '@models/data-entry/request/PayRunEmployeeBasedDataRequestType';
import {
    GetEmployeePriorStateBundleResponseType,
    GetEmployeeTaxCodesResponseType,
    GetEmployeeWageAttachmentCodesResponseType,
} from '@models/code/CodeTypes';

import SearchEmployeesGraphql from '@api/employee/graphql/SearchEmployees.graphql';
import SearchEmployeesGraphqlForAdjustment from '@api/employee/graphql/SearchEmployeesForAdjustment.graphql';
import GetEmployeeTaxeCodesGraphql from '@api/employee/graphql/GetEmployeeTaxCodes.graphql';
import GetEmployeeWageAttachmentCodesGraphql from '@api/employee/graphql/GetEmployeeWageAttachmentCodes.graphql';
import GetEmployeePayrollTaxSubBundleGraphql from '@api/employee/graphql/GetEmployeePayrollTaxSubBundle.graphql';
import GetEmployeeWorkAssignmentsGraphql from '@api/employee/graphql/GetEmployeeWorkAssignments.graphql';
import GetEmployeeWorkAssignmentsByDateGraphql from '@api/employee/graphql/GetEmployeeWorkAssignmentsByDate.graphql';
import GetEmployeeProcessStatesGraphql from '@api/employee/graphql/GetEmployeeProcessStates.graphql';
import SearchLaborMetricsGraphql from '@api/employee/graphql/SearchLaborMetrics.graphql';
import GetPersonAddress from '@api/employee/graphql/GetPersonAddress.graphql';
import GetEmployeePsdCodesGraphql from '@api/employee/graphql/GetEmployeePsdCodes.graphql';
import GetEmployeePriorStateBundleGraphql from '@api/employee/graphql/GetEmployeePriorStateBundle.graphql';
import GetEmployeeEstateInfo from '@api/employee/graphql/GetEmployeeEstateInfo.graphql';

import { SearchEmployeesRequestType } from '@models/employee/SearchEmployeesRequestType';
import {
    SearchEmployeesResponseForAdjustmentType,
    SearchEmployeesResponseType,
} from '@models/employee/SearchEmployeesResponseType';
import { SearchLaborMetricsResponseType } from '@models/employee/LaborMetricsResponseType';
import { LaborMetricsRequestType } from '@models/employee/LaborMetricsRequestType';
import { EmployeePayrollTaxSubBundleType } from '@models/employee/EmployeePayrollTaxSubBundleType';
import { IEmployeeBasedDataRequest } from '@models/data-entry/request/IEmployeeBasedDataRequest';
import { GetPersonAddressResponseType } from '@models/check/response/PersonAddressResponseType';
import { EmployeePsdCodeResponseType } from '@models/employee/EmployeePsdCodeType';
import { GetEmployeeEstateInfoResponseType } from '@models/check/response/EmployeeEstateInfoResponseType';

export const EmployeeDetailApi: IEmployeeDetailApi = {
    async searchEmployeesAsync(
        variables: SearchEmployeesRequestType,
        signal?: AbortSignal
    ): Promise<SearchEmployeesResponseType | null> {
        const response = await query(
            SearchEmployeesGraphql,
            variables,
            ModuleEnum.Employee,
            signal
        );
        return response?.data;
    },

    async searchEmployeesForAdjustmentAsync(
        variables: SearchEmployeesRequestType,
        signal?: AbortSignal
    ): Promise<SearchEmployeesResponseForAdjustmentType | null> {
        const response = await query(
            SearchEmployeesGraphqlForAdjustment,
            variables,
            ModuleEnum.Employee,
            signal
        );
        return response?.data;
    },

    async getPayRunEmployeeProcessStatesAsync(
        payRunId: number,
        employeeIds: Array<number>,
        isPolling: boolean,
        signal?: AbortSignal
    ): Promise<ApiResultType<PayRunEmployeeStatus> | null> {
        const variables = {
            payRunId: payRunId,
            employeeIds: [...employeeIds],
            randomNumForAbort: Math.random(), //NOSONAR - it thinks the random number is for cryptography
        };
        const response = await query(
            GetEmployeeProcessStatesGraphql,
            variables,
            ModuleEnum.Employee,
            signal,
            isPolling
        ).catch((error) => {
            return convertToApiErrorResult({ error });
        });
        const result = convertToApiResult<PayRunEmployeeStatus>(
            response,
            'payRunEmployeeProcessStates'
        );
        result?.data?.statuses?.forEach((status) => {
            status.lastCalculated = new Date(status.lastCalculated);
        });
        return result;
    },

    async getEmployeePayrollTaxSubBundleAsync(
        variables: { employeeId: number },
        abortSignal: AbortSignal
    ): Promise<{
        employeePayrollTaxSubBundle: EmployeePayrollTaxSubBundleType;
    }> {
        const response = await query(
            GetEmployeePayrollTaxSubBundleGraphql,
            variables,
            ModuleEnum.Employee,
            abortSignal
        );
        return (
            response?.data ?? {
                employeeId: variables.employeeId,
                taxIds: [],
                allTaxIds: [],
            }
        );
    },

    async getEmployeeTaxCodesAsync(
        variables: IEmployeeBasedDataRequest,
        signal?: AbortSignal
    ): Promise<GetEmployeeTaxCodesResponseType> {
        const response = await query(
            GetEmployeeTaxeCodesGraphql,
            variables,
            ModuleEnum.Employee,
            signal
        );
        return response?.data ?? [];
    },

    async getEmployeePriorStateBundleAsync(
        payRunId: number,
        employeeId: number,
        signal?: AbortSignal
    ): Promise<GetEmployeePriorStateBundleResponseType> {
        const response = await query(
            GetEmployeePriorStateBundleGraphql,
            { payRunId, employeeId },
            ModuleEnum.Employee,
            signal
        );
        return response?.data ?? [];
    },
    async getEmployeeWageAttachmentCodesAsync(
        variables: PayRunEmployeeBasedDataRequestType,
        signal?: AbortSignal
    ): Promise<GetEmployeeWageAttachmentCodesResponseType> {
        const response = await query(
            GetEmployeeWageAttachmentCodesGraphql,
            variables,
            ModuleEnum.Employee,
            signal
        );
        return response?.data ?? [];
    },

    async getEmployeeWorkAssignmentsAsync(
        variables: PayRunEmployeeBasedDataRequestType,
        signal?: AbortSignal
    ): Promise<GetEmployeeWorkAssignmentsResponseType | null> {
        const response = await query(
            GetEmployeeWorkAssignmentsGraphql,
            variables,
            ModuleEnum.Employee,
            signal
        );
        return response?.data;
    },

    async getEmployeeWorkAssignmentsByDateAsync(
        variables: PayRunEmployeeWorkAssignmentsByDataRequestType,
        signal?: AbortSignal
    ): Promise<GetEmployeeWorkAssignmentsByDateResponseType | null> {
        const response = await query(
            GetEmployeeWorkAssignmentsByDateGraphql,
            variables,
            ModuleEnum.Employee,
            signal
        );
        return response?.data;
    },

    async searchLaborMetricsAsync(
        variables: LaborMetricsRequestType,
        signal?: AbortSignal
    ): Promise<SearchLaborMetricsResponseType | null> {
        const response = await query(
            SearchLaborMetricsGraphql,
            variables,
            ModuleEnum.Employee,
            signal
        );
        return response?.data;
    },

    async getPersonAddressAsync(
        employeeId: number,
        signal?: AbortSignal
    ): Promise<GetPersonAddressResponseType | null> {
        const response = await query(
            GetPersonAddress,
            { employeeId },
            ModuleEnum.Employee,
            signal
        );
        return response?.data;
    },

    async getEmployeePsdCodesAsync(
        payRunId: number,
        employeeId: number,
        signal?: AbortSignal
    ): Promise<EmployeePsdCodeResponseType | null> {
        const response = await query(
            GetEmployeePsdCodesGraphql,
            { payRunId, employeeId },
            ModuleEnum.Employee,
            signal
        );
        return response?.data;
    },

    async getEmployeeEstateInfo(
        countryCode: string,
        employeeId: number,
        signal?: AbortSignal
    ): Promise<GetEmployeeEstateInfoResponseType | null> {
        const response = await query(
            GetEmployeeEstateInfo,
            { employeeId, countryCode },
            ModuleEnum.Employee,
            signal
        );
        return response?.data;
    },
};
