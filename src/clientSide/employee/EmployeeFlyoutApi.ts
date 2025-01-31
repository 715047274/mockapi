import { query } from '@api/common/GraphqlUtil';
import { ModuleEnum } from '@models/enums/ModuleEnum';
import { IEmployeeFlyoutApi } from './IEmployeeFlyoutApi';
import GetEmployeeFlyoutBaseInfo from '@api/employee/graphql/GetEmployeeFlyoutBaseInfo.graphql';
import GetEmployeeCalculationInfo from '@api/employee/graphql/GetEmployeeCalculationInfo.graphql';
import {
    EmployeeCalculationInfoType,
    EmployeeFlyoutBaseInfoType,
} from '@models/employee/employee-flyout/EmployeeFlyoutApiTypes';
import { EmployeeProcessStateEnum } from '@models/enums/PayRunStatusEnums';

export const EmployeeFlyoutApi: IEmployeeFlyoutApi = {
    async getEmployeeFlyoutBaseInfoAsync(
        employeeId: number,
        payRunId: number,
        signal?: AbortSignal
    ): Promise<EmployeeFlyoutBaseInfoType | null> {
        const variables = { employeeId, payRunId };
        const response = await query(
            GetEmployeeFlyoutBaseInfo,
            variables,
            ModuleEnum.EmployeeFlyout,
            signal
        );
        const info = response?.data?.employeeFlyoutBaseInfo[0];
        return {
            ...info,
            employmentStatus: info.status,
        };
    },

    async getEmployeeCalculationInfoAsync(
        employeeId: number,
        payRunId: number,
        signal?: AbortSignal,
        isPolling?: boolean
    ): Promise<EmployeeCalculationInfoType | null> {
        const variables = { employeeIds: [employeeId], payRunId };
        const response = await query(
            GetEmployeeCalculationInfo,
            variables,
            ModuleEnum.EmployeeFlyout,
            signal,
            isPolling
        );
        const info = response?.data?.employeeCalculationInfo[0];
        return {
            processStateCode: EmployeeProcessStateEnum[info.processStateCode],
            errorCount: info.errorCount,
            lastCalculated: info.lastModifiedTimestamp,
        };
    },
};
