import {
    DeepPartial,
    makeOverridableObjectFactory,
} from '@mocks/makeOverridableObjectFactory';
import * as formContextImport from '@components/common/context/FormContext';
import { OffCycleFormType } from '@models/off-cycle';
import { OffCyclePayRunTypeCode } from '@models/enums/RunTypeEnums';
import { PayRunType } from '@models/pay-run';
import { CountryCodeConstant } from '@models/constants/CountryConstants';

export function mockOffCycleFormContext(
    overrides?: DeepPartial<
        formContextImport.FormContextValueType<OffCycleFormType, PayRunType>
    >
): void {
    jest.spyOn(formContextImport, 'useFormContext').mockReturnValue(
        getOffCycleFormContextMockedReturn(overrides)
    );
}

export const mockOffCycleOriginPayRun: PayRunType = {
    payRunId: 1,
    payGroupId: 101,
    payGroupName: 'Pay Group Name',
    payPeriodDisplay: '01-02',
    payDate: '2022-12-28',
    periodStart: '2022-12-07',
    periodEnd: '2022-12-28',
    commitDate: '2022-12-28',
    countryCode: CountryCodeConstant.USA,
    payrollCommitted: false,
    isQuarterAmendment: false,
    isYearEndAmendment: false,
    isOffCyclePayRun: false,
};

export const offCycleFormContextMockModel: OffCycleFormType = {
    offCyclePayRunId: 1,
    payRunDefId: 101,
    payRunDefName: 'Manual',
    commitDate: '2024-01-11',
    impoundDate: '2024-01-09',
    payDate: '2024-01-08',
    offCyclePayRunName: 'TestName',
    offCycleXRefCode: 'Xref code',
    offCyclePayRunTypeId: 1,
    offCyclePayRunTypeName: 'Normal Off Cycle',
    offCyclePayRunTypeCode: OffCyclePayRunTypeCode.NORMAL,
    tempOffCyclePayRunTypeId: 601,
    glAccrualPercent: 10,
    ledgerCode1: 'ledgerCode1',
    ledgerCode2: 'ledgerCode2',
    isAlternateFunding: false,
    isLateDepositRun: false,
    offCycleReasonId: 101,
    offCycleReasonName: 'Reason1',
    createdByPayRunId: null,
};

export const getOffCycleFormContextMockedReturn = makeOverridableObjectFactory<
    formContextImport.FormContextValueType<OffCycleFormType, PayRunType>
>({
    model: offCycleFormContextMockModel,
    updateModel: jest.fn(),
    initializeModel: jest.fn(),
    origin: mockOffCycleOriginPayRun,
    setOrigin: jest.fn(),
    save: jest.fn(),
    saveSignal: null,
    isEdit: false,
    isReadOnly: false,
    setIsReadOnly: jest.fn(),
    formUpdated: false,
    loading: false,
    setLoading: jest.fn(),
    isSaving: false,
    setIsSaving: jest.fn(),
    setFormUpdated: jest.fn(),
    formIssues: [],
    addFormIssue: jest.fn(),
    removeFormIssue: jest.fn(),
    fieldIssues: [],
    addFieldIssue: jest.fn(),
    removeFieldIssue: jest.fn(),
    hasError: jest.fn().mockReturnValue(false),
});
