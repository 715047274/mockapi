import { IFilter } from '@models/common/FilterTypes';

export interface IExportQuickEntriesApi {
    getExportEntriesBlobAsync(
        payRunId: number,
        searchTerm: string,
        filter: IFilter,
        signal?: AbortSignal
    ): Promise<Blob>;
}
