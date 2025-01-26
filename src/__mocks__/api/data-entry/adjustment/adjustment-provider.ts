import {
    AdjustmentGridEntryType,
    AdjustmentModelType,
} from '@models/adjustment/adjustment-summary/AdjustmentGridEntryType';
import {
    mockDataOptions,
    TOTAL_COUNT,
    getEmployeeNameWithId,
} from '@mocks/api/data-entry/adjustment/adjustment-provider-options';
import { AdjustmentBundleResponseType } from '@models/adjustment/response/AdjustmentBundleResponseType';

import { FormStateEnum } from '@models/enums/FormStateEnum';
import { GraphQLVariables } from 'msw';
import { FilterModelSearchFields } from '@models/common/FilterTypes';
import {
    getFilterModelValueOfField,
    getFilterModelValueByFilterType,
} from '@utils/FilterModelUtils';
import {
    EmployeeSearchResultType,
    SearchEmployeesResponseForAdjustmentType,
} from '@models/employee/SearchEmployeesResponseType';
import { LoadDataEntryRequestType } from '@models/data-entry/request/LoadDataEntryRequestType';
import { generateEntryUUIDs } from '@utils/UuidUtils';
import { AdjustmentSavedByFilterResponseType } from '@models/adjustment/response/AdjustmentFilterResponseType';
import { FilterTypeEnum } from '@models/constants/FilterConstants';
import { DeleteAdjustmentRequestType } from '@models/adjustment/request/DeleteAdjustmentRequestType';
import { AdjustmentDeleteResultType } from '@models/adjustment/response/DeleteAdjustmentResultType';
import { SearchLaborMetricsResponseType } from '@models/employee/LaborMetricsResponseType';
import { THIRD_PARTY_SICK_PAY_TYPE_CODE } from '@models/constants/AdjustmentConstants';
import {
    getActiveThirdPartySickPayProviders,
    getThirdPartySickPayTaxExemptions,
} from '@mocks/api/third-party-sick-pay/third-party-sick-pay';
import { CodeTypeEnum } from '@models/enums/CodeTypeEnum';
import { CommitStateEnum } from '@models/enums/CommitStateEnum';
import {
    AdjustmentEntryRequestType,
    AdjustmentRequestType,
} from '@models/adjustment/request/UpsertAdjustmentRequestType';
import { UpsertAdjustmentResponseType } from '@models/adjustment/response/UpsertAdjustmentResponseType';
import { GetEmployeeWorkAssignmentsResponseType } from '@models/employee/EmployeeTypes';
import { mockPayRuns } from '@mocks/api/pay-run/pay-runs';

