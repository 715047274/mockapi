import {
    GetUserUserPreferenceResponseType,
    SaveUserPreferenceResponseType,
} from '@models/common/UserPreferenceType';

export const mockUserPreferences: GetUserUserPreferenceResponseType = {
    userPreferences: [
        {
            userPreferenceId: 115,
            preferenceName: 'EMPLOYEE_PANEL_MAXIMIZE_WINDOW',
            preferenceValue: 'false',
            isDefault: null,
        },
    ],
};

export const mockSaveUserPreference: SaveUserPreferenceResponseType = {
    saveUserPreference: {
        success: true,
        userPreferenceId: 11,
        messages: [],
    },
};
