import { IFilter } from '@models/common/FilterTypes';

export interface IExportChecksApi {
    getExportChecksBlobAsync(
        payRunId: number,
        payRunCountryCode: string,
        searchTerm: string,
        filter: IFilter,
        signal?: AbortSignal
    ): Promise<Blob>;
}
