import {
    makeOverridableObjectFactory,
    DeepPartial,
} from '@mocks/makeOverridableObjectFactory';
import * as prmContextImport from '@components/common/context/page-context/PRMContext';
import { IPRMContextValue } from '@models/user-selection-context';
import {
    previewFilterInitialState,
    prmInitialState,
} from '@components/common/context/page-context/initial-states';
import { DataEntryTabIdsEnum } from '@components/common/context/page-context/DataEntryInteraction';
import { makeMockPayRunAvailableFeaturesObject } from '@mocks/api/feature-control/feature-control-provider';

export function mockPrmContext(
    overrides?: DeepPartial<IPRMContextValue>
): IPRMContextValue {
    const returnValue = getPRMContextMockedReturn(overrides);
    jest.spyOn(prmContextImport, 'usePRMContext').mockReturnValue(returnValue);
    return returnValue;
}

export const prmContextMockedValue: IPRMContextValue = {
    previewFilterState: previewFilterInitialState,
    state: prmInitialState,
    dispatch: jest.fn(),
    dispatchPreviewFilter: jest.fn(),
    employeeFlyoutSubcontext: {
        employeeId: 4,
        setEmployeeId: jest.fn(),
        isOpen: false,
        closeEmployeeFlyout: jest.fn(),
        openEmployeeFlyout: jest.fn(),
        selectedTabId: null,
        onSelectedTabChange: jest.fn(),
        legalEntityFilterValue: [],
        setLegalEntityFilterValue: jest.fn(),
        checkFilterValues: null,
        setCheckFilterValues: jest.fn(),
        resetFilterValues: jest.fn(),
    },
    wageTaxAdjustmentFlyoutSubcontext: {
        isWageTaxAdjustmentFlyoutOpen: false,
        openWageTaxAdjustmentFlyout: jest.fn(),
        closeWageTaxAdjustmentFlyout: jest.fn(),
        wageTaxIssue: null,
        setWageTaxIssue: jest.fn(),
    },
    previewSubcontext: {
        selectedCode: { codeTypeId: 1, codeId: 1 },
        setSelectedCode: jest.fn(),
        selectedPaymentItem: { itemType: 1, legalEntityId: 1 },
        setSelectedPaymentItem: jest.fn(),
        prevPayRunEmployees: [1],
        setPrevPayRunEmployees: jest.fn(),
    },
    customViewContext: {
        customViewDataCtxt: {},
        setCustomViewDataCtxt: jest.fn(),
    },
    wageTaxAdjustmentOverlaySubcontext: {
        isWageTaxAdjustmentOverlayOpen: false,
        setIsWageTaxAdjustmentOverlayOpen: jest.fn(),
        currentEmployeeIssue: null,
        setCurrentEmployeeIssue: jest.fn(),
        isBulkAdjustment: false,
        setIsBulkAdjustment: jest.fn(),
    },
    dataEntryInteraction: {
        entryFormCommunicator: null,
        setEntryFormCommunicator: jest.fn(),
        activeTabId: DataEntryTabIdsEnum.QuickEntries,
        setActiveTabId: jest.fn(),
        setToDefaultTab: jest.fn(),
        shownTabs: [
            DataEntryTabIdsEnum.QuickEntries,
            DataEntryTabIdsEnum.TimeData,
            DataEntryTabIdsEnum.Checks,
            DataEntryTabIdsEnum.Adjustments,
        ],
    },
    payRunAvailableFeatures: makeMockPayRunAvailableFeaturesObject(),
    activeTabs: { reports: null },
    setSelectedTab: jest.fn(),
};

export const getPRMContextMockedReturn = makeOverridableObjectFactory(
    prmContextMockedValue
);
