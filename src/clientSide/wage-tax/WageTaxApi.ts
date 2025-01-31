// Libraries
import { query } from '@api/common/GraphqlUtil';

// APIs, Models
import { IWageTaxApi } from '@api/wage-tax/IWageTaxApi';
import GetWageTaxOverview from '@api/wage-tax/graphql/GetWageTaxOverview.graphql';
import GetWageTaxLegalEntity from '@api/wage-tax/graphql/GetWageTaxLegalEntity.graphql';
import GetEmployeeWageTax from '@api/wage-tax/graphql/GetEmployeeWageTax.graphql';
import GetEmployeeWageTaxLegalEntity from '@api/wage-tax/graphql/GetEmployeeWageTaxLegalEntity.graphql';
import { LoadWageTaxRequestType } from '@models/wage-tax/request/LoadWageTaxRequestType';
import { ModuleEnum } from '@models/enums/ModuleEnum';
import {
    EmployeeWageTaxModelType,
    EmployeeWageTaxLegalEntityFilterResponseType,
} from '@models/wage-tax/EmployeeWageTaxType';
import { WageTaxLegalEntityModelType } from '@models/wage-tax/WageTaxLegalEntityType';
import { WageTaxOverviewModelType } from '@models/wage-tax/WageTaxOverviewType';
import { ApiResultType } from '@models/common/ApiResultTypes';

// Utilities
import {
    convertToApiErrorResult,
    convertToApiResult,
} from '@utils/ApiResultUtils';
import { parseApolloQueryResult } from '@utils/ApolloResponseParser';

export const WageTaxApi: IWageTaxApi = {
    async getWageTaxOverviewAsync(
        variables: LoadWageTaxRequestType,
        abortSignal?: AbortSignal
    ): Promise<WageTaxOverviewModelType | null> {
        const response = await query(
            GetWageTaxOverview,
            variables,
            ModuleEnum.WageTax,
            abortSignal
        );
        return parseApolloQueryResult<WageTaxOverviewModelType>(
            response,
            'wageTaxOverview'
        );
    },
    async getWageTaxLegalEntityAsync(
        variables: LoadWageTaxRequestType,
        abortSignal?: AbortSignal
    ): Promise<WageTaxLegalEntityModelType | null> {
        const response = await query(
            GetWageTaxLegalEntity,
            variables,
            ModuleEnum.WageTax,
            abortSignal
        );
        return parseApolloQueryResult<WageTaxLegalEntityModelType>(
            response,
            'GetWageTaxLegalEntity'
        );
    },
    async getEmployeeWageTaxAsync(
        variables: LoadWageTaxRequestType,
        abortSignal?: AbortSignal
    ): Promise<EmployeeWageTaxModelType | null> {
        const response = await query(
            GetEmployeeWageTax,
            variables,
            ModuleEnum.WageTax,
            abortSignal
        );
        return parseApolloQueryResult<EmployeeWageTaxModelType>(
            response,
            'GetEmployeeWageTax'
        );
    },
    async getEmployeeWageTaxLegalEntityFilterOptions(
        payRunId: number,
        employeeId: number,
        abortSignal?: AbortSignal
    ): Promise<ApiResultType<EmployeeWageTaxLegalEntityFilterResponseType>> {
        const variables = {
            payRunId: payRunId,
            employeeId: employeeId,
        };
        const response = await query(
            GetEmployeeWageTaxLegalEntity,
            variables,
            ModuleEnum.WageTax,
            abortSignal
        ).catch((error) => {
            return convertToApiErrorResult({ error });
        });
        return convertToApiResult(response, 'employeeWageTaxLegalEntity');
    },
};
