import { ApiResultType } from '@models/common/ApiResultTypes';
import { AllEmployeeChangesSummaryType } from '@models/employee/employee-change-summary/AllEmployeeChangesSummaryType';
import { EmployeeChangesSummaryType } from '@models/employee/employee-change-summary/EmployeeChangesSummaryType';
import { EmploymentStatusTypeEnum } from '@models/enums/EmploymentStatusTypeEnum';

export interface IPayRunEmployeeChangesSummaryApi {
    getPayRunEmployeeChangesSummaryAsync(
        payRunId: number,
        employmentStatusType: EmploymentStatusTypeEnum,
        abortSignal: AbortSignal,
        toComparePayRunId?: number
    ): Promise<ApiResultType<EmployeeChangesSummaryType>>;

    getPayRunAllEmployeeChangesSummaryAsync(
        payRunId: number,
        abortSignal: AbortSignal,
        toComparePayRunId?: number
    ): Promise<ApiResultType<AllEmployeeChangesSummaryType>>;
}
