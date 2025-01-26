import {
    CheckGridEntryType,
    CheckModelType,
} from '@models/check/check-summary/CheckGridEntryType';
import {
    mockDataOptions,
    TOTAL_COUNT,
    getEmployeeNameWithId,
} from '@mocks/api/data-entry/check/check-provider-options';
import { LoadDataEntryRequestType } from '@models/data-entry/request/LoadDataEntryRequestType';
import {
    EmployeeSearchResultType,
    SearchEmployeesResponseType,
} from '@models/employee/SearchEmployeesResponseType';
import { FilterTypeEnum } from '@models/constants/FilterConstants';
import { UpsertCheckResponseType } from '@models/check/response/UpsertCheckResponseType';
// import { CheckBundleResponseTempType } from '@models/check/response/CheckBundleResponseType';

import {
    CheckEntryRequestType,
    CheckRequestType,
} from '@models/check/request/UpsertCheckRequestType';
import { FormStateEnum } from '@models/enums/FormStateEnum';
import { CheckDeleteResultType } from '@models/check/response/DeleteCheckResultType';
import { GraphQLVariables } from 'msw';
import { FilterModelSearchFields } from '@models/common/FilterTypes';
import {
    createFilterModel,
    getFilterModelValueByFilterType,
    getFilterModelValueOfField,
} from '@utils/FilterModelUtils';
import { createPagingParameter } from '@utils/PagingModelUtils';
import { DeleteCheckRequestType } from '@models/check/request/DeleteCheckRequestType';
import { GetPayEntryAdjustmentBatchPropertyDataResponseType } from '@models/check/response/PayEntryAdjustmentBatchPropertyDataResponseType';
import { GetIncomeTaxCalcMethodsTypeResponseType } from '@models/check/response/IncomeTaxCalcMethodResponseType';
import { DataEntryConstants } from '@models/constants/DataEntryConstants';
import { GetVoidableChecksResponseType } from '@models/check/response/GetVoidableChecksResponseType';
import { IssuesBannerType } from '@models/entry-issue/EntryIssueTypes';
import { DataEntryFormField } from '@models/common/FormFieldBaseType';

