import { createLegalEntityLevelPreviews } from './LegalEntityLevelProvider';
import { generateEmployee } from '../PersonGenerator';
import {
    getRandomStringFromSource,
    createBsonObjectIdArray,
    getRandomIntFromOneToMax,
    createIntArrayFromOne,
    toFixed,
} from '../mock-util';
import { EmployeePreviewType } from './models/EmployeePreviewType';

export const ns = 'DFLocal';
export const clientId = 10000;
export const countryCode = 'USA';

export const schemaVersionOptions = ['1.0.0.0', '1.0.0.1', '1.0.0.2'];

export const sortOrderOptions = createIntArrayFromOne(100);

/* this function is to append creating mock employee preview
 * it will create employee id from param from to param to.
 */
export function createEmployeePreview(
    from: number,
    to: number,
    payRunId: number
): Array<EmployeePreviewType> {
    const total = to - from + 1;
    const bsonObjectIds = createBsonObjectIdArray(total);
    const emps = generateEmployee(from, to);

    return emps.map(({ id, label: empName, no: empNumber }, idx) => {
        const items = createLegalEntityLevelPreviews();
        const sum = items
            .filter((x) => x.Level === 0)
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
            _id: { $oid: bsonObjectIds[idx] },
            SchemaVersion: getRandomStringFromSource(schemaVersionOptions),
            ClientId: clientId,
            Namespace: ns,
            CountryCode: countryCode,
            EmployeeId: id,
            EmployeeName: empName,
            EmployeeNumber: empNumber,
            TotalGroupEmployeeCount: getRandomIntFromOneToMax(10000),
            PayRunId: payRunId,
            PaygroupCalendarId: payRunId,
            OffCyclePayRunId: undefined,
            PrimaryLegalEntityId: undefined,
            PrimaryDeptJobId: undefined,
            PrimaryOrgUnitId: undefined,
            PrimaryLegalEntityName: undefined,
            PrimaryDepartmentName: undefined,
            PrimaryOrgUnitName: undefined,
            CurrentAmount: toFixed(sum.CurrentAmount),
            CurrentHours: toFixed(sum.CurrentHours),
            LimitedTaxableWages: toFixed(sum.LimitedTaxableWages),
            TotalTaxableWages: toFixed(sum.TotalTaxableWages),
            MtdAmount: toFixed(sum.MtdAmount),
            QtdAmount: toFixed(sum.QtdAmount),
            YtdAmount: toFixed(sum.YtdAmount),
            AdjustmentAmount: toFixed(sum.AdjustmentAmount),
            AdjustmentHours: toFixed(sum.AdjustmentHours),
            Items: items,
        };
    });
}
