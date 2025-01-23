import { GetRoleAccessAuthorizationsType } from '@models/common/RoleAccessAuthorizationType';
import { IUserRole } from '@models/common/RoleTypes';

export interface IRoleApi {
    getRole(roleId: number): Promise<IUserRole>;
    getRoleAccessAuthorizations(
        accessAuthorizationName?: string
    ): Promise<GetRoleAccessAuthorizationsType>;
}
