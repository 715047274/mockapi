// Models
import { LoadWageTaxRequestType } from '@models/wage-tax/request/LoadWageTaxRequestType';
import {
    EmployeeWageTaxModelType,
    EmployeeWageTaxLegalEntityFilterResponseType,
} from '@models/wage-tax/EmployeeWageTaxType';
import { WageTaxOverviewModelType } from '@models/wage-tax/WageTaxOverviewType';
import { WageTaxLegalEntityModelType } from '@models/wage-tax/WageTaxLegalEntityType';
import { ApiResultType } from '@models/common/ApiResultTypes';

export interface IWageTaxApi {
    getWageTaxOverviewAsync(
        variables: LoadWageTaxRequestType,
        abortSignal?: AbortSignal
    ): Promise<WageTaxOverviewModelType | null>;

    getWageTaxLegalEntityAsync(
        variables: LoadWageTaxRequestType,
        abortSignal?: AbortSignal
    ): Promise<WageTaxLegalEntityModelType | null>;

    getEmployeeWageTaxAsync(
        variables: LoadWageTaxRequestType,
        abortSignal?: AbortSignal
    ): Promise<EmployeeWageTaxModelType | null>;

    getEmployeeWageTaxLegalEntityFilterOptions(
        payRunId: number,
        employeeId: number,
        abortSignal?: AbortSignal
    ): Promise<ApiResultType<EmployeeWageTaxLegalEntityFilterResponseType>>;
}
