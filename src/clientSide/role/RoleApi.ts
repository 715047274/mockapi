import { ModuleEnum } from '@models/enums/ModuleEnum';
import { GetUrl } from '@utils/ApiUrlUtils';
import { fetchData } from '@api/common/FetchData';
import { IRoleApi } from './IRoleApi';
import { IUserRole } from '@models/common/RoleTypes';
import { query } from '@api/common/GraphqlUtil';
import GetRoleAccessAuthorizationsGraphql from './graphql/GetRoleAccessAuthorizations.graphql';
import { GetRoleAccessAuthorizationsType } from '@models/common/RoleAccessAuthorizationType';

export const RoleApi: IRoleApi = {
    async getRole(roleId: number): Promise<IUserRole> {
        try {
            const response = await fetchData(
                GetUrl(ModuleEnum.GetRole),
                {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        roleId,
                    }),
                },
                null
            );
            if (!response?.ok) {
                throw new Error('Role could not be retrieved.');
            }
            return response.json();
        } catch {
            throw new Error('Role could not be retrieved.');
        }
    },

    async getRoleAccessAuthorizations(
        accessAuthorizationName?: string,
        abortSignal?: AbortSignal
    ): Promise<GetRoleAccessAuthorizationsType> {
        const response = await query(
            GetRoleAccessAuthorizationsGraphql,
            { accessAuthorizationName },
            ModuleEnum.PayRuns,
            abortSignal
        );
        return response.data;
    },
};
