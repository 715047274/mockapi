import {
    QuickEntryGridEntryType,
    QuickEntryModelType,
} from '@models/quick-entry/quick-entry-summary/QuickEntryGridEntryType';
import {
    mockDataOptions,
    TOTAL_COUNT,
    getEmployeeNameWithId,
} from '@mocks/api/data-entry/quick-entry/quick-entry-provider-options';
import { LoadDataEntryRequestType } from '@models/data-entry/request/LoadDataEntryRequestType';
import {
    EmployeeSearchResultType,
    SearchEmployeesResponseType,
} from '@models/employee/SearchEmployeesResponseType';
import { CodeTypeEnum } from '@models/enums/CodeTypeEnum';
import {
    GetEmployeeWorkAssignmentsByDateResponseType,
    GetEmployeeWorkAssignmentsResponseType,
} from '@models/employee/EmployeeTypes';
import {
    GetEmployeeTaxCodesResponseType,
    GetEmployeeWageAttachmentCodesResponseType,
} from '@models/code/CodeTypes';
import { CreateQuickEntryResponseType } from '@models/quick-entry/response/CreateQuickEntryResponseType';
import { QuickEntryBundleResponseType } from '@models/quick-entry/response/QuickEntryBundleResponseType';
import { FilterTypeEnum } from '@models/constants/FilterConstants';
import { IssuesBannerType } from '@models/entry-issue/EntryIssueTypes';
import { DataEntryIssuesBannerGridData } from '@models/data-entry/DataEntryIssuesBannerData';
import { TaxCodes } from '@mocks/api/code/tax-codes';
import { QuickEntryRequestType } from '@models/quick-entry/request/CreateQuickEntryRequestType';
import { EarningCodes as earningCodes } from '@mocks/api/code/earning-codes';
import { DeductionCodes as deductionCodes } from '@mocks/api/code/deduction-codes';
import { FormStateEnum } from '@models/enums/FormStateEnum';
import { QuickEntryBaseType } from '@models/quick-entry/quick-entry-summary/QuickEntryBaseType';
import { DeleteQuickEntryResultType } from '@models/quick-entry/response/DeleteQuickEntryResultType';
import { SearchLaborMetricsResponseType } from '@models/employee/LaborMetricsResponseType';
import { GetQuickEntryLaborMetricsResponseType } from '@models/quick-entry/GetQuickEntryLaborMetricsResponseType';
import {
    ProjectResponseType,
    SearchProjectsResponseType,
} from '@models/quick-entry/response/SearchProjectsResponseType';
import {
    DocketResponseType,
    SearchDocketsResponseType,
} from '@models/quick-entry/response/SearchDocketsResponseType';
import { EmployeePayrollTaxSubBundleType } from '@models/employee/EmployeePayrollTaxSubBundleType';
import { GraphQLVariables } from 'msw';
import { createPagingParameter } from '@utils/PagingModelUtils';
import {
    FilterModelSearchFields,
    FilterModelType,
} from '@models/common/FilterTypes';
import {
    createFilterModel,
    getFilterModelValueByFilterType,
    getFilterModelValueOfField,
} from '@utils/FilterModelUtils';
import { chaoticInt, chaoticSelect } from '@mocks/chaoticGenerationUtils';
import {
    getQuickEntryGridId,
    getQuickEntryIdFromGridId,
} from '@components/data-entry/quick-entry/grid/quickEntryGridUtils';
import { GetPersonAddressResponseType } from '@models/check/response/PersonAddressResponseType';
import { GetEmployeeEstateInfoResponseType } from '@models/check/response/EmployeeEstateInfoResponseType';
import { PayrollValidationMessage } from '@models/common/PayrollValidationMessage';
import {
    QuickEntryEmploymentStatusFilterItemsType,
    QuickEntryImportSetFilterItemsType,
    QuickEntrySavedByFilterItemsType,
} from '@models/quick-entry/response/QuickEntryFilterResponseType';

