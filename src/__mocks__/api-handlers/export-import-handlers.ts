import { rest, graphql } from 'msw';
import { ModuleEnum } from '@models/enums/ModuleEnum';
import {
    mockGetEntryImportMetadataAsyncReturn,
    //mockGetEntryImportMetadataAsyncReturnActive,
} from '@mocks/api/data-entry/import/import-entries';
import { GetUrl } from '@utils/ApiUrlUtils';
import { getEndpoint } from '@mocks/api-handlers/handler-utils';

const payRunGraphql = graphql.link(getEndpoint(ModuleEnum.PayRuns));

export const exportImportHandlers = [
    //#region export entry
    rest.post(GetUrl(ModuleEnum.QuickEntryExport), (req, res) => {
        return res();
    }),

    rest.post(GetUrl(ModuleEnum.CheckExport), (req, res) => {
        return res();
    }),
    //#endregion export entry

    //#region import entry
    rest.post(GetUrl(ModuleEnum.QuickEntryImport), (req, res, ctx) => {
        return res(ctx.json({ Result: { Id: 123 } }));
    }),
    rest.post(GetUrl(ModuleEnum.QueueQuickEntryImportJob), (req, res) => {
        return res();
    }),
    rest.post(GetUrl(ModuleEnum.CheckImport), (req, res, ctx) => {
        return res(ctx.json({ Result: { Id: 321 } }));
    }),
    rest.post(GetUrl(ModuleEnum.QueueCheckImportJob), (req, res) => {
        return res();
    }),
    rest.post(GetUrl(ModuleEnum.AdjustmentImport), (req, res, ctx) => {
        return res(ctx.json({ Result: { Id: 321 } }));
    }),
    rest.post(GetUrl(ModuleEnum.QueueAdjustmentImportJob), (req, res) => {
        return res();
    }),
    rest.post(GetUrl(ModuleEnum.QuickEntryDownloadTemplate), (req, res) => {
        return res();
    }),
    rest.post(GetUrl(ModuleEnum.CheckDownloadTemplate), (req, res) => {
        return res();
    }),
    rest.post(GetUrl(ModuleEnum.CheckDownloadTemplateCan), (req, res) => {
        return res();
    }),
    rest.post(GetUrl(ModuleEnum.CheckDownloadTemplateUsa), (req, res) => {
        return res();
    }),
    rest.post(GetUrl(ModuleEnum.AdjustmentDownloadTemplate), (req, res) => {
        return res();
    }),
    payRunGraphql.query('getEntryImportMetadata', (req, res, ctx) => {
        return res(
            ctx.data({
                entryImportMetadata: mockGetEntryImportMetadataAsyncReturn,
                //entryImportMetadata: mockGetEntryImportMetadataAsyncReturnActive,
            })
        );
    }),
    //#endregion import entry
];
