import { GetUrl } from '@utils/ApiUrlUtils';
import { ModuleEnum } from '@models/enums/ModuleEnum';
import { query } from '@api/common/GraphqlUtil';
import { fetchData } from '@api/common/FetchData';
import { parseApolloQueryResult } from '@utils/ApolloResponseParser';
import { getLocalIsoString24HrAgo } from '@utils/DateUtils';
import { getLabel, LabelGroup } from '@utils/LocalizationUtils';
import { downloadBlob, downloadFromUrl } from '@utils/DownloadFileUtils';

import { IImportEntriesApi } from './IImportEntriesApi';
import GetEntryImportMetadata from '@api/data-entry/import/graphql/GetEntryImportMetadata.graphql';
import {
    EntriesImportMetadataType,
    getStatusFromImportInfo,
    EntryImportType,
    ImportResolveOptions,
} from '@components/data-entry/entry-importer/ImportHelpers';

export const ImportEntriesApi: IImportEntriesApi = {
    async uploadEntriesAsync(
        importType: EntryImportType,
        payRunId: number,
        name: string,
        importFile: File,
        resolutionType: ImportResolveOptions,
        signal?: AbortSignal
    ): Promise<{
        importId?: number;
        errorMessage: string;
        uploadSuccess: boolean;
    }> {
        let errorMessage;
        let importId;
        let importUrl;
        if (importType === EntryImportType.QuickEntry) {
            importUrl = GetUrl(ModuleEnum.QuickEntryImport);
        } else if (importType === EntryImportType.Check) {
            importUrl = GetUrl(ModuleEnum.CheckImport);
        } else if (importType === EntryImportType.Adjustment) {
            importUrl = GetUrl(ModuleEnum.AdjustmentImport);
        } else {
            return;
        }

        try {
            const formData = new FormData();
            formData.append('uploadedfile', importFile);
            formData.append('uploadType', 'html5');
            const importResponse = await fetchData(importUrl, {
                signal: signal,
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                },
                body: formData,
            });

            if (!importResponse?.ok) {
                errorMessage = getLabel(
                    LabelGroup.Import,
                    'ImportStatusServerError'
                );
                return {
                    errorMessage,
                    uploadSuccess: false,
                };
            }

            const result = await importResponse.json();

            if (!result?.Success) {
                errorMessage = result.ErrorMessage
                    ? getLabel(LabelGroup.Import, 'ImportStatusCustomError', [
                          result.ErrorMessage,
                      ])
                    : getLabel(LabelGroup.Import, 'ImportStatusServerError');
                return {
                    errorMessage,
                    uploadSuccess: false,
                };
            }
            // still queue these two cases - old payroll did (it could just contain warnings)
            if (result.ErrorMessage) {
                errorMessage = result.ErrorMessage;
            }
            if (result.Result?.ErrorMessage) {
                errorMessage = errorMessage ? errorMessage + '\n' : '';
                errorMessage += result.Result.ErrorMessage;
            }

            importId =
                result.Result?.PRPayRunImportTrackId || result.Result?.Id;
        } catch (err) {
            errorMessage = getLabel(
                LabelGroup.Import,
                'ImportStatusServerError'
            );
            return {
                errorMessage,
                uploadSuccess: false,
            };
        }

        errorMessage = await queueImport({
            importType,
            importId,
            importName: name,
            fileName: importFile.name,
            errorAction: resolutionType,
            customParams: '{"PayRunId":' + payRunId + '}',
            errorMessage,
            signal,
        });
        return {
            importId,
            errorMessage: errorMessage
                ? getLabel(LabelGroup.Import, 'ImportStatusCustomError', [
                      errorMessage,
                  ])
                : null,
            uploadSuccess: true,
        };
    },

    async getEntryImportMetadataAsync(
        payRunId: number,
        signal: AbortSignal
    ): Promise<EntriesImportMetadataType[]> {
        const variables = {
            payRunId,
            startTime: getLocalIsoString24HrAgo(),
        };
        try {
            const response = await query(
                GetEntryImportMetadata,
                variables,
                ModuleEnum.QuickEntry,
                signal
            );
            const importMetadata = parseApolloQueryResult<{
                entryImportMetadata: EntriesImportMetadataType[];
            }>(response, 'EntryImportData');

            return importMetadata.entryImportMetadata?.map((importFile) => ({
                ...importFile,
                queuedTimestamp: new Date(importFile.queuedTimestamp),
                status: getStatusFromImportInfo(importFile),
            }));
        } catch (err) {
            return Promise.reject(
                err.message
                    ? err.message
                    : getLabel(LabelGroup.Basic, 'UnknownError')
            );
        }
    },

    async exportImportErrorsAsync(
        importId: number,
        importType: EntryImportType,
        payRunName: string,
        importName: string
    ) {
        const exportImportErrorsUrl = GetUrl(ModuleEnum.ExportImportErrors);
        let importTypeDisplayText: string;
        if (importType === EntryImportType.QuickEntry) {
            importTypeDisplayText = 'Quick Entries';
        } else if (importType === EntryImportType.Check) {
            importTypeDisplayText = 'Checks';
        } else if (importType === EntryImportType.Adjustment) {
            importTypeDisplayText = 'Adjustments';
        } else {
            return;
        }
        const noImportId = importId === null || importId === undefined;
        if (importId < 0 || isNaN(importId) || noImportId) {
            return;
        }

        try {
            const formData = new FormData();
            formData.append(
                'param',
                JSON.stringify({ FetchParams: { ImportJobId: importId } })
            );
            const response = await fetchData(exportImportErrorsUrl, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                },
                body: formData,
            });
            if (!response) {
                throw new Error(
                    'No response received when attempting to export import errors.'
                );
            }
            const fileName =
                getLabel(LabelGroup.Import, 'ImportErrorsFileName', [
                    importTypeDisplayText,
                    payRunName,
                    importName || '',
                ]) + '.csv';
            downloadBlob(fileName, [await response.blob?.()]);
        } catch (err) {
            return Promise.reject(
                err.message
                    ? err.message
                    : getLabel(LabelGroup.Basic, 'UnknownError')
            );
        }
    },

    downloadQuickEntriesTemplate() {
        const downloadUrl = GetUrl(ModuleEnum.QuickEntryDownloadTemplate);
        downloadFromUrl(
            downloadUrl,
            getLabel(LabelGroup.Import, 'DataEntriesImportTemplate') + '.csv'
        );
    },

    downloadChecksTemplate(cultureCode: string) {
        const downloadUrl =
            checkTemplateDownloadUrls[cultureCode] ??
            GetUrl(ModuleEnum.CheckDownloadTemplate);
        downloadFromUrl(
            downloadUrl,
            getLabel(LabelGroup.Import, 'CheckEntriesImportTemplate') + '.csv'
        );
    },

    downloadAdjustmentsTemplate() {
        const downloadUrl = GetUrl(ModuleEnum.AdjustmentDownloadTemplate);
        downloadFromUrl(
            downloadUrl,
            getLabel(LabelGroup.Import, 'AdjustmentEntriesImportTemplate') +
                '.csv'
        );
    },
};

