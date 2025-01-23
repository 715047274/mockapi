import { IFilter } from '@models/common/FilterTypes';

export interface IExportAdjustmentsApi {
    getExportAdjustmentsBlobAsync(
        payRunId: number,
        payRunCountryCode: string,
        searchTerm: string,
        filter: IFilter,
        signal?: AbortSignal
    ): Promise<Blob>;
}
