import { GetDistributionCodesResponseType } from '@models/code/DistributionCodeType';

export function getDistributionCodes(): GetDistributionCodesResponseType {
    return {
        distributionCodes: [
            {
                codeName: '1',
                shortName: '1',
            },
            {
                codeName: '2',
                shortName: '2',
            },
            {
                codeName: '3',
                shortName: '3',
            },
            {
                codeName: '4',
                shortName: '4',
            },
            {
                codeName: '4&G',
                shortName: '4&G',
            },
            {
                codeName: '7',
                shortName: '7',
            },
            {
                codeName: '7&A',
                shortName: '7&A',
            },
            {
                codeName: 'A',
                shortName: 'A',
            },
            {
                codeName: 'G',
                shortName: 'G',
            },
            {
                codeName: 'H',
                shortName: 'H',
            },
        ],
    };
}
