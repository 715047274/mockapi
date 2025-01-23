import { GetUrl } from '@utils/ApiUrlUtils';
import { ModuleEnum } from '@models/enums/ModuleEnum';
import { IExportTimeDataApi } from './IExportTimeDataApi';
import { IFilter } from '@models/common/FilterTypes';
import { fetchData } from '@api/common/FetchData';

export const ExportTimeDataApi: IExportTimeDataApi = {
    async getExportTimeDataBlobAsync(
        payRunId: number,
        searchTerm: string,
        filter: IFilter,
        signal?: AbortSignal
    ): Promise<Blob> {
        const exportUrl = GetUrl(ModuleEnum.TimeDataExport);
        try {
            const response = await fetchData(exportUrl, {
                signal,
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    payRunId,
                    searchTerm,
                    filter,
                }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const blob = await response.blob();

            return blob;
        } catch {
            throw new Error('Error downloading file:');
        }
    },
};
