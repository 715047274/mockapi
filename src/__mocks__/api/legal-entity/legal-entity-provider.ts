import { LegalEntityType } from '@models/common/LookupValueType';
import { CodeTypeEnum } from '@models/enums/CodeTypeEnum';
import { PreviewFilterType } from '@models/preview/PreviewSummaryType';

const mockLegalEntities: LegalEntityType[] = [
    {
        legalEntityId: 201,
        shortName: 'LE USA',
        longName: 'LE USA',
        countryCode: 'USA',
    },
    {
        legalEntityId: 202,
        shortName: 'LE Bakery',
        longName: 'LE Bakery',
        countryCode: 'USA',
    },
    {
        legalEntityId: 203,
        shortName: 'DMS Legal',
        longName: 'DMS Legal',
        countryCode: 'USA',
    },
    {
        legalEntityId: 204,
        shortName: 'AllenCorp',
        longName: 'AllenCorp',
        countryCode: 'USA',
    },
    {
        legalEntityId: 205,
        shortName: 'AA USA',
        longName: 'AA USA',
        countryCode: 'USA',
    },
    {
        legalEntityId: 206,
        shortName: 'AA USA2',
        longName: 'AA USA2',
        countryCode: 'USA',
    },
    {
        legalEntityId: 207,
        shortName: 'AA USA3',
        longName: 'AA USA3',
        countryCode: 'USA',
    },
    {
        legalEntityId: 208,
        shortName: 'AA USA4',
        longName: 'AA USA4',
        countryCode: 'USA',
    },
    {
        legalEntityId: 209,
        shortName: 'AA USA5',
        longName: 'AA USA5',
        countryCode: 'USA',
    },
];

export const getLegalEntities = (payRunId: number): LegalEntityType[] => {
    if (payRunId >= 0) {
        return mockLegalEntities;
    } else {
        return [];
    }
};

export const getLegalEntitiesByIds = (
    legalEntityIds: number[]
): LegalEntityType[] => {
    if (legalEntityIds) {
        return mockLegalEntities.filter((x) =>
            legalEntityIds.includes(x.legalEntityId)
        );
    } else {
        return [];
    }
};

export const getFilterLookups = (
    payRunId: number,
    employeeId?: number
): PreviewFilterType => {
    if (payRunId >= 0 && employeeId && employeeId % 2 === 0) {
        return {
            legalEntityIds: [201, 202, 203, 204, 205, 206, 207, 208, 209],
            codes: [
                { codeId: 4, codeTypeId: CodeTypeEnum.Earning },
                { codeId: 1, codeTypeId: CodeTypeEnum.Deduction },
                { codeId: 1, codeTypeId: CodeTypeEnum.Tax },
            ],
        };
    } else if (payRunId >= 0 && employeeId && employeeId % 2 === 1) {
        return {
            legalEntityIds: [201],
            codes: [
                { codeId: 4, codeTypeId: CodeTypeEnum.Earning },
                { codeId: 1, codeTypeId: CodeTypeEnum.Deduction },
                { codeId: 1, codeTypeId: CodeTypeEnum.Tax },
            ],
        };
    } else {
        return {
            legalEntityIds: [201, 202, 203, 204, 205, 206, 207, 208, 209],
            codes: [
                { codeId: 4, codeTypeId: CodeTypeEnum.Earning },
                { codeId: 1, codeTypeId: CodeTypeEnum.Deduction },
                { codeId: 1, codeTypeId: CodeTypeEnum.Tax },
            ],
        };
    }
};
