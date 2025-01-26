import {
    getStatusFromImportInfo /*ImportStatus*/,
} from '@components/data-entry/entry-importer/ImportHelpers';

let mockKey = 1;

export const mockGetEntryImportMetadataAsyncReturn = [
    {
        //QuickEntrySuccess
        importId: 3,
        importFileName: 'import-ein.csv',
        importType: 'QuickEntry',
        queuedTimestamp: new Date(Date.now() - 3).toISOString(),
        jobStatus: 1,
        successfulEntries: 200,
        erroredEntries: 0,
        errorOccurActionId: 2,
        importSetName: 'ein',
    },
    {
        //CheckSuccess
        importId: 4,
        importFileName: 'import-zwei.csv',
        importType: 'Check',
        queuedTimestamp: new Date(Date.now() - 3).toISOString(),
        jobStatus: 1,
        successfulEntries: 210,
        erroredEntries: 0,
        errorOccurActionId: 2,
        importSetName: 'zwei',
    },
    {
        //AdjustmentSuccess
        importId: 5,
        importFileName: 'import-wahid.csv',
        importType: 'Adjustment',
        queuedTimestamp: new Date(Date.now() - 3).toISOString(),
        jobStatus: 1,
        successfulEntries: 210,
        erroredEntries: 0,
        errorOccurActionId: 2,
        importSetName: 'wahid',
    },
    {
        //QuickEntryAllowedValid
        importId: 6,
        importFileName: 'import-yi.csv',
        importType: 'QuickEntry',
        queuedTimestamp: new Date(Date.now() - 4).toISOString(),
        jobStatus: 1,
        successfulEntries: 2345,
        erroredEntries: 434,
        errorOccurActionId: 2,
        importSetName: 'yi',
    },
    {
        //CheckAllowedValid
        importId: 7,
        importFileName: 'import-satu.csv',
        importType: 'Check',
        queuedTimestamp: new Date(Date.now() - 4).toISOString(),
        jobStatus: 1,
        successfulEntries: 1234,
        erroredEntries: 404,
        errorOccurActionId: 2,
        importSetName: 'satu',
    },
    {
        //AdjustmentAllowedValid
        importId: 8,
        importFileName: 'import-huk.csv',
        importType: 'Adjustment',
        queuedTimestamp: new Date(Date.now() - 4).toISOString(),
        jobStatus: 1,
        successfulEntries: 1234,
        erroredEntries: 404,
        errorOccurActionId: 2,
        importSetName: 'huk',
    },
    {
        //QuickEntryDeniedAll
        importId: 9,
        importFileName: 'import-uno.csv',
        importType: 'QuickEntry',
        queuedTimestamp: new Date(Date.now() - 5).toISOString(),
        jobStatus: 1,
        successfulEntries: 0,
        erroredEntries: 500,
        errorOccurActionId: 1,
        importSetName: 'uno',
    },
    {
        //CheckDeniedAll
        importId: 10,
        importFileName: 'import-er.csv',
        importType: 'Check',
        queuedTimestamp: new Date(Date.now() - 5).toISOString(),
        jobStatus: 1,
        successfulEntries: 0,
        erroredEntries: 500,
        errorOccurActionId: 1,
        importSetName: 'er',
    },
    {
        //AdjustmentDeniedAll
        importId: 11,
        importFileName: 'import-dos.csv',
        importType: 'Adjustment',
        queuedTimestamp: new Date(Date.now() - 5).toISOString(),
        jobStatus: 1,
        successfulEntries: 0,
        erroredEntries: 500,
        errorOccurActionId: 1,
        importSetName: 'dos',
    },
    {
        //ServerError
        importId: 12,
        importFileName: 'import-ichi.csv',
        importType: 'Adjustment',
        queuedTimestamp: new Date(Date.now() - 6).toISOString(),
        jobStatus: 3,
        successfulEntries: 0,
        erroredEntries: 0,
        errorOccurActionId: 2,
        importSetName: 'ichi',
    },
    {
        //Cancelled
        importId: 13,
        importFileName: 'import-ek.csv',
        importType: 'QuickEntry',
        queuedTimestamp: new Date(Date.now() - 7).toISOString(),
        jobStatus: 6,
        successfulEntries: 0,
        erroredEntries: 0,
        errorOccurActionId: 2,
        importSetName: 'ek',
    },
];
export const mockGetEntryImportMetadataAsyncReturnActive = [
    {
        //Queued
        importId: 1,
        importFileName: 'import-jedna.csv',
        importType: 'Check',
        queuedTimestamp: new Date(Date.now() - 1).toISOString(),
        jobStatus: 2,
        successfulEntries: 0,
        erroredEntries: 0,
        fileSize: 13000,
        errorOccurActionId: 2,
        importSetName: 'jedna',
    },
    {
        //Importing
        importId: 2,
        importFileName: 'import-un.csv',
        importType: 'Adjustment',
        queuedTimestamp: new Date(Date.now() - 2).toISOString(),
        jobStatus: 4,
        successfulEntries: 0,
        erroredEntries: 0,
        errorOccurActionId: 2,
        importSetName: 'un',
    },
    ...mockGetEntryImportMetadataAsyncReturn,
];

//const clientSideErrorImports = [
//    {
//        fileName: 'import-satu.csv',
//        status: ImportStatus.TooLarge,
//    },
//    {
//        fileName: 'import-deux.xls',
//        status: ImportStatus.WrongType,
//    },
//    {
//        fileName: 'import-san.xls',
//        status: ImportStatus.FailedScan,
//    },
//];

export const mockImports = mapToUIType(mockGetEntryImportMetadataAsyncReturn);
export const mockImportsActive = mapToUIType(
    mockGetEntryImportMetadataAsyncReturnActive
);

function mapToUIType(apiReturn: any[]) {
    return apiReturn.map((rawImport) => ({
        ...rawImport,
        queuedTimestamp: new Date(rawImport.queuedTimestamp),
        status: getStatusFromImportInfo(rawImport),
        key: mockKey++,
    }));
}
