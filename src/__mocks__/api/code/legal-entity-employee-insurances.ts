import { LegalEntityEmployeeInsuranceType } from '@models/code/LegalEntityEmployeeInsuranceType';

export const legalEntityEmployeeInsurances: Array<LegalEntityEmployeeInsuranceType> =
    [
        {
            legalEntityEmployeeInsuranceId: 1,
            legalEntityId: 1,
            referenceCode: '0001',
            rateGroup: 'RG1',
            legalEntityEmployeeInsurancePreferenceCodeId: 1,
            isDefault: true,
            legalEntityShortName: 'ABC University',
            legalEntityXRefCode: 'LE1',
        },
        {
            legalEntityEmployeeInsuranceId: 2,
            legalEntityId: 2,
            referenceCode: '0002',
            rateGroup: 'RG2',
            legalEntityEmployeeInsurancePreferenceCodeId: 2,
            isDefault: true,
            legalEntityShortName: 'ABC University 1',
            legalEntityXRefCode: 'LE2',
        },
        {
            legalEntityEmployeeInsuranceId: 3,
            legalEntityId: 2,
            referenceCode: '0003',
            rateGroup: 'RG3',
            legalEntityEmployeeInsurancePreferenceCodeId: 3,
            isDefault: false,
            legalEntityShortName: 'ABC University 1',
            legalEntityXRefCode: 'LE2',
        },
        {
            legalEntityEmployeeInsuranceId: 4,
            legalEntityId: 3,
            referenceCode: '0004',
            rateGroup: 'RG4',
            legalEntityEmployeeInsurancePreferenceCodeId: 4,
            isDefault: true,
            legalEntityShortName: 'ABC University 2',
            legalEntityXRefCode: 'LE3',
        },
        {
            legalEntityEmployeeInsuranceId: 5,
            legalEntityId: 3,
            referenceCode: '0005',
            rateGroup: 'RG5',
            legalEntityEmployeeInsurancePreferenceCodeId: 5,
            isDefault: false,
            legalEntityShortName: 'ABC University 2',
            legalEntityXRefCode: 'LE3',
        },
        {
            legalEntityEmployeeInsuranceId: 6,
            legalEntityId: 3,
            referenceCode: '0006',
            rateGroup: 'RG6',
            legalEntityEmployeeInsurancePreferenceCodeId: 6,
            isDefault: false,
            legalEntityShortName: 'ABC University 2',
            legalEntityXRefCode: 'LE3',
        },
        {
            legalEntityEmployeeInsuranceId: 7,
            legalEntityId: 4,
            referenceCode: '0007',
            rateGroup: 'RG7',
            legalEntityEmployeeInsurancePreferenceCodeId: 7,
            isDefault: true,
            legalEntityShortName: 'ABC University 3',
            legalEntityXRefCode: 'LE4',
        },
        {
            legalEntityEmployeeInsuranceId: 8,
            legalEntityId: 4,
            referenceCode: '0008',
            rateGroup: 'RG8',
            legalEntityEmployeeInsurancePreferenceCodeId: 8,
            isDefault: false,
            legalEntityShortName: 'ABC University 3',
            legalEntityXRefCode: 'LE4',
        },
        {
            legalEntityEmployeeInsuranceId: 9,
            legalEntityId: 4,
            referenceCode: '0009',
            rateGroup: 'RG9',
            legalEntityEmployeeInsurancePreferenceCodeId: 9,
            isDefault: false,
            legalEntityShortName: 'ABC University 3',
            legalEntityXRefCode: 'LE4',
        },
    ];
