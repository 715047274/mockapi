export const mockUserPreferences = {
    userPreferences: [
        {
            userPreferenceId: 115,
            preferenceName: 'EMPLOYEE_PANEL_MAXIMIZE_WINDOW',
            preferenceValue: 'false',
            isDefault: null,
        },
        {
            userPreferenceId: 116,
            preferenceName: 'invalid_preference_name',
            preferenceValue: '10',
            isDefault: null,
        },
        {
            userPreferenceId: 116,
            preferenceName: 'PAGE_SIZE_payRunOverview',
            preferenceValue: '10',
            isDefault: null,
        },
        {
            userPreferenceId: 116,
            preferenceName: 'PAGE_SIZE_invalid_grid_name',
            preferenceValue: '10',
            isDefault: null,
        },
    ],
}

export const mockSaveUserPreference = {
    saveUserPreference: {
        success: true,
        userPreferenceId: 11,
        messages: [],
    },
}