import { employeeHandlers } from '@mocks/api-handlers/employee-handlers';
import { payRunHandlers } from '@mocks/api-handlers/pay-run-handlers';
import { dataEntryHandlers } from '@mocks/api-handlers/data-entry-handlers';
import { exportImportHandlers } from '@mocks/api-handlers/export-import-handlers';
import { previewHandlers } from '@mocks/api-handlers/preview-handlers';
import { reportHandlers } from '@mocks/api-handlers/report-handlers';
import { miscHandlers } from '@mocks/api-handlers/misc-handlers';
import { earningStatementHandlers } from './api-handlers/earning-statement-handlers';

export const handlers = [
    ...employeeHandlers,
    ...payRunHandlers,
    ...dataEntryHandlers,
    ...exportImportHandlers,
    ...previewHandlers,
    ...reportHandlers,
    ...miscHandlers,
    ...earningStatementHandlers,
];
