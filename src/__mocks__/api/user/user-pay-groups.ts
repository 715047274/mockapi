import { UserPayGroupType } from '@models/common/UserPayGroupType';
import { CountryCode } from '@models/enums/CountryCode';

export const mockUserPayGroups: UserPayGroupType[] = [
    {
        payGroupId: 1,
        geoCountryId: 1,
        onDemandPayEnabled: false,
        ipsEnabled: false,
        countryCode: CountryCode.USA,
    },
    {
        payGroupId: 2,
        geoCountryId: 2,
        onDemandPayEnabled: true,
        ipsEnabled: false,
        countryCode: CountryCode.CAN,
    },
    {
        payGroupId: 3,
        geoCountryId: 3,
        onDemandPayEnabled: false,
        ipsEnabled: true,
        countryCode: CountryCode.GBR,
    },
];