const getAllMockAdjustments = (payRunId: number): any[] => {
    const {
        payEntryAdjustmentBatchId,
        employmentTypes,
        adjustmentTypes,
        savedBy,
        lastUpdated,
        lastUpdatedTime,
        employeePriorStateBundle,
    } = mockDataOptions;
    const employeeNamesWithId = getEmployeeNameWithId(TOTAL_COUNT);
    const isNonUsaPayrun =
        mockPayRuns.find((p) => p.payRunId === payRunId)?.countryCode !== 'USA';
    const filteredAdjTypes = !isNonUsaPayrun
        ? adjustmentTypes
        : adjustmentTypes.filter(
              (adjType) =>
                  adjType.adjustmentTypeCode !== THIRD_PARTY_SICK_PAY_TYPE_CODE
          );
    return Array.from(
        new Array<AdjustmentGridEntryType>(TOTAL_COUNT),
        (_, idx) => {
            const datasetIdx = +idx;
            const mockAdjustment = {
                gridId: payEntryAdjustmentBatchId[datasetIdx].toString(),
                payEntryAdjustmentBatchId:
                    payEntryAdjustmentBatchId[datasetIdx],
                payRunId: payRunId,
                commitStateId:
                    datasetIdx === 0
                        ? CommitStateEnum.COMMITTED
                        : CommitStateEnum.NONE,
                employeeId: employeeNamesWithId[datasetIdx].employeeId,
                employeeName: employeeNamesWithId[datasetIdx].employeeName,
                employeeNumber: 'N' + idx,
                employmentTypeCode: employmentTypes[datasetIdx % 3],
                adjustmentTypeCode:
                    filteredAdjTypes[datasetIdx % filteredAdjTypes.length]
                        .adjustmentTypeCode,
                adjustmentTypeName:
                    filteredAdjTypes[datasetIdx % filteredAdjTypes.length]
                        .adjustmentTypeName,
                adjustmentTypeId:
                    filteredAdjTypes[datasetIdx % filteredAdjTypes.length]
                        .adjustmentTypeId,
                ...generateEntryUUIDs(),
                savedByUserId:
                    savedBy[datasetIdx % savedBy.length].savedByUserId,
                savedBy: savedBy[datasetIdx % savedBy.length].savedByUserName,
                lastUpdated: lastUpdated[datasetIdx % lastUpdated.length],
                lastUpdatedTime:
                    lastUpdatedTime[datasetIdx % lastUpdatedTime.length],
                residenceStateCode:
                    employeePriorStateBundle[
                        datasetIdx % employeePriorStateBundle.length
                    ],
                thirdPartySickPayProviderCode: null,
                thirdPartySickPayProviderId: null,
                thirdPartySickPayProviderName: null,
                thirdPartySickPayTaxExemptionCode: null,
                thirdPartySickPayTaxExemptionId: null,
                thirdPartySickPayTaxExemptionName: null,
            };
            if (
                mockAdjustment.adjustmentTypeCode ===
                THIRD_PARTY_SICK_PAY_TYPE_CODE
            ) {
                const thirdPartySickPayProvider =
                    getActiveThirdPartySickPayProviders()
                        .activeThirdPartySickPayProviders[0];
                const thirdPartySickPayTaxExemption =
                    getThirdPartySickPayTaxExemptions()
                        .thirdPartySickPayTaxExemptions[0];

                mockAdjustment.thirdPartySickPayProviderCode =
                    thirdPartySickPayProvider.xrefCode;
                mockAdjustment.thirdPartySickPayProviderId =
                    thirdPartySickPayProvider.id;
                mockAdjustment.thirdPartySickPayProviderName =
                    thirdPartySickPayProvider.shortName;
                mockAdjustment.thirdPartySickPayTaxExemptionCode =
                    thirdPartySickPayTaxExemption.codeName;
                mockAdjustment.thirdPartySickPayTaxExemptionId =
                    thirdPartySickPayTaxExemption.id;
                mockAdjustment.thirdPartySickPayTaxExemptionName =
                    thirdPartySickPayTaxExemption.shortName;
            }
            return mockAdjustment;
        }
    );
};

const getMockAdjustment = (payRunId: number, entryId: number) => {
    return getAllMockAdjustments(payRunId).find(
        (adj) => adj.payEntryAdjustmentBatchId === entryId
    );
};

export const getAdjustments = (
    payload: LoadDataEntryRequestType
): AdjustmentModelType => {
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

    const savedByFilter = getFilterModelValueByFilterType(
        filters,
        FilterTypeEnum.SAVED_BY_USERID
    );
    const adjustmentTypeFilter = getFilterModelValueByFilterType(
        filters,
        FilterTypeEnum.ADJUSTMENT_TYPE
    );

    const allEntries = getAllMockAdjustments(payRunId);
    const filteredEntries = allEntries?.filter(
        (qe) =>
            (!searchTerm ||
                qe.employeeName.toLowerCase().includes(searchTerm) ||
                qe.employeeNumber.toLowerCase().includes(searchTerm)) &&
            (!savedByFilter?.length ||
                savedByFilter?.some(
                    (savedByUserId) => qe.savedByUserId === savedByUserId
                )) &&
            (!adjustmentTypeFilter?.length ||
                adjustmentTypeFilter?.some(
                    (adjustmentTypeCode) =>
                        qe.adjustmentTypeCode === adjustmentTypeCode
                ))
    );

    const pagedItems = filteredEntries?.slice(skip, skip + (take ?? 25));

    return {
        adjustments: {
            totalCount: filteredEntries?.length,
            items: pagedItems,
        },
    };
};

export const searchEmployeesForAdjustmentMock = (
    maxResults: number,
    searchTerm: string
): SearchEmployeesResponseForAdjustmentType => {
    const { employeeName, employmentTypes } = mockDataOptions;
    const employeeNamesWithId = getEmployeeNameWithId(
        maxResults ?? 100,
        searchTerm
    );

    const employees = Array.from(new Array(employeeNamesWithId.length)).map(
        (data, index) =>
            ({
                employeeId: employeeNamesWithId[index].employeeId.toString(),
                displayName: employeeNamesWithId[index].employeeName,
                employeeName: employeeName[index],
                employeeNumber:
                    employeeNamesWithId[index].employeeId.toString(),
                displayNameWithOnlyFirstAndLast: null,
                displayNameWithFullMiddleName: null,
                employmentType: employmentTypes[index % 3],
            } as EmployeeSearchResultType)
    );

    return {
        searchEmployeesForAdjustment: employees,
    };
};

