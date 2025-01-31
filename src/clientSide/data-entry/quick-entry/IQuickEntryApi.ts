import { ApiResultType } from '@models/common/ApiResultTypes';
import { QuickEntryBaseType } from '@models/quick-entry/quick-entry-summary/QuickEntryBaseType';
import { QuickEntryModelType } from '@models/quick-entry/quick-entry-summary/QuickEntryGridEntryType';
import { CreateQuickEntryRequestType } from '@models/quick-entry/request/CreateQuickEntryRequestType';
import { SearchDocketsRequestType } from '@models/quick-entry/request/SearchDocketsRequestType';
import { SearchProjectsRequestType } from '@models/quick-entry/request/SearchProjectsRequestType';
import {
    LoadDataEntrySimpleRequestType,
    LoadDataEntryRequestType,
} from '@models/data-entry/request/LoadDataEntryRequestType';
import { CreateQuickEntryResponseType } from '@models/quick-entry/response/CreateQuickEntryResponseType';
import { DeleteQuickEntryResultType } from '@models/quick-entry/response/DeleteQuickEntryResultType';
import { SearchDocketsResponseType } from '@models/quick-entry/response/SearchDocketsResponseType';
import { SearchProjectsResponseType } from '@models/quick-entry/response/SearchProjectsResponseType';
import { QuickEntryBundleResponseType } from '@models/quick-entry/response/QuickEntryBundleResponseType';
import {
    QuickEntryImportSetFilterItemsType,
    QuickEntrySavedByFilterItemsType,
} from '@models/quick-entry/response/QuickEntryFilterResponseType';
export interface IQuickEntryApi {
    getQuickEntriesAsync(
        variables: LoadDataEntryRequestType,
        abortSignal?: AbortSignal
    ): Promise<QuickEntryModelType | null>;
    getQuickEntryCountAsync(
        payRunId: number,
        abortSignal?: AbortSignal
    ): Promise<number>;
    getLatestQuickEntriesAsync(
        variables: LoadDataEntryRequestType,
        abortSignal?: AbortSignal
    ): Promise<QuickEntryModelType | null>;
    createQuickEntryAsync(
        variables: CreateQuickEntryRequestType,
        signal?: AbortSignal
    ): Promise<CreateQuickEntryResponseType | null>;
    deleteQuickEntriesAsync(
        variables: QuickEntryBaseType[]
    ): Promise<ApiResultType<DeleteQuickEntryResultType>>;
    getQuickEntryBundle(
        variables: LoadDataEntrySimpleRequestType,
        signal?: AbortSignal
    ): Promise<QuickEntryBundleResponseType | null>;
    searchProjectsAsync(
        variables: SearchProjectsRequestType,
        abortSignal?: AbortSignal
    ): Promise<SearchProjectsResponseType>;
    searchDocketsAsync(
        variables: SearchDocketsRequestType,
        abortSignal?: AbortSignal
    ): Promise<SearchDocketsResponseType>;
    getSavedByFilterOptions(
        payRunId: number,
        abortSignal?: AbortSignal
    ): Promise<ApiResultType<QuickEntrySavedByFilterItemsType[]>>;
    getImportSetFilterOptions(
        payRunId: number,
        abortSignal?: AbortSignal
    ): Promise<ApiResultType<QuickEntryImportSetFilterItemsType[]>>;
}
