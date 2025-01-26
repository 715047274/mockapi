import { getRandomIntFromRange, IdLabelType, toFixed } from '../mock-util';
import { createItemTypeLevelPreviewsForLegalEntity } from './ItemTypeLevel1Provider';
import { EmployeePreviewItemType } from './models/EmployeePreviewType';

const legalEntityMapping: Array<IdLabelType> = [
    { id: 1, label: 'LE Pro Shop 1' },
    { id: 2, label: 'LE Pro Shop 2' },
    { id: 3, label: 'LE Pro Shop 3' },
];

const mockPayRunPreviewSummaryLegalEntityLevelOptions = {
    Level: 0,
    ParentId: '',
    ItemTypeName: 'LegalEntity',
    ItemType: 1,
};

const { Level, ParentId, ItemType, ItemTypeName } =
    mockPayRunPreviewSummaryLegalEntityLevelOptions;

export function getLegalEntity(): Array<IdLabelType> {
    const totalLegalEntities = getRandomIntFromRange(1, 3);
    return legalEntityMapping.filter((item) => item.id <= totalLegalEntities);
}

export function createLegalEntityLevelPreviews(): Array<EmployeePreviewItemType> {
    let result: Array<EmployeePreviewItemType> = [];

    const previews = getLegalEntity().map((legalEntity) => {
        const items = createItemTypeLevelPreviewsForLegalEntity(legalEntity);
        result = result.concat(items);

        const sum = items
            .filter((x) => x.Level === 1)
            .reduce(
                (acc, curr) => ({
                    CurrentAmount:
                        acc.CurrentAmount + (curr.CurrentAmount ?? 0.0),
                    CurrentHours: acc.CurrentHours + (curr.CurrentHours ?? 0.0),
                    LimitedTaxableWages:
                        acc.LimitedTaxableWages +
                        (curr.LimitedTaxableWages ?? 0.0),
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
            UniqueId: `${ItemType}~${legalEntity.id}`,
            Level,
            ParentId,
            Name: legalEntity.label,
            ItemType,
            ItemTypeName,
            ItemId: legalEntity.id,
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
