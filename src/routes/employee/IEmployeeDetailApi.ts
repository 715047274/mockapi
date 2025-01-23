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

export interface IEmployeeDetailApi {
    searchEmployeesAsync(
        variables: SearchEmployeesRequestType,
        signal?: AbortSignal
    ): Promise<SearchEmployeesResponseType | null>;

    searchEmployeesForAdjustmentAsync(
        variables: SearchEmployeesRequestType,
        signal?: AbortSignal
    ): Promise<SearchEmployeesResponseForAdjustmentType | null>;

    getPayRunEmployeeProcessStatesAsync(
        payRunId: number,
        employeeIds: Array<number>,
        isPolling: boolean,
        signal?: AbortSignal
    ): Promise<ApiResultType<PayRunEmployeeStatus> | null>;

    getEmployeePayrollTaxSubBundleAsync(
        variables: { employeeId: number },
        abortSignal: AbortSignal
    ): Promise<{
        employeePayrollTaxSubBundle: EmployeePayrollTaxSubBundleType;
    }>;

    getEmployeeTaxCodesAsync(
        variables: IEmployeeBasedDataRequest,
        signal?: AbortSignal
    ): Promise<GetEmployeeTaxCodesResponseType>;

    getEmployeePriorStateBundleAsync(
        payRunId: number,
        employeeId: number,
        signal?: AbortSignal
    ): Promise<GetEmployeePriorStateBundleResponseType>;

    getEmployeeWageAttachmentCodesAsync(
        variables: PayRunEmployeeBasedDataRequestType,
        signal?: AbortSignal
    ): Promise<GetEmployeeWageAttachmentCodesResponseType>;

    getEmployeeWorkAssignmentsAsync(
        variables: PayRunEmployeeBasedDataRequestType,
        signal?: AbortSignal
    ): Promise<GetEmployeeWorkAssignmentsResponseType | null>;

    getEmployeeWorkAssignmentsByDateAsync(
        variables: PayRunEmployeeWorkAssignmentsByDataRequestType,
        signal?: AbortSignal
    ): Promise<GetEmployeeWorkAssignmentsByDateResponseType | null>;

    searchLaborMetricsAsync(
        variables: LaborMetricsRequestType,
        signal?: AbortSignal
    ): Promise<SearchLaborMetricsResponseType | null>;

    getPersonAddressAsync(
        employeeId: number,
        signal?: AbortSignal
    ): Promise<GetPersonAddressResponseType | null>;

    getEmployeePsdCodesAsync(
        payRunId: number,
        employeeId: number,
        signal?: AbortSignal
    ): Promise<EmployeePsdCodeResponseType | null>;

    getEmployeeEstateInfo(
        countryCode: string,
        employeeId: number,
        signal?: AbortSignal
    ): Promise<GetEmployeeEstateInfoResponseType | null>;
}
