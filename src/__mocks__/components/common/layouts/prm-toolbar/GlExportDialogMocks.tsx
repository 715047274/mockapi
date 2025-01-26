import React from 'react';
import * as glExportDialogImport from '@components/common/layouts/prm-toolbar/GlExportDialog';
import * as glExportDialogViewModelImport from '@components/common/layouts/prm-toolbar/GlExportDialogViewModel';

export function mockUseGlExportDialogViewModel(): jest.SpyInstance {
    return jest
        .spyOn(glExportDialogViewModelImport, 'useGlExportDialogViewModel')
        .mockReturnValue({
            payDateRangeStart: null,
            setPayDateRangeStart: () => null,
            payDateRangeEnd: null,
            setPayDateRangeEnd: () => null,
            payGroupOptions: [],
            selectedPayGroups: [],
            handleChangeSelectedPayGroups: () => null,
            handleClearSelectedPayGroups: () => null,
            payPeriodNumber: null,
            setPayPeriodNumber: () => null,
            exportDefOptions: [],
            selectedExportDefs: [],
            handleChangeSelectedExportDefs: () => null,
            handleClearSelectedExportDefs: () => null,
            runExport: () => null,
        });
}

export function mockGlExportDialog(): jest.SpyInstance {
    return jest
        .spyOn(glExportDialogImport, 'GlExportDialog')
        .mockReturnValue(<></>);
}
