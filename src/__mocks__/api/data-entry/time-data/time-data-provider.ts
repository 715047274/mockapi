// Models
import { FilterModelSearchFields } from '@models/common/FilterTypes';
import { FilterTypeEnum } from '@models/constants/FilterConstants';
import { LoadDataEntryRequestType } from '@models/data-entry/request/LoadDataEntryRequestType';
import { CodeTypeEnum } from '@models/enums/CodeTypeEnum';
import {
    EmployeeTimeDataGridEntryType,
    EmployeeTimeDataModelType,
} from '@models/time-data/flyout/TimeDataFlyoutGridEntryType';
import {
    TimeDataGridEntryType,
    TimeDataModelType,
} from '@models/time-data/time-data-summary/TimeDataGridEntryType';

// Mocks
import {
    TOTAL_COUNT,
    getEmployeeNameWithId,
    mockDataOptions,
} from '@mocks/api/data-entry/time-data/time-data-provider-options';

// Utilities
import {
    createFilterModel,
    getFilterModelValueByFilterType,
    getFilterModelValueOfField,
} from '@utils/FilterModelUtils';
import { createPagingParameter } from '@utils/PagingModelUtils';
import { formatDate, isDateInRange } from '@utils/DateUtils';

export const getTimeData = (
    payload: LoadDataEntryRequestType
): TimeDataModelType => {
    const {
        payEntryBatchDataId,
        codes,
        hours,
        rate,
        amount,
        pieceQuantity,
        savedBy,
        isRetro,
        importIdentifier,
        timeDataSources,
        businessDate,
        lastUpdated,
        lastUpdatedTime,
        comment,
    } = mockDataOptions;

    const filters = payload.filters;
    const take = payload?.pagingParams?.take ?? 0;
    const skip = payload?.pagingParams?.skip ?? 0;
    const payRunId = getFilterModelValueOfField(
        filters,
        FilterModelSearchFields.DataEntry_SearchParameter_PayRunId
    );
    const searchTerm = filters
        ?.find(
            (x) =>
                x.field ===
                FilterModelSearchFields.DataEntry_SearchParameter_SearchTerm
        )
        ?.parameterValue?.value?.toLowerCase();
    const codeFilter = getFilterModelValueByFilterType(
        filters,
        FilterTypeEnum.CODE
    );
    const importIdentifierFilter = getFilterModelValueByFilterType(
        filters,
        FilterTypeEnum.IMPORT_IDENTIFIER
    );
    const hoursFilter = getFilterModelValueByFilterType(
        filters,
        FilterTypeEnum.HOURS
    );
    const businessDateFilter = getFilterModelValueByFilterType(
        filters,
        FilterTypeEnum.BUSINESSDATE
    );
    const timeDataSourceFilter = getFilterModelValueByFilterType(
        filters,
        FilterTypeEnum.TIME_DATA_SOURCE
    );
    const employeeNamesWithId = getEmployeeNameWithId(TOTAL_COUNT);
    const allEntries = Array<TimeDataGridEntryType>(TOTAL_COUNT)
        .fill({
            payEntryBatchDataId: null,
            payRunId: null,
            employeeId: null,
            employeeNumber: null,
            employeeName: null,
            codeName: null,
            codeId: null,
            importIdentifier: null,
            timeDataSource: null,
            isRetro: null,
            hours: null,
            rate: null,
            amount: null,
            pieceQuantity: null,
            savedBy: null,
            businessDate: null,
            lastUpdated: null,
            lastUpdatedTime: null,
            comment: null,
        })
        .map((_, idx) => {
            const datasetIdx = +idx;
            const code = codes[datasetIdx % codes.length];
            return {
                payEntryBatchDataId: payEntryBatchDataId[datasetIdx],
                payRunId: payRunId,
                employeeId: employeeNamesWithId[datasetIdx].employeeId,
                employeeNumber: 'N' + idx,
                employeeName: employeeNamesWithId[datasetIdx].employeeName,
                codeUniqueId: code.uniqueId,
                codeName: code.shortName,
                codeId: null,
                codeTypeId: code.codeTypeId,
                codeType: CodeTypeEnum[code.codeTypeId],
                businessDate: businessDate[datasetIdx % businessDate.length],
                isRetro: isRetro[datasetIdx % isRetro.length],
                importIdentifierName:
                    importIdentifier[
                        datasetIdx %
                            importIdentifier.timeDataImportIdentifiers.length
                    ],
                timeDataSources:
                    timeDataSources[
                        datasetIdx % timeDataSources.timeDataSources.length
                    ],
                hours: hours[datasetIdx % hours.length],
                rate: rate[datasetIdx % rate.length],
                amount: amount[datasetIdx % amount.length],
                pieceQuantity: pieceQuantity[datasetIdx % pieceQuantity.length],
                savedBy: savedBy[datasetIdx % savedBy.length],
                lastUpdated: lastUpdated[datasetIdx % lastUpdated.length],
                lastUpdatedTime:
                    lastUpdatedTime[datasetIdx % lastUpdatedTime.length],
                comment: comment[datasetIdx % comment.length],
            };
        });

    const filteredEntries = allEntries?.filter(
        (qe) =>
            (!searchTerm ||
                qe.employeeName.toLowerCase().includes(searchTerm) ||
                qe.employeeNumber.toString().includes(searchTerm)) &&
            (!codeFilter?.length ||
                codeFilter?.some(
                    (uniqueId) => qe.codeUniqueId.toString() === uniqueId
                )) &&
            (!importIdentifierFilter?.length ||
                importIdentifierFilter?.some(
                    (identifier) => qe.importIdentifierName === identifier
                )) &&
            (!hoursFilter?.rangeStart || qe.hours >= hoursFilter.rangeStart) &&
            (!hoursFilter?.rangeEnd || qe.hours <= hoursFilter.rangeEnd) &&
            (!timeDataSourceFilter?.length ||
                timeDataSourceFilter?.some(
                    (id) => qe.timeDataSources.value === id
                )) &&
            (!businessDateFilter?.rangeStart ||
                isDateInRange(
                    formatDate(new Date(qe.businessDate)),
                    businessDateFilter.rangeStart,
                    businessDateFilter.rangeEnd
                ))
    );

    const pagedItems = filteredEntries?.slice(skip, skip + (take ?? 25));

    return {
        timeData: {
            totalCount: filteredEntries?.length,
            items: pagedItems,
        },
    };
};

