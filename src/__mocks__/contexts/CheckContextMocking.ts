import {
    DeepPartial,
    makeOverridableObjectFactory,
} from '@mocks/makeOverridableObjectFactory';
import * as checkContextImport from '@components/common/context/CheckContext';
import {
    CheckFlyoutActiveFormEnum,
    CheckOverLayViewModeEnum,
} from '@models/enums/CheckEnum';
import { FormActionModeEnum } from '@models/enums/FormModeEnum';

export function mockCheckContext(
    overrides?: DeepPartial<checkContextImport.ICheckContextValue>
): void {
    jest.spyOn(checkContextImport, 'useCheckContext').mockReturnValue(
        getCheckContextMockedReturn(overrides)
    );
}

export const getCheckContextMockedReturn =
    makeOverridableObjectFactory<checkContextImport.ICheckContextValue>({
        formCheck: null,
        formCheckEntry: null,
        gridCheck: null,
        gridCheckEntries: [],
        checkEntries: [],
        activeForm: CheckFlyoutActiveFormEnum.Check,
        overLayOpen: false,
        formMode: CheckOverLayViewModeEnum.None,
        openEntryLeaveConfirm: {
            open: false,
            handler: null,
        },
        setFormCheck: () => null,
        setFormCheckEntry: () => null,
        setActiveForm: () => null,
        setCheckEntries: () => null,
        setGridCheckEntries: () => null,
        setGridCheck: () => null,
        setOverLayOpen: () => null,
        setFormMode: () => null,
        gridChecks: [],
        setGridChecks: jest.fn(),
        addedChecks: [],
        setAddedChecks: jest.fn(),
        gridCheckCount: null,
        setGridCheckCount: jest.fn(),
        selectedGridCheckIndex: null,
        setSelectedGridCheckIndex: jest.fn(),
        selectedGridCheckIndexBackup: -1,
        setSelectedGridCheckIndexBackup: jest.fn(),
        setOpenEntryLeaveConfirm: jest.fn(),
        entryFormActionMode: FormActionModeEnum.None,
        setEntryFormActionMode: jest.fn(),
        selectedEntryIndex: -1,
        setSelectedEntryIndex: jest.fn(),
        initializeCheckEntryForm: jest.fn(),
        formDisabled: false,
        checkSettingOpen: false,
        setCheckSettingOpen: jest.fn(),
        formCheckSetting: null,
        setFormCheckSetting: jest.fn(),
        resetOverLay: jest.fn(),
        autoVoidOpen: false,
        setAutoVoidOpen: jest.fn(),
        employeeEstateInfo: null,
        setEmployeeEstateInfo: jest.fn(),
        checkIssue: null,
        setCheckIssue: jest.fn(),
        checkEntryFormIssue: null,
        setCheckEntryFormIssue: jest.fn(),
        checkFormIssue: null,
        setCheckFormIssue: jest.fn(),
        invalidFields: null,
        setInvalidFields: jest.fn(),
        isFormValid: false,
        setIsFormValid: jest.fn(),
        backEndValidationMessagesById: null,
        backEndValidationMessages: [],
        sortAndSetBackEndValidationMessages: jest.fn(),
        openCheckSetting: jest.fn(),
        isLoadingBundle: false,
        setIsLoadingBundle: jest.fn(),
        gridPayEntryAdjustmentBatchIdBackup: -1,
        setGridPayEntryAdjustmentBatchIdBackup: jest.fn(),
        copyEntryAsync: jest.fn(),
        loadEmployeeDataAsync: jest.fn(),
        gridLoading: false,
        showDeleteConfirm: false,
        setShowDeleteConfirm: jest.fn(),
        deleteChecks: jest.fn(),
        loadChecksAsync: jest.fn(),
        deleteInProgress: false,
        openEntryFormByIndex: jest.fn(),
        openEntryFormByBatchDataId: jest.fn(),
        hasPendingChanges: false,
        initiateAddNewCheck: jest.fn(),
        showCheckHeaderFormEducationBanner: true,
        showCheckEntryFormEducationBanner: true,
    });
