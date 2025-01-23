import { query } from '@api/common/GraphqlUtil';
import { ModuleEnum } from '@models/enums/ModuleEnum';
import GetClientPayrollProperty from '@api/client-payroll-property/graphql/GetClientPayrollProperty.graphql';
import { ClientPayrollPropertyType } from '@models/common/ClientPayrollPropertyType';
import { IClientPayrollPropertyApi } from './IClientPayrollPropertyApi';
import { ApiResultType } from '@models/common/ApiResultTypes';
import {
    convertToApiErrorResult,
    convertToApiResult,
} from '@utils/ApiResultUtils';

export const ClientPayrollPropertyApi: IClientPayrollPropertyApi = {
    async getClientPayrollPropertiesAsync(): Promise<
        ApiResultType<Array<ClientPayrollPropertyType>>
    > {
        const response = await query(
            GetClientPayrollProperty,
            {},
            ModuleEnum.ClientPayrollProperty
        ).catch((error) => {
            return convertToApiErrorResult({ error });
        });

        return convertToApiResult(response, 'clientPayrollProperties');
    },
};
