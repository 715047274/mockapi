import {ADJUSTMENT_TYPE_CODE, THIRD_PARTY_SICK_PAY_TYPE_CODE} from '../../constant/constant.js'


export const getAdjustmentTypes = () => {
    return [
        {
            id: 4,
            shortName: 'Adjustment',
            codeName: ADJUSTMENT_TYPE_CODE,
            xrefCode: ADJUSTMENT_TYPE_CODE,
        },
        {
            id: 8,
            shortName: 'Third Party Sick Pay',
            codeName: THIRD_PARTY_SICK_PAY_TYPE_CODE,
            xrefCode: THIRD_PARTY_SICK_PAY_TYPE_CODE,
        },
    ]
}