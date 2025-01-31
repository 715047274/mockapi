import { IFilter } from '@models/common/FilterTypes';

export interface IExportTimeDataApi {
    getExportTimeDataBlobAsync(
        payRunId: number,
        searchTerm: string,
        filter: IFilter,
        signal?: AbortSignal
    ): Promise<Blob>;
}
