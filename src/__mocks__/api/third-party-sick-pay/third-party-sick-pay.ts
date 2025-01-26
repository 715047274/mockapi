import {
    ThirdPartySickPayProviderType,
    ThirdPartySickPayTaxExemptionType,
} from '@models/third-party-sick-pay/ThirdPartySickPayType';

export function getActiveThirdPartySickPayProviders(): {
    activeThirdPartySickPayProviders: Array<ThirdPartySickPayProviderType>;
} {
    return {
        activeThirdPartySickPayProviders: [
            {
                id: 1,
                shortName: 'Ceridian Preparer',
                xrefCode: '3PSPCeridian',
                employerTaxLiabilitiesRemittedByCeridian: true,
                employeeTaxLiabilitiesRemittedByCeridian: true,
                w2PreparedByCeridian: true,
            },
        ],
    };
}

export function getThirdPartySickPayTaxExemptions(): {
    thirdPartySickPayTaxExemptions: Array<ThirdPartySickPayTaxExemptionType>;
} {
    return {
        thirdPartySickPayTaxExemptions: [
            {
                id: 1,
                shortName: 'No Exemptions - Fully Taxable',
                xrefCode: 'NO_EXEMPTION',
                codeName: 'NO_EXEMPTION',
            },
        ],
    };
}
