import {
    CheckTypeType,
    GetCheckTypesResponseType,
} from '@models/check/CheckTypeTypes';
import { CheckTypeConstants } from '@models/constants/CheckTypeConstants';

export function getCheckTypes(): GetCheckTypesResponseType {
    const types: Array<CheckTypeType> = [
        {
            payRunCheckTypeId: 2,
            shortName: 'Manual',
            codeName: CheckTypeConstants.CODE_NAME_MANUAL,
            xrefCode: 'MANUAL',
        },
        {
            payRunCheckTypeId: 4,
            shortName: 'Additional',
            codeName: CheckTypeConstants.CODE_NAME_ADDITIONAL,
            xrefCode: 'ADDITIONAL',
        },
    ];

    return {
        checkTypes: types,
    };
}
