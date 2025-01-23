import { UserPayGroupType } from '@models/common/UserPayGroupType';
import {
    GetUserUserPreferenceResponseType,
    SaveUserPreferenceResponseType,
    UserPreferenceType,
} from '@models/common/UserPreferenceType';

export interface IUserApi {
    getUserPayGroups(abortSignal?: AbortSignal): Promise<UserPayGroupType[]>;
    getUserPreferences(
        preferenceName?: string,
        abortSignal?: AbortSignal
    ): Promise<GetUserUserPreferenceResponseType>;
    saveUserPreferences(
        variables: UserPreferenceType,
        abortSignal?: AbortSignal
    ): Promise<SaveUserPreferenceResponseType>;
}
