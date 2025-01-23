import { GetUrl } from '@utils/ApiUrlUtils';
import { ModuleEnum } from '@models/enums/ModuleEnum';
import { IExportAdjustmentsApi } from './IExportAdjustmentsApi';
import { IFilter } from '@models/common/FilterTypes';
import { fetchData } from '@api/common/FetchData';

export const ExportAdjustmentsApi: IExportAdjustmentsApi = {
    async getExportAdjustmentsBlobAsync(
        payRunId: number,
        payRunCountryCode: string,
        searchTerm: string,
        filter: IFilter,
        signal?: AbortSignal
    ): Promise<Blob> {
        let module = ModuleEnum.AdjustmentExport;
        if (payRunCountryCode === 'CAN') {
            module = ModuleEnum.AdjustmentExportCan;
        } else if (payRunCountryCode === 'USA') {
            module = ModuleEnum.AdjustmentExportUsa;
        }
        const exportUrl = GetUrl(module);
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