export const getQuickEntries = (
    payload: LoadDataEntryRequestType
): QuickEntryModelType => {
    const {
        payEntryBatchDataId,
        codes,
        hours,
        rate,
        percent,
        amount,
        savedBy,
        employmentStatus,
        importSets,
        lastUpdated,
        lastUpdatedTime,
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
    const savedByFilter = getFilterModelValueByFilterType(
        filters,
        FilterTypeEnum.SAVED_BY
    );
    const employmentStatusFilter = getFilterModelValueByFilterType(
        filters,
        FilterTypeEnum.EMPLOYMENT_STATUS
    );
    const importSetFilter = getFilterModelValueByFilterType(
        filters,
        FilterTypeEnum.IMPORT_SET
    );
    const projectFilter = getFilterModelValueByFilterType(
        filters,
        FilterTypeEnum.PROJECT
    );
    const employeeNamesWithId = getEmployeeNameWithId(TOTAL_COUNT);
    const allEntries = Array.from(
        new Array<QuickEntryGridEntryType>(TOTAL_COUNT),
        (_el, idx) => {
            const datasetIdx = +idx;
            const code = codes[datasetIdx % codes.length];
            const percentToUse = percent[datasetIdx % percent.length];
            const isStagingEntry = chaoticInt(9, datasetIdx) === 3;
            const getProjects = getProjectsMock(5).searchProjects.projects;

            return {
                gridId:
                    payEntryBatchDataId[datasetIdx].toString() +
                    (isStagingEntry ? 'stage' : ''),
                payEntryBatchDataId: isStagingEntry
                    ? null
                    : payEntryBatchDataId[datasetIdx],
                payEntryBatchDataStageId: isStagingEntry
                    ? payEntryBatchDataId[datasetIdx]
                    : null,
                payRunId: payRunId,
                employeeId: employeeNamesWithId[datasetIdx].employeeId,
                employeeNumber: 'N' + idx,
                employeeName: employeeNamesWithId[datasetIdx].employeeName,
                employmentStatus:
                    employmentStatus[datasetIdx % employmentStatus.length]
                        .shortName,
                employmentStatusId:
                    employmentStatus[datasetIdx % employmentStatus.length]
                        .employmentStatusId,
                codeUniqueId: code.uniqueId,
                codeName: code.shortName,
                codeTypeId: code.codeTypeId,
                codeType: CodeTypeEnum[code.codeTypeId],
                hours: !percentToUse ? hours[datasetIdx % hours.length] : null,
                rate: !percentToUse ? rate[datasetIdx % rate.length] : null,
                percent: percentToUse,
                amount: amount[datasetIdx % amount.length],
                savedByUserId:
                    savedBy[datasetIdx % savedBy.length].savedByUserId,
                savedBy: savedBy[datasetIdx % savedBy.length].savedByUserName,
                importSetId:
                    importSets[datasetIdx % importSets.length].importSetId,
                importSetName: importSets[datasetIdx % importSets.length].name,
                projectId:
                    code.codeTypeId === CodeTypeEnum.Earning &&
                    getProjects.length
                        ? getProjects[datasetIdx % getProjects.length]
                              ?.projectId
                        : null,
                projectName:
                    code.codeTypeId === CodeTypeEnum.Earning &&
                    getProjects.length
                        ? getProjects[datasetIdx % getProjects.length]
                              ?.shortName
                        : null,
                lastUpdated: lastUpdated[datasetIdx % lastUpdated.length],
                lastUpdatedTime:
                    lastUpdatedTime[datasetIdx % lastUpdatedTime.length],
                businessDate: null,
            };
        }
    );

    const filteredEntries = allEntries?.filter(
        (qe) =>
            (!searchTerm ||
                qe.employeeName.toLowerCase().includes(searchTerm) ||
                qe.employeeNumber.toString().includes(searchTerm)) &&
            (!savedByFilter?.length ||
                savedByFilter?.some(
                    (savedByUserId) => qe.savedByUserId === savedByUserId
                )) &&
            (!codeFilter?.length ||
                codeFilter?.some(
                    (uniqueId) => qe.codeUniqueId.toString() === uniqueId
                )) &&
            (!employmentStatusFilter?.length ||
                employmentStatusFilter?.some(
                    (employmentStatusId) =>
                        qe.employmentStatusId === employmentStatusId
                )) &&
            (!importSetFilter?.length ||
                importSetFilter?.some(
                    (importSetId) => qe.importSetId === importSetId
                )) &&
            (!projectFilter?.length ||
                (projectFilter?.some(
                    (projectId) => qe.projectId === projectId
                ) &&
                    qe.codeTypeId === CodeTypeEnum.Earning))
    );

    const pagedItems = filteredEntries?.slice(skip, skip + (take ?? 25));

    return {
        quickEntries: {
            totalCount: filteredEntries?.length,
            items: pagedItems,
            issuesBannerData: makeIssueBannerData(allEntries, payRunId),
        },
    };
};

function makeIssueBannerData(
    allEntries: QuickEntryGridEntryType[],
    seed = 1
): DataEntryIssuesBannerGridData {
    const singleEmployeeSingleError = {
        issueBannerType: IssuesBannerType.GridTypeSingleEmployeeSingleError,
        payEntryBatchDataIds: [allEntries[0].payEntryBatchDataId],
        payEntryBatchDataStageIds: null,
        countOfErrors: 1,
        employeeName: allEntries[0].employeeName,
        employeeId: allEntries[0].employeeId,
        errors: [
            {
                messageTitle: 'Single Error Title',
                messageLabel: 'lblPayrollEmployeeNegativeTotalEarning',
                payRunMessageId: 0,
                payRunMessageLevelId: 0,
                messageParams: [],
                payEntryBatchDataId: allEntries[0].payEntryBatchDataId,
            },
        ],
        messageTitle: null,
        singleError: null,
        businessDate: null,
    };
    const singleEmployeeMultipleErrors = {
        issueBannerType: IssuesBannerType.GridTypeSingleEmployeeMultipleErrors,
        payEntryBatchDataIds: [allEntries[0].payEntryBatchDataId],
        payEntryBatchDataStageIds: null,
        countOfErrors: 2,
        employeeName: allEntries[0].employeeName,
        employeeId: allEntries[0].employeeId,
        messageTitle: null,
        singleError: null,
        businessDate: null,
    };
    const multipleEmployeeMultipleErrors = {
        issueBannerType:
            IssuesBannerType.GridTypeMultipleEmployeesMultipleErrors,
        countOfErrors: 2,
        payEntryBatchDataIds: [
            allEntries[0].payEntryBatchDataId,
            allEntries[1].payEntryBatchDataId,
        ],
        payEntryBatchDataStageIds: null,
        employeeName: allEntries[0].employeeName,
        employeeId: allEntries[0].employeeId,
        messageTitle: null,
        singleError: null,
        businessDate: null,
    };
    const multipleEmployeeSameError = {
        issueBannerType: IssuesBannerType.GridTypeMultipleEmployeesSameError,
        countOfErrors: 2,
        payEntryBatchDataIds: [
            allEntries[0].payEntryBatchDataId,
            allEntries[1].payEntryBatchDataId,
        ],
        payEntryBatchDataStageIds: null,
        employeeName: allEntries[0].employeeName,
        employeeId: allEntries[0].employeeId,
        messageTitle: null,
        singleError: null,
        businessDate: null,
    };
    return chaoticSelect(
        [
            singleEmployeeSingleError,
            singleEmployeeMultipleErrors,
            multipleEmployeeMultipleErrors,
            multipleEmployeeSameError,
        ],
        seed
    );
}

export const getEntry = (entryId: number): QuickEntryGridEntryType => {
    return getQuickEntries({
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
    }).quickEntries.items[0];
};

export const searchEmployeesMock = (
    maxResults: number,
    searchTerm: string
): SearchEmployeesResponseType => {
    const { rate, employmentTypes, employeeName } = mockDataOptions;
    const employeeNamesWithId = getEmployeeNameWithId(
        maxResults ?? 100,
        searchTerm
    );

    const employees = Array.from(new Array(employeeNamesWithId.length)).map(
        (data, index) =>
            ({
                employeeId: employeeNamesWithId[index].employeeId.toString(),
                displayName: employeeNamesWithId[index].employeeName,
                employeeName: employeeName[index % employeeName.length],
                employeeNumber:
                    employeeNamesWithId[index].employeeId.toString(),
                employmentType: employmentTypes[index % 3],
                baseRate: rate[Math.floor(Math.random() * rate.length)],
                vacationRate: rate[Math.floor(Math.random() * rate.length)],
                isMovedIntoPayRun: false,
                averageOvertimeRate: null,
                alternateRate: null,
                displayNameWithOnlyFirstAndLast: null,
                displayNameWithFullMiddleName: null,
            } as EmployeeSearchResultType)
    );

    return {
        searchEmployees: employees,
    };
};

export const getEmployeeWorkAssignmentsMock =
    (): GetEmployeeWorkAssignmentsResponseType => {
        const { employeeWorkAssignments } = mockDataOptions;
        const randomVal = (Math.floor(Math.random() * 10) % 4) + 1;
        const items = [...employeeWorkAssignments].slice(0, randomVal);
        randomVal > 1 && (items[randomVal - 2].isPrimary = true);
        return {
            employeeWorkAssignments: items,
        };
    };

export const getEmployeeWorkAssignmentsByDateMock =
    (): GetEmployeeWorkAssignmentsByDateResponseType => {
        const { employeeWorkAssignmentsByDate } = mockDataOptions;
        return {
            employeeWorkAssignmentsByDate: employeeWorkAssignmentsByDate,
        };
    };

export const getEmployeePayrollTaxSubBundleMock = (): {
    employeePayrollTaxSubBundle: EmployeePayrollTaxSubBundleType;
} => {
    const allTaxIds = TaxCodes.map((x) => x.codeId);
    return {
        employeePayrollTaxSubBundle: {
            taxIds: allTaxIds,
            allTaxIds,
            employeeId: null,
        },
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

export const getEmployeeTaxCodesMock = (): GetEmployeeTaxCodesResponseType => {
    return {
        taxCodesForEmployee: TaxCodes,
    };
};

export const getEmployeeWageAttachmentCodesMock = (
    employeeId: number
): GetEmployeeWageAttachmentCodesResponseType => {
    const { employeeWageAttachments } = mockDataOptions;
    return {
        employeeWageAttachmentCodes: [...employeeWageAttachments].map((ew) => ({
            ...ew,
            employeeId,
        })),
    };
};

export const getEmployeePersonAddressMock =
    (): GetPersonAddressResponseType => {
        return {
            personAddress: [
                {
                    longName: 'Kansas City KS',
                    value: '73',
                    shortName: 'Kansas City KS',
                },
            ],
        };
    };

export const deleteQuickEntryMock = (
    quickEntries: QuickEntryBaseType[]
): DeleteQuickEntryResultType => {
    if (quickEntries.length === 1) {
        const id = getQuickEntryGridId(quickEntries[0]);
        return +id % 2
            ? {
                  savingSuccessful: true,
                  totalSaved: 1,
                  totalFailed: 0,
                  errorMessage: null,
                  batchData: [
                      {
                          gridId: id,
                          payEntryBatchDataId: null,
                          payEntryBatchDataStageId: null,
                          ...getQuickEntryIdFromGridId(id),
                          success: true,
                      },
                  ],
              }
            : {
                  savingSuccessful: false,
                  totalSaved: 0,
                  totalFailed: 1,
                  errorMessage: 'Access denied.',
                  batchData: [
                      {
                          gridId: id,
                          ...getQuickEntryIdFromGridId(id),
                          success: false,
                      },
                  ],
              };
    }
    return quickEntries.length % 2
        ? {
              savingSuccessful: true,
              totalSaved: quickEntries.length,
              totalFailed: 0,
              errorMessage: null,
              batchData: quickEntries.map((qe) => ({
                  gridId: getQuickEntryGridId(qe),
                  payEntryBatchDataId: qe.payEntryBatchDataId,
                  payEntryBatchDataStageId: qe.payEntryBatchDataStageId,
                  success: true,
              })),
          }
        : {
              savingSuccessful: false,
              totalSaved: quickEntries.length / 2,
              totalFailed: quickEntries.length / 2,
              errorMessage: 'Access denied.',
              batchData: quickEntries.map((qe, index) => ({
                  gridId: getQuickEntryGridId(qe),
                  payEntryBatchDataId: qe.payEntryBatchDataId,
                  payEntryBatchDataStageId: qe.payEntryBatchDataStageId,
                  success: index % 2 ? true : false,
              })),
          };
};

export const createQuickEntryMock = (
    entryData: QuickEntryRequestType
): CreateQuickEntryResponseType => {
    const filters: FilterModelType[] = [
        createFilterModel(
            FilterModelSearchFields.DataEntry_SearchParameter_PayRunId,
            0
        ),
    ];

    const employeeMatchingEntry = getQuickEntries({
        pagingParams: createPagingParameter(
            0,
            mockDataOptions.employeeName.length
        ),
        filters,
    }).quickEntries.items.find(
        (entry) => entry.employeeId === entryData.employeeId
    );
    const codeName = [...earningCodes, ...deductionCodes].find(
        (code) => code.codeId === entryData.codeId
    )?.shortName;
    const idToUse = 1000000 + entryData.payEntryBatchDataId; // return a positive id from the negative one given, make sure it doesn't collide with other mock data
    return {
        createQuickEntry: {
            savingSuccessful: true,
            clientEntityId: null,
            errorMessage: null,
            validationSuccessful: null,
            validationMessages: null,
            batchData: [
                {
                    gridId: idToUse.toString(),
                    payEntryBatchDataId: idToUse,
                    employeeId: employeeMatchingEntry.employeeId,
                    payRunId: entryData.payRunId,
                    employeeName: employeeMatchingEntry?.employeeName,
                    employeeNumber: employeeMatchingEntry?.employeeNumber,
                    codeTypeId: entryData.codeTypeId,
                    codeType: CodeTypeEnum[entryData.codeTypeId],
                    codeName: codeName,
                    hours: entryData.unit,
                    rate: entryData.rate,
                    amount: entryData.amount,
                    percent: entryData.percent ?? null,
                    savedBy: 'CAdmin',
                    lastUpdated: new Date(Date.now()).toLocaleDateString(
                        'en-US'
                    ),
                    lastUpdatedTime: new Date(Date.now()).toLocaleTimeString(
                        'en-US'
                    ),
                },
            ],
        },
    };
};

export const getQuickEntryBundle = (
    req: GraphQLVariables
): QuickEntryBundleResponseType => {
    const entryId = getFilterModelValueOfField(
        req.variables.filters,
        FilterModelSearchFields.DataEntry_SearchParameter_PRPayEntryBatchDataId
    );
    const mockEntryFromGrid = getEntry(entryId);
    const messages = Array.from(new Array(5)).map(
        (data, index) => `Message ${index + 1}`
    );
    return {
        quickEntryBundle: {
            amount: mockEntryFromGrid.amount,
            percent: mockEntryFromGrid.percent,
            codeId: '1-1',
            codeTypeId: CodeTypeEnum.Earning,
            comment: 'Test',
            workAssignmentId: 2,
            deptJobId: 2,
            employeeId: mockEntryFromGrid.employeeId,
            legalEntityId: 2,
            orgUnitId: 2,
            rate: mockEntryFromGrid.rate,
            unit: mockEntryFromGrid.hours,
            payEntryBatchDataId: mockEntryFromGrid.payEntryBatchDataId,
            payRunDefId: 3,
            rawCodeId: 2,
            isOverride: true,
            payEntryBatchId: 2,
            lastModifiedTimestampUtc: '',
            lastModifiedTimestamp: '',
            lastModifiedUserId: -1,
            employeeDisplayName: mockEntryFromGrid.employeeName,
            payRunId: 3,
            formState: FormStateEnum.Unchanged,
            useLaborSplit: true,
            doNotDisburseToThirdPartyPayee: true,
            debitArrears: true,
            businessDate: '2023-09-29T00:00:00.000Z',
            effectivePeriodStart: '2023-09-15T00:00:00.000Z',
            effectivePeriodEnd: '2023-09-22T00:00:00.000Z',
            docket: {
                docketId: 1,
                shortName: 'DK 0',
            },
            project: {
                projectId: 1,
                shortName: 'AK 0',
            },
            laborMetricses: [],
            issuesBannerData: {
                issueBannerType:
                    messages.length > 1
                        ? IssuesBannerType.FlyoutTypeMultipleError
                        : IssuesBannerType.FlyoutTypeSingleError,
                countOfErrors: messages.length,
                errors: messages.map((x) => {
                    const obj: PayrollValidationMessage = {
                        messageLabel: '',
                        messageTitle: x,
                    };
                    return obj;
                }),
            },
        },
    };
};

export const getQuickEntryLaborMetrics =
    (): GetQuickEntryLaborMetricsResponseType => {
        return {
            quickEntryLaborMetrics: [
                {
                    codeId: 3,
                    displayName: 'Square (Box)',
                },
                {
                    codeId: 4,
                    displayName: 'Metal (Bucket)',
                },
            ],
        };
    };

export const getProjectsMock = (
    maxResults: number,
    searchTerm?: string
): SearchProjectsResponseType => {
    const projectNames = ['AK', 'AL', 'AO', 'AA', 'AP'];

    const projectsArray = Array<ProjectResponseType>(500)
        .fill({
            projectId: null,
            shortName: null,
        })
        .map(
            (_, index) =>
                ({
                    projectId: index + 1,
                    shortName: `${
                        projectNames[index % projectNames.length]
                    } ${index}`,
                } as ProjectResponseType)
        )
        .filter((en) =>
            en.shortName
                .toLowerCase()
                .includes((searchTerm ?? '').toLowerCase())
        )
        .slice(0, maxResults);

    return {
        searchProjects: {
            projects: projectsArray,
            totalCount: 500,
        },
    };
};

export const getDocketsMock = (
    maxResults: number,
    searchTerm?: string
): SearchDocketsResponseType => {
    const docketNames = ['DK', 'DL', 'DO', 'DA', 'DP'];

    const docketArray = Array<DocketResponseType>(500)
        .fill({
            docketId: null,
            shortName: null,
        })
        .map(
            (_, index) =>
                ({
                    docketId: index + 1,
                    shortName: `${
                        docketNames[index % docketNames.length]
                    } ${index}`,
                } as DocketResponseType)
        )
        .filter((en) =>
            en.shortName
                .toLowerCase()
                .includes((searchTerm ?? '').toLowerCase())
        )
        .slice(0, maxResults);

    return {
        searchDockets: {
            dockets: docketArray,
            totalCount: 500,
        },
    };
};

export const getEmployeeEstateInfoMock =
    (): GetEmployeeEstateInfoResponseType => {
        return {
            employeeEstateInfo: {
                estateName: 'Name',
                estateTIN: 'TIN',
                address1: 'Add1',
                address2: 'Add2',
                address3: 'Add3',
                city: 'City',
                postalCode: '12345',
                state: 'State',
            },
        };
    };

export const getQuickEntrySavedByFilterMockOptions =
    (): QuickEntrySavedByFilterItemsType[] => {
        return mockDataOptions.savedBy;
    };
export const getQuickEntryEmploymentStatusFilterMockOptions =
    (): QuickEntryEmploymentStatusFilterItemsType[] => {
        return mockDataOptions.employmentStatus;
    };
export const getQuickEntryImportSetFilterMockOptions =
    (): QuickEntryImportSetFilterItemsType[] => {
        return mockDataOptions.importSets;
    };
