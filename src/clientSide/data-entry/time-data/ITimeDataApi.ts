// Models
import { FilterOptionResponseType } from '@models/common/response/ResponseCommonTypes';
import { LoadDataEntryRequestType } from '@models/data-entry/request/LoadDataEntryRequestType';
import { EmployeeTimeDataModelType } from '@models/time-data/flyout/TimeDataFlyoutGridEntryType';
import { TimeDataModelType } from '@models/time-data/time-data-summary/TimeDataGridEntryType';

export interface ITimeDataApi {
    getTimeDataAsync(
        variables: LoadDataEntryRequestType,
        abortSignal?: AbortSignal
    ): Promise<TimeDataModelType | null>;

    getTimeDataCountAsync(
        variables: LoadDataEntryRequestType,
        abortSignal?: AbortSignal
    ): Promise<number>;

    getTimeDataImportIdentifiersAsync(
        payRunId: number,
        abortSignal?: AbortSignal
    ): Promise<Array<FilterOptionResponseType> | null>;

    getTimeDataSourcesAsync(
        payRunId: number,
        abortSignal?: AbortSignal
    ): Promise<Array<FilterOptionResponseType> | null>;

    getEmployeeTimeEntriesAsync(
        variables: LoadDataEntryRequestType,
        abortSignal?: AbortSignal
    ): Promise<EmployeeTimeDataModelType | null>;
}
