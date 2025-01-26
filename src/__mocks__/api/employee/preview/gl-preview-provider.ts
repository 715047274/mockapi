import {
    EmployeeGlPreviewType,
    GLFilterType,
    GlPreviewType,
} from '@models/preview/GlPreviewType';
import {
    glPreviewMockOptions,
    checkFilterMockOptions,
} from './gl-preview-provider-options';
import { chaoticSelect, chaoticObjects } from '@mocks/chaoticGenerationUtils';

const {
    codeTypes,
    codes,
    debits,
    credits,
    workLocations,
    workLocationLedgerCodes,
    jobAssignments,
    jobAssignmentLedgerCodes,
    disbursementTypes,
    recordTypes,
    premiumIds,
    journalNumbers,
} = glPreviewMockOptions;
const allNames = [codeTypes, ...Object.values(codes)].flat();

const optionsForField = {
    workLocationName: workLocations,
    workLocationLedgerCode: workLocationLedgerCodes,
    workLocationLedgerCodeOverride: workLocationLedgerCodes,
    positionName: jobAssignments,
    positionLedgerCode: jobAssignmentLedgerCodes,
    positionLedgerCodeOverride: jobAssignmentLedgerCodes,
    debitAmount: debits,
    creditAmount: credits,
    disbursementType: disbursementTypes,
    recordType: recordTypes,
    premiumId: premiumIds,
    name: allNames,
    categoryLedgerCode: journalNumbers,
    categoryLedgerCodeOverride: journalNumbers,
};
export function generateEmployeeGlPreviewType(
    employeeId: number
): EmployeeGlPreviewType {
    const glPreviewFilters = generateCheckFilters(3, employeeId);
    let items: GlPreviewType[] = [];
    glPreviewFilters.forEach((filter) => {
        items = items.concat(
            generateGlPreviewEntries(
                1,
                filter.payRunResultId,
                filter.legalEntityName,
                employeeId
            )
        );
    });
    return {
        glPreviewFilters,
        items,
    };
}
export function generateGlPreviewEntries(
    numberToMake: number,
    payRunResultId: number,
    legalEntityName: string,
    seed = 0
): GlPreviewType[] {
    const itemType: GlPreviewType = chaoticObjects(optionsForField, 1, seed)[0];
    const items: GlPreviewType[] = chaoticObjects(
        optionsForField,
        numberToMake,
        seed
    );
    let allItems: GlPreviewType[] = [];
    codeTypes.forEach((x, idx) => {
        allItems = allItems.concat(
            items.map((item) => {
                return {
                    ...item,
                    ...itemType,
                    payRunResultId,
                    legalEntityName,
                    name: x,
                    level: 0,
                    categoryTypeLevel: idx,
                    groupingUniqueId: idx.toString() + '-' + 'CategoryType',
                };
            })
        );
        const subItems: GlPreviewType[] = chaoticObjects(
            optionsForField,
            numberToMake,
            seed
        );
        allItems = allItems.concat(
            subItems.map((i, iidx) => {
                return {
                    ...i,
                    payRunResultId,
                    debitAmount: null,
                    legalEntityName,
                    name: codes[x][iidx],
                    level: 1,
                    categoryTypeLevel: idx,
                    groupingUniqueId: idx.toString() + '-' + 'CategoryName',
                };
            })
        );
        allItems = allItems.concat(
            subItems.map((i, iidx) => {
                return {
                    ...i,
                    payRunResultId,
                    creditAmount: null,
                    legalEntityName,
                    name: codes[x][iidx],
                    level: 1,
                    categoryTypeLevel: idx,
                    groupingUniqueId: idx.toString() + '-' + 'CategoryName',
                };
            })
        );
    });
    return allItems;
}

export function generateCheckFilters(
    numberToMake: number,
    seed = 0
): GLFilterType[] {
    const { checkTypes, legalEntities } = checkFilterMockOptions;
    return Array.from(new Array(numberToMake), (_el, idx) => {
        const checkType = chaoticSelect(checkTypes, idx + seed++);
        const legalEntityName = chaoticSelect(legalEntities, idx + seed++);
        const payRunResultId = idx + 1;
        return {
            id: legalEntityName + ', ' + checkType + ', ' + payRunResultId,
            checkType,
            legalEntityName,
            displayName: legalEntityName + ', ' + checkType,
            payRunResultId,
        };
    });
}
export function getEmployeeGlPreviewAsyncMock(
    payRunId: number,
    employeeId: number,
    signal?: AbortSignal
): Promise<{ data: EmployeeGlPreviewType; error?: string }> {
    if (!payRunId || (signal && signal.aborted)) {
        return Promise.resolve({
            data: {
                glPreviewFilters: [],
                items: [],
            },
            loading: false,
        });
    }
    return Promise.resolve({
        data: generateEmployeeGlPreviewType(employeeId),
        loading: false,
    });
}
