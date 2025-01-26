import { GetTaxWageTypeResponseType } from '@models/code/TaxWageTypeType';

export function getWageTypes(): GetTaxWageTypeResponseType {
    return {
        taxWageTypes: [
            {
                taxAuthorityInstanceId: 'USA-00340000-010',
                taxWageTypeId: 1,
                taxWageTypeCode: 'CourtesyWages',
                taxWageTypeDescription: 'Courtesy Wages',
                effectiveStart: '',
                effectiveEnd: null,
            },
            {
                taxAuthorityInstanceId: 'USA-00250000-092',
                taxWageTypeId: 2,
                taxWageTypeCode: 'ReciprocalWages',
                taxWageTypeDescription: 'Reciprocal Wages',
                effectiveStart: '',
                effectiveEnd: null,
            },
            {
                taxAuthorityInstanceId: 'USA-00250000-090',
                taxWageTypeId: 3,
                taxWageTypeCode: 'NonReciprocalWages',
                taxWageTypeDescription: 'NonReciprocal Wages',
                effectiveStart: '',
                effectiveEnd: null,
            },
        ],
    };
}
