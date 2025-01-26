import { GetWcbAccountsResponseType } from '@models/wcb/WcbAccountType';
import { GetWcbCodesResponseType } from '@models/wcb/WcbCodeType';

export const getWcbAccountsMockAsync = (): GetWcbAccountsResponseType => {
    return {
        wcbAccounts: [
            {
                wcbAccountId: 1,
                legalEntityId: 1,
                effectiveStart: '2011-12-19T00:00:00',
                effectiveEnd: '0001-01-01T00:00:00',
                shortName: 'AB WC Acct',
                legalEntityName: 'LE USA',
                isTimeBased: false,
            },
            {
                wcbAccountId: 2,
                legalEntityId: 1,
                effectiveStart: '2011-12-19T00:00:00',
                effectiveEnd: '0001-01-01T00:00:00',
                shortName: 'BC WC Acct',
                legalEntityName: 'LE USA',
                isTimeBased: false,
            },
            {
                wcbAccountId: 3,
                legalEntityId: 1,
                effectiveStart: '2011-12-19T00:00:00',
                effectiveEnd: '0001-01-01T00:00:00',
                shortName: 'NB WC Acct',
                legalEntityName: 'LE USA',
                isTimeBased: false,
            },
            {
                wcbAccountId: 4,
                legalEntityId: 1,
                effectiveStart: '2011-12-19T00:00:00',
                effectiveEnd: '0001-01-01T00:00:00',
                shortName: 'NS WC Acct',
                legalEntityName: 'LE USA',
                isTimeBased: false,
            },
        ],
    };
};

export const getWcbCodesMockAsync = (): GetWcbCodesResponseType => {
    return {
        wcbCodes: [
            {
                wcbCodeId: 120,
                geoStateId: 41,
                countryCode: 'USA',
                xrefCode: null,
                shortName: 'Retirement Living Centers - Health Care Employees',
                stateCode: 'SC',
                wcbCodeCode: '8824',
            },
            {
                wcbCodeId: 119,
                geoStateId: 34,
                countryCode: 'USA',
                xrefCode: null,
                shortName: 'Retirement and Living Center',
                stateCode: 'NC',
                wcbCodeCode: '8824',
            },
            {
                wcbCodeId: 118,
                geoStateId: 6,
                countryCode: 'USA',
                xrefCode: null,
                shortName: 'TK Nanme',
                stateCode: 'CO',
                wcbCodeCode: 'TK HTML Test 3 7/23/2019',
            },
        ],
    };
};