export const getChecks = (
    payload: LoadDataEntryRequestType,
    makeSomeCommitted = true
): CheckModelType => {
    const {
        payEntryAdjustmentBatchId,
        checkTemplateName,
        checkTypeName,
        totalNetPay,
        savedBy,
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
    const employeeNamesWithId = getEmployeeNameWithId(TOTAL_COUNT);
    const allEntries = Array.from(
        new Array<CheckGridEntryType>(TOTAL_COUNT),
        (_, idx) => {
            const datasetIdx = +idx;
            const isOnsiteCommitted = makeSomeCommitted && datasetIdx % 8 === 0;
            return {
                gridId: payEntryAdjustmentBatchId[datasetIdx].toString(),
                payEntryAdjustmentBatchId:
                    payEntryAdjustmentBatchId[datasetIdx],
                payRunId: payRunId,
                commitStateId: isOnsiteCommitted ? 4 : (datasetIdx % 3) + 1,
                employeeId: employeeNamesWithId[datasetIdx].employeeId,
                employeeName: employeeNamesWithId[datasetIdx].employeeName,
                employeeNumber: 'N' + idx,
                checkTemplateName:
                    checkTemplateName[datasetIdx % checkTemplateName.length],
                checkTypeName: isOnsiteCommitted
                    ? 'Onsite'
                    : checkTypeName[datasetIdx % checkTypeName.length],
                totalNetPay: totalNetPay[datasetIdx % totalNetPay.length],
                savedBy: savedBy[datasetIdx % savedBy.length],
                lastUpdated: lastUpdated[datasetIdx % lastUpdated.length],
                lastUpdatedTime:
                    lastUpdatedTime[datasetIdx % lastUpdatedTime.length],
                checkTypeCode: null,
                containAttachmentWageEntry: null,
            };
        }
    );

    const filteredEntries = allEntries?.filter(
        (qe) =>
            (!searchTerm ||
                qe.employeeName.toLowerCase().includes(searchTerm) ||
                qe.employeeNumber.toString().includes(searchTerm)) &&
            (!codeFilter?.length ||
                codeFilter?.some(
                    (uniqueId) => qe.checkTemplateName.toString() === uniqueId
                ))
    );

    const pagedItems = filteredEntries?.slice(skip, skip + (take ?? 25));

    return {
        checks: {
            totalCount: filteredEntries?.length,
            items: pagedItems,
        },
    };
};

export const getCheck = (entryId: number): CheckGridEntryType => {
    return getChecks({
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
    }).checks.items[0];
};

export const searchEmployeesMock = (
    maxResults: number,
    searchTerm: string
): SearchEmployeesResponseType => {
    const employeeNamesWithId = getEmployeeNameWithId(
        maxResults ?? 100,
        searchTerm
    );

    const employees = Array<EmployeeSearchResultType>(
        employeeNamesWithId.length
    )
        .fill({
            employeeId: null,
            displayName: '',
            employeeName: '',
            employeeNumber: '',
            displayNameWithFullMiddleName: '',
            displayNameWithOnlyFirstAndLast: '',
            employmentType: null,
            baseRate: 0,
            vacationRate: 0,
            isMovedIntoPayRun: false,
        })
        .map(
            (data, index) =>
                ({
                    employeeId:
                        employeeNamesWithId[index].employeeId.toString(),
                    displayName: employeeNamesWithId[index].employeeName,
                } as EmployeeSearchResultType)
        );

    return {
        searchEmployees: employees,
    };
};

export const deleteCheckMock = (
    deleteCheckInput: DeleteCheckRequestType
): CheckDeleteResultType => {
    return deleteCheckInput.payEntryAdjustmentBatchIds?.length % 2
        ? {
              success: true,
              deletedChecks: deleteCheckInput.payEntryAdjustmentBatchIds.map(
                  (id) => {
                      return {
                          gridId: id.toString(),
                          payEntryAdjustmentBatchId: id,
                      };
                  }
              ),
          }
        : {
              success: false,
              failedPayEntryAdjustmentBatchIds:
                  deleteCheckInput.payEntryAdjustmentBatchIds,
          };
};

export const upsertCheckMock = (
    checkData: CheckRequestType,
    entriesData: Array<CheckEntryRequestType>
): UpsertCheckResponseType => {
    const employeeMatchingEntry = getChecks({
        pagingParams: createPagingParameter(
            0, //mock data index starts at 1, so if requesting 1, skip 0,
            mockDataOptions.employeeName.length
        ),
        filters: [
            createFilterModel(
                FilterModelSearchFields.DataEntry_SearchParameter_PayRunId,
                0
            ),
        ],
    }).checks.items.find((entry) => entry.employeeId === checkData.employeeId);
    return {
        upsertCheck: {
            savingSuccessful: false,
            batchData: [
                {
                    gridId: checkData.payEntryAdjustmentBatchId.toString(),
                    payEntryAdjustmentBatchId:
                        checkData.payEntryAdjustmentBatchId,
                    commitStateId: 0,
                    employeeId: employeeMatchingEntry.employeeId,
                    payRunId: checkData.payRunId,
                    employeeName: employeeMatchingEntry?.employeeName,
                    employeeNumber: employeeMatchingEntry?.employeeNumber,
                    savedBy: 'CAdmin',
                    lastUpdated: new Date(Date.now()).toLocaleDateString(
                        'en-US'
                    ),
                    lastUpdatedTime: new Date(Date.now()).toLocaleTimeString(
                        'en-US'
                    ),
                    checkTypeName: null,
                    checkTemplateName: null,
                    longName: null,
                },
            ],
            savedEntries: [],
            failedSaveEntries: [],
            errorMessage: null,
            validationSuccessful: false,
            validationMessages: [
                {
                    clientEntityId:
                        entriesData?.length > 1
                            ? entriesData[1].clientEntityId
                            : checkData.clientEntityId,
                    messageLabel: 'msgMyPayValidationMsg_NoCode',
                    messageParams: null,
                    messageFields: [DataEntryFormField.CodeField],
                },
                {
                    clientEntityId:
                        entriesData?.length > 0
                            ? entriesData[0].clientEntityId
                            : checkData.clientEntityId,
                    messageLabel: 'msgMyPayValidationMsg_MultipleSameTaxCode',
                    messageParams: null,
                    messageFields: [DataEntryFormField.CodeField],
                },
                {
                    clientEntityId: checkData.clientEntityId,
                    messageLabel: 'msgMyPayValidationMsg_InactiveEmployee',
                    messageParams: [employeeMatchingEntry?.employeeName],
                    messageFields: [DataEntryFormField.EmployeeField],
                },
            ],
        },
    };
};

export const getCheckBundle = (req: GraphQLVariables): any => {
    const entryId = getFilterModelValueOfField(
        req.variables.filters,
        FilterModelSearchFields.DataEntry_SearchParameter_PRPayEntryAdjustmentBatchId
    );
    const mockEntryFromGrid = getCheck(entryId);
    const mockEntry1 = {
        payEntryBatchDataId: 94,
        payEntryBatchDataStageId: null,
        payEntryAdjustmentBatchId: 61,
        payEntryBatchId: null,
        payRunId: 97,
        employeeId: 1,
        isOverride: false,
        rawCodeId: 2,
        codeTypeId: 2,
        codeId: '2-2',
        deptJobId: 1,
        legalEntityId: 1,
        orgUnitId: 1,
        payRunDefId: 3,
        useLaborSplit: null,
        unit: null,
        hours: null,
        rate: null,
        amount: 100,
        comment: null,
        isBalancePayOut: null,
        doNotDisburseToThirdPartyPayee: false,
        debitArrears: false,
        wcbAccountId: null,
        wcbCodeId: null,
        businessDate: null,
        wageAttachmentOrderedAmountTypeId: null,
        orderedPercent: null,
        disposableEarningAmount: null,
        limitAmount: null,
        adjustedPriorPeriodRunId: null,
        payPeriodsForTax: null,
        project: null,
        docket: null,
        laborMetricses: null,
        lastModifiedUserId: 1001,
        lastModifiedTimestamp: '2024-09-16T13:45:55.733Z',
    };
    const mockEntry2 = {
        payEntryBatchDataId: 94,
        payEntryBatchDataStageId: null,
        payEntryAdjustmentBatchId: 61,
        payEntryBatchId: null,
        payRunId: 97,
        employeeId: 1,
        isOverride: false,
        rawCodeId: 5,
        codeTypeId: 1,
        codeId: '1-5',
        deptJobId: 1,
        legalEntityId: 1,
        orgUnitId: 1,
        payRunDefId: 3,
        useLaborSplit: null,
        unit: 10,
        hours: null,
        rate: 10,
        amount: 100,
        comment: null,
        isBalancePayOut: null,
        doNotDisburseToThirdPartyPayee: false,
        debitArrears: false,
        wcbAccountId: null,
        wcbCodeId: null,
        businessDate: null,
        wageAttachmentOrderedAmountTypeId: null,
        orderedPercent: null,
        disposableEarningAmount: null,
        limitAmount: null,
        adjustedPriorPeriodRunId: null,
        payPeriodsForTax: null,
        project: null,
        docket: null,
        laborMetricses: null,
        lastModifiedUserId: 1001,
        lastModifiedTimestamp: '2024-09-16T13:45:55.733Z',
    };
    const mockEntry3 = {
        payEntryBatchDataId: 95,
        payEntryBatchDataStageId: null,
        payEntryAdjustmentBatchId: 62,
        payEntryBatchId: null,
        payRunId: 97,
        employeeId: 1,
        isOverride: false,
        rawCodeId: 11,
        codeTypeId: 4,
        codeId: '4~2',
        deptJobId: 1,
        legalEntityId: 1,
        orgUnitId: 1,
        payRunDefId: 3,
        useLaborSplit: null,
        unit: null,
        hours: null,
        rate: null,
        amount: null,
        comment: null,
        isBalancePayOut: null,
        doNotDisburseToThirdPartyPayee: false,
        debitArrears: false,
        wcbAccountId: null,
        wcbCodeId: null,
        businessDate: null,
        wageAttachmentOrderedAmountTypeId: 1,
        isStopPaySuccessful: null,
        orderedPercent: null,
        disposableEarningAmount: null,
        limitAmount: null,
        adjustedPriorPeriodRunId: null,
        payPeriodsForTax: null,
        project: null,
        docket: null,
        laborMetricses: null,
        lastModifiedUserId: 1001,
        lastModifiedTimestamp: '2024-09-16T13:45:55.733Z',
    };
    const messages = Array.from(new Array(3)).map(
        (data, index) => `Message ${index + 1}`
    );
    const mockData = {
        comment: 'Test',
        employeeId: mockEntryFromGrid.employeeId,
        payEntryAdjustmentBatchId: mockEntryFromGrid.payEntryAdjustmentBatchId,
        payRunDefId: 3,
        commitStateId: 0,
        payEntryBatchId: 2,
        lastModifiedTimestampUtc: '',
        lastModifiedTimestamp: '',
        lastModifiedUserId: -1,
        employeeDisplayName: mockEntryFromGrid.employeeName,
        payRunId: 3,
        formState: FormStateEnum.Unchanged,
        hasOverride: true,
        usaTaxationPaymentType: '13',
        excludeDisburseDirectDeposit: true,
        excludeDisbursePayCard: true,
        disburseFullNetOnly: true,
        usaTaxationPayFrequency: '26',
        checkDistributionCode: null,
        residenceLocation: null,
        excludeAdditionalTaxAmountsUS: true,
        excludeAdditionalTaxAmountsCAN: false,
        checkEmploymentType: null,
        contactInformationTypeId: null,
        isHiddenFromEss: null,
        checkTypeCode: DataEntryConstants.CHECK_TYPE_ADDITIONAL,
        employeeRate: {
            employeeId: 1206,
            employeeName: 'Hdeae Emp',
            employeeNumber: '38',
            employmentType: 'Employee',
            baseRate: 25,
            vacationRate: null,
            alternateRate: null,
            averageOvertimeRate: null,
            isMovedIntoPayRun: false,
        },
        entries: [mockEntry1, mockEntry2, mockEntry3],
        issuesBannerData: {
            issueBannerType:
                messages.length > 1
                    ? IssuesBannerType.FlyoutTypeMultipleError
                    : IssuesBannerType.FlyoutTypeSingleError,
            countOfErrors: messages.length,
            errors: [
                {
                    messageTitle: messages[0],
                    payEntryBatchDataId: mockEntry1.payEntryBatchDataId,
                    messageLabel: 'DuplicateEntryMessage',
                    payRunMessageId: 0,
                    payRunMessageLevelId: 0,
                },
                {
                    messageTitle: messages[1],
                    payEntryBatchDataId: mockEntry2.payEntryBatchDataId,
                    messageLabel: 'DuplicateEntryMessage',
                    payRunMessageId: 0,
                    payRunMessageLevelId: 0,
                },
                {
                    messageTitle: messages[1],
                    payEntryAdjustmentBatchId:
                        mockEntryFromGrid.payEntryAdjustmentBatchId,
                    messageLabel: 'HeaderErrorMessage 2',
                    payRunMessageId: 0,
                    payRunMessageLevelId: 0,
                },
                {
                    messageTitle: messages[2],
                    payEntryAdjustmentBatchId:
                        mockEntryFromGrid.payEntryAdjustmentBatchId,
                    messageLabel: 'HeaderErrorMessage 2',
                    payRunMessageId: 0,
                    payRunMessageLevelId: 0,
                },
            ],
        },
    };
    return {
        checkBundle: { ...mockData, ...mockEntryFromGrid },
    };
};

const payEntryAdjustmentBatchPropertyDataTemplate = {
    dfElementId: 213,
    longName: '',
    dataType: 7,
    active: true,
    mandatory: false,
    multiValue: false,
    module: '',
    payEntryAdjustmentBatchPropertyDefId: 0,
    value: '',
    lastModifiedTimestamp: '0001-01-01T00:00:00',
    clientId: 0,
    countryCode: 'USA',
    width: null,
    unitOfMeasure: null,
    payEntryAdjustmentBatchPropertyValueId: null,
    payEntryAdjustmentBatchId: null,
    payFrequencies: null,
    employmentTypes: null,
    distributionCodes: null,
    paymentTypes: null,
};
export const getPayEntryAdjustmentBatchPropertyDataMock =
    (): GetPayEntryAdjustmentBatchPropertyDataResponseType => {
        return {
            payEntryAdjustmentBatchPropertyData: [
                {
                    ...payEntryAdjustmentBatchPropertyDataTemplate,
                    dfElementParamId: 2730,
                    codeName: 'USA_TAXATION_PAYMENT_TYPE',
                    shortName: 'Tax Method',
                    dataTypeParam: [
                        'sourceTable=PRCAIncomeTaxCalcMethod~',
                        'sourceValue=PRCAIncomeTaxCalcMethodId~',
                        'sourceDisplay=ShortName|LongName|CountryCode~',
                        'sourceCultureTable=PRCAIncomeTaxCalcMethodCulture~',
                        'sourceCultureDisplay=ShortName|LongName~',
                        "sourceFilter=CountryCode='USA'",
                    ].join(' '),
                    sortOrder: 190,
                    columnOrder: 2,
                    paymentTypes: [
                        {
                            shortName: 'Cumulative Method',
                            value: '11',
                        },
                        {
                            shortName: 'PR Christmas Bonus',
                            value: '13',
                        },
                        {
                            shortName: 'Regular Without Exemptions',
                            value: '36',
                        },
                        {
                            shortName: 'Supplemental Flat Rate',
                            value: '8',
                        },
                        {
                            shortName: 'Supplemental Rate Table',
                            value: '12',
                        },
                        {
                            shortName: 'Supplemental System Selected',
                            value: '10',
                        },
                        {
                            shortName: 'Supplemental With Separate Aggregation',
                            value: '9',
                        },
                    ],
                },
                {
                    ...payEntryAdjustmentBatchPropertyDataTemplate,
                    dfElementParamId: 2731,
                    codeName: 'USA_TAXATION_PAY_FREQUENCY',
                    shortName: 'Payment Frequency',
                    dataTypeParam: [
                        'sourceTable=PRTaxFrequency~',
                        'sourceValue=NumberOfPayPeriods~',
                        'sourceDisplay=ShortName|LongName~',
                        'sourceCultureTable=PRTaxFrequencyCulture~',
                        'sourceCultureDisplay=ShortName|LongName~',
                        'sourceCultureKey=PRTaxFrequencyId~',
                    ].join(' '),
                    sortOrder: 200,
                    columnOrder: 2,
                    payFrequencies: [
                        {
                            shortName: 'Annual',
                            value: '1',
                        },
                        {
                            shortName: 'Bi-Weekly',
                            value: '26',
                        },
                        {
                            shortName: 'Monthly',
                            value: '12',
                        },
                        {
                            shortName: 'Quarterly',
                            value: '4',
                        },
                        {
                            shortName: 'Semi-Monthly',
                            value: '24',
                        },
                        {
                            shortName: 'Weekly',
                            value: '52',
                        },
                    ],
                },
                {
                    ...payEntryAdjustmentBatchPropertyDataTemplate,
                    dfElementParamId: 4243,
                    codeName: 'CHECK_EMPLOYMENT_TYPE',
                    shortName: 'Employment Type',
                    dataTypeParam: [
                        'sourceTable=EmploymentType~',
                        'sourceValue=EmploymentTypeId~',
                        'sourceDisplay=ShortName|LongName~',
                        'sourceCultureTable=EmploymentTypeCulture~',
                        'sourceCultureDisplay=ShortName|LongName',
                    ].join(' '),
                    sortOrder: 220,
                    columnOrder: 0,
                    employmentTypes: [
                        {
                            shortName: 'Contractor',
                            value: '1',
                        },
                        {
                            shortName: 'Employee',
                            value: '3',
                        },
                        {
                            shortName: 'Pensioner',
                            value: '2',
                        },
                    ],
                },
                {
                    ...payEntryAdjustmentBatchPropertyDataTemplate,
                    dfElementParamId: 4259,
                    codeName: 'CHECK_DISTRIBUTION_CODE',
                    shortName: 'Distribution Code',
                    dataTypeParam:
                        'sourceTable=PREarningCodeDistributionCode~ sourceValue=CodeName~ sourceDisplay=ShortName|LongName',
                    sortOrder: 230,
                    columnOrder: 0,
                    distributionCodes: [
                        {
                            shortName: '1',
                            value: '1',
                        },
                        {
                            shortName: '2',
                            value: '2',
                        },
                        {
                            shortName: '3',
                            value: '3',
                        },
                        {
                            shortName: '4',
                            value: '4',
                        },
                        {
                            shortName: '4&G',
                            value: '4&G',
                        },
                        {
                            shortName: '7',
                            value: '7',
                        },
                        {
                            shortName: '7&A',
                            value: '7&A',
                        },
                        {
                            shortName: 'A',
                            value: 'A',
                        },
                        {
                            shortName: 'G',
                            value: 'G',
                        },
                        {
                            shortName: 'H',
                            value: 'H',
                        },
                    ],
                },
            ],
        };
    };

export const getCaIncomeTaxCalcMethodsMock =
    (): GetIncomeTaxCalcMethodsTypeResponseType => {
        return {
            caIncomeTaxCalcMethods: [
                {
                    caIncomeTaxCalcMethodId: 8,
                    shortName: 'Supplemental Flat Rate',
                    longName: 'Supplemental Flat Rate',
                    codeName: 'SupplementalFlatRate',
                    clientId: 0,
                    lastModifiedUserId: 0,
                    lastModifiedTimestamp: '2013-05-06T11:49:47.343',
                    countryCode: 'USA',
                },
                {
                    caIncomeTaxCalcMethodId: 9,
                    shortName: 'Supplemental With Separate Aggregation',
                    longName: 'Supplemental With Separate Aggregation',
                    codeName: 'SupplementalSepAggr',
                    clientId: 0,
                    lastModifiedUserId: 0,
                    lastModifiedTimestamp: '2013-05-06T11:49:47.343',
                    countryCode: 'USA',
                },
                {
                    caIncomeTaxCalcMethodId: 10,
                    shortName: 'Supplemental System Selected',
                    longName: 'Supplemental System Selected',
                    codeName: 'SupplementalSystemSelected',
                    clientId: 0,
                    lastModifiedUserId: 0,
                    lastModifiedTimestamp: '2018-08-21T19:59:51.757',
                    countryCode: 'USA',
                },
                {
                    caIncomeTaxCalcMethodId: 11,
                    shortName: 'Cumulative Method',
                    longName: 'Cumulative Method',
                    codeName: 'SupplementalCumulativeMethod',
                    clientId: 0,
                    lastModifiedUserId: 0,
                    lastModifiedTimestamp: '2013-10-30T04:50:27.06',
                    countryCode: 'USA',
                },
                {
                    caIncomeTaxCalcMethodId: 12,
                    shortName: 'Supplemental Rate Table',
                    longName: 'Supplemental Rate Table',
                    codeName: 'SupplementalRateTable',
                    clientId: 0,
                    lastModifiedUserId: 0,
                    lastModifiedTimestamp: '2014-10-01T13:14:39.14',
                    countryCode: 'USA',
                },
                {
                    caIncomeTaxCalcMethodId: 13,
                    shortName: 'PR Christmas Bonus',
                    longName: 'Puerto Rico Christmas Bonus',
                    codeName: 'ChristmasBonus',
                    clientId: 0,
                    lastModifiedUserId: 0,
                    lastModifiedTimestamp: '2014-10-14T05:30:31.883',
                    countryCode: 'USA',
                },
                {
                    caIncomeTaxCalcMethodId: 36,
                    shortName: 'Regular Without Exemptions',
                    longName: 'Regular Without Exemptions',
                    codeName: 'RegularWithoutExemptions',
                    clientId: 0,
                    lastModifiedUserId: 0,
                    lastModifiedTimestamp: '2019-05-09T19:58:07.1',
                    countryCode: 'USA',
                },
            ],
        };
    };

export const getVoidableChecksMock = (
    payGroupId: number,
    employeeId: number
): GetVoidableChecksResponseType => {
    return {
        voidableChecks: [
            {
                uniqueId: '0-2556321',
                payRunId: payGroupId,
                payDate: '2024-07-05T00:00:00',
                payPeriod: '14',
                employeeId: employeeId,
                payRunResultId: null,
                payRunResultPermanentId: 255632,
                payRunDefId: 1,
                checkTypeId: 1,
                checkTypeName: 'Normal',
                netPay: 2228.83,
                delimittedSequenceNumbers: '000405916',
                documentIdentifier: '000405916',
                legalEntityId: 1,
                legalEntityName: 'LE Prop Shop',
                orgUnitId: 1005,
                payEntryAdjustmentBatchId: null,
                resPsdCode: '',
                fundingId: '111110',
                reasonId: null,
                isImported: false,
                legalEntityEmployeeInsuranceId: null,
                payPeriodPayDate: '2024-07-05T00:00:00',
                disbursementMethodName: '',
                earnings: [
                    {
                        earningId: 4,
                        units: 80,
                        rate: 37.5,
                        amount: 3000,
                        orgUnitId: 1005,
                        deptJobId: 2,
                        departmentId: 1,
                        projectId: null,
                        docketId: null,
                        stateCode: 'AL',
                        isInsured: true,
                        isImpounded: false,
                        isTaxExempt: false,
                        isWcbAssessable: true,
                        payeeEarningId: null,
                        adjustedPayRunId: null,
                        useLaborSplit: false,
                        voidedPayRunEarningId: 340135,
                        positionDepartmentName:
                            'QA Tester Position more than 24 characters (QADepartment1Id)',
                        laborMetricses: [],
                    },
                ],
                deductions: [],
                taxes: [
                    {
                        payrollTaxId: 325,
                        amount: 0,
                        currWageBasis: 0,
                        taxableWages: 3000,
                        eiRate: null,
                        eiReferenceCode: '',
                        dtsCode: null,
                        workPsdCode: null,
                        clientResponsible: true,
                        adjustedPayRunId: null,
                        orgUnitId: null,
                        voidedPayRunTaxId: 2272186,
                        earningsLel: null,
                        earningsAboveLelUptoPt: null,
                        earningsAbovePtUptoUel: null,
                        earningsAboveUel: null,
                        niLetter: null,
                        totalNiableWagesTt: null,
                        niablePayNonTaxable: null,
                        nonNiableTaxableBenefits: null,
                        niableTaxableBenefits: null,
                    },
                ],
                wageAttachments: [],
            },
            {
                uniqueId: '0-2556322',
                payRunId: payGroupId,
                payPeriod: '15',
                payDate: '2024-03-05T00:00:00',
                employeeId: employeeId,
                payRunResultId: null,
                payRunResultPermanentId: 255633,
                payRunDefId: 1,
                checkTypeId: 1,
                checkTypeName: 'Normal',
                netPay: 2228.83,
                delimittedSequenceNumbers: '000405916',
                documentIdentifier: '000405917',
                legalEntityId: 1,
                legalEntityName: 'LE Prop Shop1',
                orgUnitId: 1005,
                payEntryAdjustmentBatchId: null,
                resPsdCode: '',
                fundingId: '111111',
                reasonId: null,
                isImported: false,
                legalEntityEmployeeInsuranceId: null,
                payPeriodPayDate: '2024-07-5T00:00:00',
                disbursementMethodName: '',
                earnings: [
                    {
                        earningId: 4,
                        units: 80,
                        rate: 37.5,
                        amount: 3000,
                        orgUnitId: 1005,
                        deptJobId: 2,
                        departmentId: 1,
                        projectId: null,
                        docketId: null,
                        stateCode: 'AL',
                        isInsured: true,
                        isImpounded: false,
                        isTaxExempt: false,
                        isWcbAssessable: true,
                        payeeEarningId: null,
                        adjustedPayRunId: null,
                        useLaborSplit: false,
                        voidedPayRunEarningId: 340135,
                        positionDepartmentName:
                            'QA Tester Position more than 24 characters (QADepartment1Id)',
                        laborMetricses: [],
                    },
                ],
                deductions: [],
                taxes: [
                    {
                        payrollTaxId: 325,
                        amount: 0,
                        currWageBasis: 0,
                        taxableWages: 3000,
                        eiRate: null,
                        eiReferenceCode: '',
                        dtsCode: null,
                        workPsdCode: null,
                        clientResponsible: true,
                        adjustedPayRunId: null,
                        orgUnitId: null,
                        voidedPayRunTaxId: 2272186,
                        earningsLel: null,
                        earningsAboveLelUptoPt: null,
                        earningsAbovePtUptoUel: null,
                        earningsAboveUel: null,
                        niLetter: null,
                        totalNiableWagesTt: null,
                        niablePayNonTaxable: null,
                        nonNiableTaxableBenefits: null,
                        niableTaxableBenefits: null,
                    },
                ],
                wageAttachments: [],
            },
        ],
    };
};
