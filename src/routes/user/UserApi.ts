import { ModuleEnum } from '@models/enums/ModuleEnum';
import { mutate, query } from '@api/common/GraphqlUtil';
import { IUserApi } from './IUserApi';
import { UserPayGroupType } from '@models/common/UserPayGroupType';
import GetUserPayGroupsGraphql from './graphql/GetUserPayGroups.graphql';
import GetUserPreferencesGraphql from './graphql/GetUserPreferences.graphql';
import SaveUserPreferencesGraphql from './graphql/SaveUserPreferences.graphql';
import { getLabel, LabelGroup } from '@utils/LocalizationUtils';
import {
    GetUserUserPreferenceResponseType,
    SaveUserPreferenceResponseType,
    UserPreferenceType,
} from '@models/common/UserPreferenceType';

export const UserApi: IUserApi = {
    async getUserPayGroups(
        abortSignal?: AbortSignal
    ): Promise<UserPayGroupType[]> {
        try {
            const response = await query(
                GetUserPayGroupsGraphql,
                {},
                ModuleEnum.PayRuns,
                abortSignal
            );
            return response.data.userPayGroups;
        } catch (err) {
            return Promise.reject(
                err.message
                    ? err.message
                    : getLabel(LabelGroup.Basic, 'UnknownError')
            );
        }
    },

    async getUserPreferences(
        preferenceName: string,
        abortSignal?: AbortSignal
    ): Promise<GetUserUserPreferenceResponseType> {
        const response = await query(
            GetUserPreferencesGraphql,
            { preferenceName },
            ModuleEnum.PayRuns,
            abortSignal
        );

        return response?.data;
    },

    async saveUserPreferences(
        variables: UserPreferenceType,
        abortSignal?: AbortSignal
    ): Promise<SaveUserPreferenceResponseType> {
        const response = await mutate(
            SaveUserPreferencesGraphql,
            { userPreference: variables },
            ModuleEnum.UserPreferenceMutation,
            abortSignal
        );
        return response?.data;
    },
};
