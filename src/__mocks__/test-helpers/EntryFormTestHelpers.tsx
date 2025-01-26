import { GlobalizationProvider } from '@ceridianhcm/react-core';
import { render } from '@testing-library/react';
import React from 'react';
import { QuickEntryFormFlyout } from '@components/data-entry/quick-entry/flyout/QuickEntryFormFlyout';
import { QuickEntryDetailType } from '@models/quick-entry/quick-entry-summary/QuickEntryDetailType';
import { defaultGlobalizationParams } from '@utils/LocalizationUtils';
import { createDivForFlyoutPortal } from '@mocks/test-helpers/FlyoutHelpers';
import { getQuickEntryBundle } from '@mocks/api/data-entry/quick-entry/quick-entry-provider';
import { createNewQuickEntryDetailTypeModel } from '@models/quick-entry/QuickEntryModelUtil';
import { mockPayRun } from '@mocks/contexts/PayRunContextMocking';
import { CodeTypeEnum } from '@models/enums/CodeTypeEnum';
import * as useQuickEntryFormFlyoutViewModelImport from '@components/data-entry/quick-entry/flyout/useQuickEntryFormFlyoutViewModel';
import { FilterModelSearchFields } from '@models/common/FilterTypes';
import { createFilterModel } from '@utils/FilterModelUtils';
import { QuickEntryFormFieldsMetaDataContextProvider } from '@components/common/context/QuickEntryFormFieldsMetaDataContext';

const originalUseQuickEntryFormFlyoutViewModel =
    useQuickEntryFormFlyoutViewModelImport.useQuickEntryFormFlyoutViewModel;

function useEntryForUnitTest(entry: QuickEntryDetailType): void {
    jest.spyOn(
        useQuickEntryFormFlyoutViewModelImport,
        'useQuickEntryFormFlyoutViewModel'
    ).mockImplementation((...args) => {
        // set the last possible arg to: entry
        args[
            originalUseQuickEntryFormFlyoutViewModel.length - 1
        ].unitTestEntry = entry;
        return originalUseQuickEntryFormFlyoutViewModel(...args);
    });
}

export function renderQuickEntryFormFlyout(
    asEdit?: boolean,
    spies?: {
        setQuickEntriesSpy?: jest.Mock<any, any>;
        setAddedEntriesSpy?: jest.Mock<any, any>;
        setGridEntryCountSpy?: jest.Mock<any, any>;
    },
    entry?: QuickEntryDetailType
): ReturnType<typeof render> {
    if (entry === undefined) {
        // allow null to actually specify a null value
        if (asEdit) {
            const filters = [
                createFilterModel(
                    FilterModelSearchFields.DataEntry_SearchParameter_PRPayEntryBatchDataId,
                    3
                ),
            ];
            entry = getQuickEntryBundle({
                variables: {
                    filters,
                },
            }).quickEntryBundle;
        } else {
            entry = {
                ...createNewQuickEntryDetailTypeModel(mockPayRun),
                employeeId: 2,
                amount: 124,
                rate: 62,
                unit: 2,
                codeId: '1-2',
                codeTypeId: CodeTypeEnum.Earning,
                legalEntityId: 2,
                orgUnitId: 2,
                deptJobId: 2,
                payRunDefId: 3,
            };
        }
    }
    useEntryForUnitTest(entry);
    createDivForFlyoutPortal();
    return render(
        <GlobalizationProvider {...defaultGlobalizationParams}>
            <QuickEntryFormFieldsMetaDataContextProvider>
                <QuickEntryFormFlyout
                    isLast={false}
                    entryIndex={asEdit ? 3 : undefined}
                    setEntryIndex={() => null}
                    isOpen={true}
                    closeFlyout={() => null}
                    reloading={false}
                    setReloading={() => null}
                    setGridQuickEntries={
                        spies?.setQuickEntriesSpy ?? (() => null)
                    }
                    setAddedEntries={spies?.setAddedEntriesSpy ?? (() => null)}
                    setGridEntryCount={
                        spies?.setGridEntryCountSpy ?? (() => null)
                    }
                    copyEntry={() => null}
                    deleteEntry={() => null}
                    disableDelete={false}
                    loadingBundle={false}
                    setLoadingBundle={jest.fn()}
                    entryFlyoutCursorBackup={-1}
                    setEntryFlyoutCursorBackup={jest.fn()}
                    gridIdForCopyBackup={null}
                    setGridIdForCopyBackup={jest.fn()}
                />
            </QuickEntryFormFieldsMetaDataContextProvider>
        </GlobalizationProvider>
    );
}