export const getEntry = (entryId: number): TimeDataGridEntryType => {
    return getTimeData({
        pagingParams: createPagingParameter(
            entryId - 1, //mock data index starts at 1, so if requesting 1, skip 0,
            1
        ),
        filters: [
            createFilterModel(
                FilterModelSearchFields.DataEntry_SearchParameter_PayRunId,
                0
            ),
        ],
    }).timeData.items[0];
};

export const getTimeDataImportIdentifierMockOptions = (): any => {
    return mockDataOptions.importIdentifier;
};

export const getTimeDataSourcesMockOptions = (): any => {
    return mockDataOptions.timeDataSources;
};

export const getEmployeeTimeEntries = (
    payload: LoadDataEntryRequestType
): EmployeeTimeDataModelType => {
    const {
        amount,
        businessDate,
        codes,
        deptJobName,
        docketName,
        flsaAdjustPeriodEnd,
        flsaAdjustPeriodStart,
        hours,
        importIdentifier,
        timeDataSources,
        isRetro,
        laborDeptJobName,
        laborMetrics,
        laborOrgUnitName,
        lastUpdated,
        lastUpdatedTime,
        legalEntityName,
        orgUnitName,
        pieceQuantity,
        projectName,
        rate,
        savedBy,
        sourceSystem,
        trailingTaxationPeriodEnd,
        trailingTaxationPeriodStart,
        weekNumber,
        comment,
        batchName,
    } = mockDataOptions;
    const filters = payload.filters;
    const take = payload?.pagingParams?.take ?? 0;
    const skip = payload?.pagingParams?.skip ?? 0;
    const employeeId = getFilterModelValueOfField(
        filters,
        FilterModelSearchFields.DataEntry_SearchParameter_EmployeeId
    )[0];
    const allEntries: Array<EmployeeTimeDataGridEntryType> =
        Array<EmployeeTimeDataGridEntryType>(215)
            .fill({
                amount: null,
                businessDate: null,
                codeName: null,
                debitArrears: null,
                deptJobName: null,
                docketName: null,
                flsaAdjustPeriodEnd: null,
                flsaAdjustPeriodStart: null,
                hours: null,
                importIdentifier: null,
                timeDataSource: null,
                isEarning: null,
                isPaidByPayroll: null,
                isRetro: null,
                laborDeptJobName: null,
                laborOrgUnitName: null,
                laborMetrics: null,
                lastUpdated: null,
                lastUpdatedTime: null,
                legalEntityName: null,
                orgUnitName: null,
                pieceQuantity: null,
                projectName: null,
                rate: null,
                savedBy: null,
                sourceSystem: null,
                trailingTaxationPeriodEnd: null,
                trailingTaxationPeriodStart: null,
                weekNumber: null,
                comment: null,
                batchName: null,
            })
            .map((_, idx) => {
                const datasetIdx =
                    +idx * mockDataOptions.employeeName.length + employeeId - 1;
                const code = codes[(employeeId - 1) % codes.length];
                const datasetIndex = +idx;
                const result: EmployeeTimeDataGridEntryType = {
                    amount: amount[datasetIdx % amount.length],
                    businessDate:
                        businessDate[datasetIdx % businessDate.length],
                    codeName: code.shortName,
                    debitArrears: employeeId % 3 === 0,
                    deptJobName: deptJobName[idx % deptJobName.length],
                    docketName: docketName[idx % docketName.length],
                    flsaAdjustPeriodEnd:
                        flsaAdjustPeriodEnd[idx % flsaAdjustPeriodEnd.length],
                    flsaAdjustPeriodStart:
                        flsaAdjustPeriodStart[
                            idx % flsaAdjustPeriodStart.length
                        ],
                    hours: hours[datasetIdx % hours.length],
                    importIdentifier:
                        importIdentifier.timeDataImportIdentifiers[
                            datasetIdx %
                                importIdentifier.timeDataImportIdentifiers
                                    .length
                        ].value,
                    timeDataSource:
                        timeDataSources.timeDataSources[
                            datasetIdx % timeDataSources.timeDataSources.length
                        ].value,
                    isEarning: code.codeTypeId === CodeTypeEnum.Earning,
                    isPaidByPayroll: employeeId % 2 === 0,
                    isRetro: isRetro[datasetIdx % isRetro.length],
                    laborDeptJobName:
                        laborDeptJobName[idx % laborDeptJobName.length],
                    laborMetrics: laborMetrics[idx % laborMetrics.length],
                    laborOrgUnitName:
                        laborOrgUnitName[idx % laborOrgUnitName.length],
                    lastUpdated: lastUpdated[datasetIdx % lastUpdated.length],
                    lastUpdatedTime:
                        lastUpdatedTime[datasetIdx % lastUpdatedTime.length],
                    legalEntityName:
                        legalEntityName[idx % legalEntityName.length],
                    orgUnitName: orgUnitName[idx % orgUnitName.length],
                    pieceQuantity:
                        pieceQuantity[datasetIdx % pieceQuantity.length],
                    projectName: projectName[idx % projectName.length],
                    rate: rate[datasetIdx % rate.length],
                    savedBy: savedBy[datasetIdx % savedBy.length],
                    sourceSystem: sourceSystem[idx % sourceSystem.length],
                    trailingTaxationPeriodEnd:
                        trailingTaxationPeriodEnd[
                            idx % trailingTaxationPeriodEnd.length
                        ],
                    trailingTaxationPeriodStart:
                        trailingTaxationPeriodStart[
                            idx % trailingTaxationPeriodStart.length
                        ],
                    weekNumber: weekNumber[idx % weekNumber.length],
                    comment: comment[datasetIndex % comment.length],
                    batchName: batchName[datasetIdx % batchName.length],
                };
                return result;
            });
    const pagedItems = allEntries?.slice(skip, skip + (take ?? 100));

    return {
        employeeTimeEntryDetails: {
            totalCount: allEntries?.length,
            items: pagedItems,
        },
    };
};
