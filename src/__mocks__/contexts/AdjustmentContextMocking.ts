import {
    makeOverridableObjectFactory,
    DeepPartial,
} from '@mocks/makeOverridableObjectFactory';
import * as adjustmentContextImport from '@components/common/context/AdjustmentContext';
import { AdjustmentEntryDetailType } from '@models/adjustment/AdjustmentEntryDetailType';
import { FormActionModeEnum } from '@models/enums/FormModeEnum';

export function mockAdjustmentContext(
    overrides?: DeepPartial<adjustmentContextImport.IAdjustmentContextValue>
): void {
    jest.spyOn(adjustmentContextImport, 'useAdjustmentContext').mockReturnValue(
        getAdjustmentContextMockedReturn(overrides)
    );
}

export const getAdjustmentContextMockedReturn =
    makeOverridableObjectFactory<adjustmentContextImport.IAdjustmentContextValue>(
        {
            gridAdjustment: {} as AdjustmentEntryDetailType,
            setGridAdjustment: () => null,
            formAdjustment: null,
            setFormAdjustment: () => null,
            formAdjustmentEntry: null,
            setFormAdjustmentEntry: () => null,
            adjustmentEntries: [],
            setAdjustmentEntries: () => null,
            activeForm: undefined,
            setActiveForm: () => null,
            gridAdjustmentEntries: [],
            setGridAdjustmentEntries: () => null,
            overLayOpen: false,
            setOverLayOpen: () => null,
            formMode: undefined,
            setFormMode: () => null,
            openEntryLeaveConfirm: {
                open: false,
                handler: null,
            },
            gridAdjustments: [],
            setGridAdjustments: jest.fn(),
            addedAdjustments: [],
            setAddedAdjustments: jest.fn(),
            gridAdjustmentCount: null,
            setGridAdjustmentCount: jest.fn(),
            selectedGridAdjustmentIndex: null,
            setSelectedGridAdjustmentIndex: jest.fn(),
            entryFlyoutCursor: null,
            setEntryFlyoutCursor: jest.fn(),
            setOpenEntryLeaveConfirm: jest.fn(),
            initializeAdjustmentEntryForm: jest.fn(),
            formDisabled: false,
            filterOptionDispatch: jest.fn(),
            entryFormActionMode: FormActionModeEnum.None,
            setEntryFormActionMode: jest.fn(),
            adjustmentSettingOpen: false,
            setAdjustmentSettingOpen: jest.fn(),
            formAdjustmentSetting: null,
            setFormAdjustmentSetting: jest.fn(),
            selectedEntryIndex: -1,
            setSelectedEntryIndex: jest.fn(),
            resetOverLay: jest.fn(),
            adjustmentIssue: null,
            setAdjustmentIssue: jest.fn(),
            adjustmentFormIssue: null,
            setAdjustmentFormIssue: jest.fn(),
            adjustmentBackEndValidationMessages: null,
            setAdjustmentBackEndValidationMessages: jest.fn(),
            adjustmentBackEndValidationMessagesById: null,
            setAdjustmentBackEndValidationMessagesById: jest.fn(),
            adjustmentIssuesBannerDataMessages: null,
            setAdjustmentIssuesBannerDataMessages: jest.fn(),
            isLoadingBundle: false,
            setIsLoadingBundle: jest.fn(),
            selectedGridAdjustmentIndexBackup: -1,
            setSelectedGridAdjustmentIndexBackup: jest.fn(),
            gridPayEntryAdjustmentBatchIdBackup: -1,
            setGridPayEntryAdjustmentBatchIdBackup: jest.fn(),
            copyEntryAsync: jest.fn(),
            loadEmployeeDataAsync: jest.fn(),
            showAdjustmentEntryFormEducationBanner: true,
            showAdjustmentHeaderFormEducationBanner: true,
        }
    );
