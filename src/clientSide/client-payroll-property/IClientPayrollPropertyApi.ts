import { ApiResultType } from '@models/common/ApiResultTypes';
import { ClientPayrollPropertyType } from '@models/common/ClientPayrollPropertyType';

export interface IClientPayrollPropertyApi {
    getClientPayrollPropertiesAsync(): Promise<
        ApiResultType<Array<ClientPayrollPropertyType>>
    >;
}