export const deleteAdjustmentMock = (
    deleteAdjustmentInput: DeleteAdjustmentRequestType
): AdjustmentDeleteResultType => {
    return deleteAdjustmentInput.payEntryAdjustmentBatchIds?.length % 2
        ? {
              success: true,
              deletedAdjustments:
                  deleteAdjustmentInput.payEntryAdjustmentBatchIds.map((id) => {
                      return {
                          gridId: id.toString(),
                          payEntryAdjustmentBatchId: id,
                      };
                  }),
          }
        : {
              success: false,
              failedPayEntryAdjustmentBatchIds:
                  deleteAdjustmentInput.payEntryAdjustmentBatchIds,
          };
};

export const upsertAdjustmentMock = (
    adjustments: AdjustmentRequestType[],
    entries?: AdjustmentEntryRequestType[]
): UpsertAdjustmentResponseType => {
    const savedAdjustmentsResult = adjustments.map((adjustment) => ({
        payEntryAdjustmentBatchId: adjustment.payEntryAdjustmentBatchId,
        employeeId: adjustment.employeeId.toString(),
        checkTypeName: mockDataOptions.adjustmentTypes.find(
            (adjType) =>
                adjType.adjustmentTypeId === adjustment.payRunAdjustmentTypeId
        ).adjustmentTypeName,
        savedBy: 'CAdmin',
        lastUpdated: new Date(Date.now()).toLocaleDateString('en-US'),
        lastUpdatedTime: new Date(Date.now()).toLocaleTimeString('en-US'),
    }));

    const savedEntriesResult = entries.map((entry) => ({
        payEntryAdjustmentBatchId: entry.payEntryAdjustmentBatchId,
        payEntryBatchDataId: entry.payEntryBatchDataId,
        clientEntityId: entry.clientEntityId,
        clientParentEntityId: entry.clientParentEntityId,
    }));

    return {
        upsertAdjustment: {
            savingSuccessful: true,
            savedAdjustments: savedAdjustmentsResult,
            failedSaveAdjustments: [],
            savedEntries: savedEntriesResult,
            failedSaveEntries: [],
            deletedEntries: [],
            failedDeleteEntries: [],
            validationSuccessful: true,
            validationMessages: [],
        },
    };
};