const checkTemplateDownloadUrls = {
    CAN: GetUrl(ModuleEnum.CheckDownloadTemplateCan),
    USA: GetUrl(ModuleEnum.CheckDownloadTemplateUsa),
};

type queueImportArgsType = {
    importType: EntryImportType;
    importId: number;
    importName: string;
    fileName: string;
    errorAction: number;
    customParams: string;
    errorMessage: string;
    signal: AbortSignal;
};
async function queueImport({
    importType,
    importId,
    importName,
    fileName,
    errorAction,
    customParams,
    errorMessage,
    signal,
}: queueImportArgsType): Promise<Response> {
    let queueUrl, source;
    if (importType === EntryImportType.QuickEntry) {
        queueUrl = GetUrl(ModuleEnum.QueueQuickEntryImportJob);
        source = 'Quick Entry';
    } else if (importType === EntryImportType.Check) {
        queueUrl = GetUrl(ModuleEnum.QueueCheckImportJob);
        source = 'Check Entry';
    } else if (importType === EntryImportType.Adjustment) {
        queueUrl = GetUrl(ModuleEnum.QueueAdjustmentImportJob);
        source = 'Adjustment Entry';
    }

    try {
        const queueResponse = await fetchData(queueUrl, {
            signal: signal,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ErrorOccurActionId: errorAction,
                ImportTrackId: importId,
                ImportFileName: fileName,
                ImportSetName: importName,
                CustomImportParameters: customParams,
                Source: source,
                ErrorMessage: errorMessage,
            }),
        });

        if (!queueResponse?.ok) {
            throw new Error(queueResponse?.statusText);
        }

        const queueResponseInfo = await queueResponse.json();
        return queueResponseInfo?.Result?.ErrorMessage;
    } catch (err) {
        return Promise.reject(
            err.message
                ? err.message
                : getLabel(LabelGroup.Basic, 'UnknownError')
        );
    }
}
