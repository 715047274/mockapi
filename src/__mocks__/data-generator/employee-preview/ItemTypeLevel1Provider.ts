import {
    getRandomNumberFromSource,
    getRandomIntFromRange,
    IdLabelType,
    toFixed,
} from '../mock-util';
import { createItemTypeLevel2Previews } from './ItemTypeLevel2Provider';
import { EmployeePreviewItemType } from './models/EmployeePreviewType';

export const itemTypeOptions = [2, 3, 4, 5, 6, 7, 8];
export const itemTypeNameMapping = [
    { id: 2, label: 'Earnings' },
    { id: 3, label: 'Pre-Tax Deductions' },
    { id: 4, label: 'Employee Taxes' },
    { id: 5, label: 'Post-Tax Deductions' },
    { id: 6, label: 'Net Pay' },
    { id: 7, label: 'Memo Calcs' },
    { id: 8, label: 'Employer Taxes' },
];

const earningOptions = ['Regular', 'Vacation'];
const preTaxDeductionOptions = ['401K-B'];
const employeeTaxOptions = [
    'Fed W/H',
    'KY W/H',
    'Medicare EE',
    'NlsnCoOT',
    'Soc Sec EE',
];
const postTaxDeductionOptions = ['CR1'];
const netPayOptions = ['Check'];
const memoCalcOptions = ['medical ER cost'];
const employerTaxOptions = ['FUTA', 'KY DRT', 'KY UT ER', 'Soc Sec ER'];

const itemTypeDetailOptionsMapping: Record<number, string[]> = {
    2: earningOptions,
    3: preTaxDeductionOptions,
    4: employeeTaxOptions,
    5: postTaxDeductionOptions,
    6: netPayOptions,
    7: memoCalcOptions,
    8: employerTaxOptions,
};

const itemIdOptions = [11, 12, 13, 14, 15, 16, 17, 18, 19, 20];

export function getItemTypes(): Array<IdLabelType> {
    const totalItemTypes = getRandomIntFromRange(2, 8);
    return itemTypeNameMapping.filter((item) => item.id <= totalItemTypes);
}

export function createItemTypeLevelPreviewsForLegalEntity(
    legalEntity: IdLabelType
): Array<EmployeePreviewItemType> {
    let result: Array<EmployeePreviewItemType> = [];
    const previews = getItemTypes().map((itemType) => {
        const itemId = getRandomNumberFromSource(itemIdOptions);

        const detailsItemTypes: Array<string> =
            itemTypeDetailOptionsMapping[itemType.id];

        const items = createItemTypeLevel2Previews(
            itemType.id,
            itemId,
            itemType.label,
            detailsItemTypes
        );
        result = result.concat(items);
        const sum = items.reduce(
            (acc, curr) => ({
                CurrentAmount: acc.CurrentAmount + (curr.CurrentAmount ?? 0.0),
                CurrentHours: acc.CurrentHours + (curr.CurrentHours ?? 0.0),
                LimitedTaxableWages:
                    acc.LimitedTaxableWages + (curr.LimitedTaxableWages ?? 0.0),
                TotalTaxableWages:
                    acc.TotalTaxableWages + (curr.TotalTaxableWages ?? 0.0),
                MtdAmount: acc.MtdAmount + (curr.MtdAmount ?? 0.0),
                QtdAmount: acc.QtdAmount + (curr.QtdAmount ?? 0.0),
                YtdAmount: acc.YtdAmount + (curr.YtdAmount ?? 0.0),
                AdjustmentAmount:
                    acc.YtdAmount + (curr.AdjustmentAmount ?? 0.0),
                AdjustmentHours:
                    acc.AdjustmentHours + (curr.AdjustmentHours ?? 0.0),
            }),
            {
                CurrentAmount: 0.0,
                CurrentHours: 0.0,
                LimitedTaxableWages: 0.0,
                TotalTaxableWages: 0.0,
                MtdAmount: 0.0,
                QtdAmount: 0.0,
                YtdAmount: 0.0,
                AdjustmentAmount: 0.0,
                AdjustmentHours: 0.0,
            }
        );

        return {
            UniqueId: `${itemType.id}~${itemId}`,
            Level: 1,
            ParentId: `1~${legalEntity.id}`,
            Name: itemType.label,
            ItemTypeName: itemType.label,
            ItemType: itemType.id,
            ItemId: itemId,
            CurrentAmount: toFixed(sum.CurrentAmount),
            CurrentHours: toFixed(sum.CurrentHours),
            LimitedTaxableWages: toFixed(sum.LimitedTaxableWages),
            TotalTaxableWages: toFixed(sum.TotalTaxableWages),
            MtdAmount: toFixed(sum.MtdAmount),
            QtdAmount: toFixed(sum.QtdAmount),
            YtdAmount: toFixed(sum.YtdAmount),
            AdjustmentAmount: toFixed(sum.AdjustmentAmount),
            AdjustmentHours: toFixed(sum.AdjustmentHours),
        };
    });

    result = result.concat(previews);
    return result;
}
