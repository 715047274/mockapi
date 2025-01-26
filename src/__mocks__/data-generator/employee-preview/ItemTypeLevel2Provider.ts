import {
    getRandomNumberFromSource,
    getRandomDecimalFromRange,
    getRandomIntFromOneToMax,
} from '../mock-util';
import { EmployeePreviewItemType } from './models/EmployeePreviewType';

const itemIdOptions = [100, 120, 130, 140, 150, 160, 170, 180, 190, 200];

const mockPreviewLevel1ItemTypeLevelOptions = {
    CurrentAmount: [
        110.01, 118.98, 210.67, 340.45, 406.8, 518.53, 691.21, 763.42, 880.48,
        919.56,
    ],
    CurrentHours: [
        12.5, 6.75, 21.01, 34.1, 35.7, 40.21, 55.0, 66.11, 70.34, 88.48, 94.45,
    ],
};

const { CurrentAmount, CurrentHours } = mockPreviewLevel1ItemTypeLevelOptions;

export function getItemTypes(items: Array<string>): Array<string> {
    const totalItemTypes = getRandomIntFromOneToMax(items.length);
    return items.filter((_, idx) => idx <= totalItemTypes);
}

export function createItemTypeLevel2Previews(
    itemTypeId: number,
    parentItemId: number,
    itemTypeName: string,
    items: Array<string>
): Array<EmployeePreviewItemType> {
    return getItemTypes(items).map((itemName) => {
        const itemId = getRandomNumberFromSource(itemIdOptions);

        return {
            UniqueId: `${itemTypeId}~${itemId}`,
            Level: 2,
            ParentId: `${itemTypeId}~${parentItemId}`,
            Name: itemName,
            ItemTypeName: itemTypeName,
            ItemType: itemTypeId,
            ItemId: itemId,
            CurrentAmount: getRandomNumberFromSource(CurrentAmount),
            CurrentHours: getRandomNumberFromSource(CurrentHours),
            LimitedTaxableWages: getRandomDecimalFromRange(0, 200),
            TotalTaxableWages: getRandomDecimalFromRange(0, 500),
            MtdAmount: getRandomDecimalFromRange(1000, 1500),
            QtdAmount: getRandomDecimalFromRange(4000, 4500),
            YtdAmount: getRandomDecimalFromRange(12000, 1500 * 12),
            AdjustmentAmount: getRandomDecimalFromRange(0, 300),
            AdjustmentHours: getRandomDecimalFromRange(0, 10),
            IsNISplitDetails: false,
            IsNI: false,
            NiTaxId: undefined,
        };
    });
}
