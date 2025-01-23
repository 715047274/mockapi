import {
    EntriesImportMetadataType,
    EntryImportType,
    ImportResolveOptions,
} from '@components/data-entry/entry-importer/ImportHelpers';

export interface IImportEntriesApi {
    uploadEntriesAsync(
        importType: EntryImportType,
        payRunId: number,
        name: string,
        file: File,
        resolutionType: ImportResolveOptions,
        signal?: AbortSignal
    ): Promise<{
        importId?: number;
        errorMessage: string;
        uploadSuccess: boolean;
    }>;
    getEntryImportMetadataAsync(
        payRunId: number,
        signal?: AbortSignal
    ): Promise<EntriesImportMetadataType[]>;
    exportImportErrorsAsync(
        importId: number,
        importType: EntryImportType,
        payRunName: string,
        importName: string
    ): void;
    downloadQuickEntriesTemplate(): void;
    downloadChecksTemplate(cultureCode: string): void;
    downloadAdjustmentsTemplate(): void;
}