export const getAdjustmentBundle = (
    req: GraphQLVariables
): AdjustmentBundleResponseType => {
    const payRunId = getFilterModelValueOfField(
        req.variables.filters,
        FilterModelSearchFields.DataEntry_SearchParameter_PayRunId
    );
    const entryId = getFilterModelValueOfField(
        req.variables.filters,
        FilterModelSearchFields.DataEntry_SearchParameter_PRPayEntryAdjustmentBatchId
    );
    const mockEntryFromGrid = getMockAdjustment(payRunId, entryId);
    const isCanPayrun =
        mockPayRuns.find((p) => p.payRunId === payRunId)?.countryCode === 'CAN';
    return {
        adjustmentBundle: {
            adjustmentTypeCode: mockEntryFromGrid.adjustmentTypeCode,
            adjustmentTypeName: mockEntryFromGrid.adjustmentTypeName,
            employeeId: mockEntryFromGrid.employeeId,
            employeeNumber: mockEntryFromGrid.employeeNumber,
            employeeName: mockEntryFromGrid.employeeName,
            employmentTypeCode: mockEntryFromGrid.employmentTypeCode,
            payRunAdjustmentTypeId: mockEntryFromGrid.adjustmentTypeId,
            thirdPartySickPayProviderCode:
                mockEntryFromGrid.thirdPartySickPayProviderCode,
            thirdPartySickPayProviderId:
                mockEntryFromGrid.thirdPartySickPayProviderId,
            thirdPartySickPayProviderName:
                mockEntryFromGrid.thirdPartySickPayProviderName,
            thirdPartySickPayTaxExemptionCode:
                mockEntryFromGrid.thirdPartySickPayTaxExemptionCode,
            thirdPartySickPayTaxExemptionId:
                mockEntryFromGrid.thirdPartySickPayTaxExemptionId,
            thirdPartySickPayTaxExemptionName:
                mockEntryFromGrid.thirdPartySickPayTaxExemptionName,
            longName: 'Test',
            distributionCode: '1234',
            resPsdCode: '5678',
            residenceStateCode: 'NJ',
            payEntryAdjustmentBatchId:
                mockEntryFromGrid.payEntryAdjustmentBatchId,
            commitStateId: mockEntryFromGrid.commitStateId,
            lastModifiedTimestampUtc: '',
            lastModifiedTimestamp: '',
            lastModifiedUserId: -1,
            employeeDisplayName: mockEntryFromGrid.employeeName,
            payRunId: 3,
            formState: FormStateEnum.Unchanged,
            ...generateEntryUUIDs(),
            entries:
                mockEntryFromGrid.payEntryAdjustmentBatchId === 1
                    ? [
                          {
                              employeeId: mockEntryFromGrid.employeeId,
                              employmentTypeCode:
                                  mockEntryFromGrid.employmentTypeCode,
                              payEntryAdjustmentBatchId: 1,
                              payEntryBatchDataId: 1,
                              adjustmentEntryId: '1',
                              codeId: '1-1',
                              codeTypeId: CodeTypeEnum.Earning,
                              unit: 123.45,
                              amount: 543.21,
                              adjustedPriorPeriodRunId: 1,
                              comment: 'Test entry comment #1',
                              payRunId: 1,
                              orgUnitId: 1,
                              deptJobId: 1,
                              legalEntityId: 1,
                              legalEntityEmployeeInsuranceId: isCanPayrun
                                  ? 1
                                  : null,
                          },
                          {
                              employeeId: mockEntryFromGrid.employeeId,
                              employmentTypeCode:
                                  mockEntryFromGrid.employmentTypeCode,
                              payEntryAdjustmentBatchId: 1,
                              payEntryBatchDataId: 2,
                              adjustmentEntryId: '2',
                              codeId: '1-2',
                              codeTypeId: CodeTypeEnum.Earning,
                              amount: 543.21,
                              adjustedPriorPeriodRunId: 1,
                              comment: 'Test entry comment #2',
                              orgUnitId: 1,
                              deptJobId: 1,
                              legalEntityId: 1,
                              payRunId: 1,
                              useLaborSplit: true,
                              laborMetricses: [
                                  { codeId: 1, displayName: 'Oblong (Box)' },
                                  { codeId: 3, displayName: 'Square (Box)' },
                              ],
                              legalEntityEmployeeInsuranceId: isCanPayrun
                                  ? 1
                                  : null,
                          },
                          {
                              employeeId: mockEntryFromGrid.employeeId,
                              employmentTypeCode:
                                  mockEntryFromGrid.employmentTypeCode,
                              payEntryAdjustmentBatchId: 1,
                              payEntryBatchDataId: 3,
                              adjustmentEntryId: '3',
                              codeId: '2-1',
                              codeTypeId: CodeTypeEnum.Deduction,
                              amount: 123.45,
                              adjustedPriorPeriodRunId: 1,
                              comment: 'Test entry comment #3',
                              orgUnitId: 1,
                              deptJobId: null,
                              legalEntityId: 1,
                              wcbCodeId: 120,
                              doNotDisburseToThirdPartyPayee: true,
                              payRunId: 1,
                              legalEntityEmployeeInsuranceId: isCanPayrun
                                  ? 1
                                  : null,
                          },
                      ]
                    : [],
        },
    };
};

export const getAdjustmentSavedByFilterMockOptions =
    (): AdjustmentSavedByFilterResponseType => {
        return {
            totalCount: mockDataOptions.savedBy.length,
            items: mockDataOptions.savedBy,
        };
    };

export const getLaborMetricsMock = (): SearchLaborMetricsResponseType => {
    return {
        searchLaborMetrics: {
            laborMetricses: mockDataOptions.laborMetrics,
            totalCount: 12,
        },
    };
};

export const getEmployeeWorkAssignmentsMock =
    (): GetEmployeeWorkAssignmentsResponseType => {
        const { employeeWorkAssignments } = mockDataOptions;
        return {
            employeeWorkAssignments: employeeWorkAssignments,
        };
    };
