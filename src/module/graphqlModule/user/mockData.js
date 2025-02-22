const mockUserPayGroups = [
    {
        payGroupId: 1,
        geoCountryId: 1,
        onDemandPayEnabled: false,
        ipsEnabled: false,
        countryCode: "USA",
        shortName: 'US Corps International',

    },
    {
        payGroupId: 2,
        geoCountryId: 2,
        onDemandPayEnabled: true,
        ipsEnabled: false,
        countryCode: "CAN",
        shortName: 'Canadian Enterprise',

    },
    {
        payGroupId: 3,
        geoCountryId: 3,
        onDemandPayEnabled: false,
        ipsEnabled: true,
        countryCode: "GBR",
        shortName: 'US Corps Domestic',
    }
]
const mockUserPreferences = [{
    userPreferenceId: 115,
    preferenceName: "EMPLOYEE_PANEL_MAXIMIZE_WINDOW",
    preferenceValue: "false",
    isDefault: true
}]





export {mockUserPreferences, mockUserPayGroups}