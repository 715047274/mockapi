// Libraries
import { query } from '@api/common/GraphqlUtil';

// APIs, Models
import GetEmployeeTimeEntries from '@api/data-entry/time-data/graphql/GetEmployeeTimeEntries.graphql';
import GetTimeDataCount from '@api/data-entry/time-data/graphql/GetTimeDataCount.graphql';
import GetTimeDataEntries from '@api/data-entry/time-data/graphql/GetTimeDataEntries.graphql';
import { ITimeDataApi } from '@api/data-entry/time-data/ITimeDataApi';
import { LoadDataEntryRequestType } from '@models/data-entry/request/LoadDataEntryRequestType';
import { ModuleEnum } from '@models/enums/ModuleEnum';
import { EmployeeTimeDataModelType } from '@models/time-data/flyout/TimeDataFlyoutGridEntryType';
import { TimeDataModelType } from '@models/time-data/time-data-summary/TimeDataGridEntryType';
import GetTimeDataImportIdentifiers from '@api/data-entry/time-data/graphql/GetTimeDataImportIdentifiers.graphql';
import GetTimeDataSources from '@api/data-entry/time-data/graphql/GetTimeDataSources.graphql';

// Utilities
import { parseApolloQueryResult } from '@utils/ApolloResponseParser';
import {
    TIME_DATA_IMPORT_IDENTIFIER_NO_IDENTIFIER,
    TIME_DATA_SOURCE_NO_SOURCE,
    TIME_DATA_SOURCE_TIMESHEET,
} from '@models/constants/FilterConstants';
import { getLabel, LabelGroup } from '@utils/LocalizationUtils';
import { FilterOptionResponseType } from '@models/common/response/ResponseCommonTypes';

export const TimeDataApi: ITimeDataApi = {
    async getTimeDataAsync(
        variables: LoadDataEntryRequestType,
        abortSignal?: AbortSignal
    ): Promise<TimeDataModelType | null> {
        const response = await query(
            GetTimeDataEntries,
            variables,
            ModuleEnum.TimeData,
            abortSignal
        );
        return parseApolloQueryResult<TimeDataModelType>(response, 'timeData');
    },

    async getTimeDataCountAsync(
        variables: LoadDataEntryRequestType,
        abortSignal?: AbortSignal
    ): Promise<number> {
        const response = await query(
            GetTimeDataCount,
            variables,
            ModuleEnum.TimeData,
            abortSignal
        );
        const count = parseApolloQueryResult<TimeDataModelType>(
            response,
            'timeData'
        );
        return count?.timeData?.totalCount;
    },

    async getTimeDataImportIdentifiersAsync(
        payRunId: number,
        abortSignal?: AbortSignal
    ): Promise<Array<FilterOptionResponseType> | null> {
        const variables = {
            payRunId,
        };
        const response = await query(
            GetTimeDataImportIdentifiers,
            variables,
            ModuleEnum.TimeData,
            abortSignal
        );
        const results = response?.data?.timeDataImportIdentifiers?.map((x) => {
            if (x?.value === TIME_DATA_IMPORT_IDENTIFIER_NO_IDENTIFIER) {
                return {
                    id: x.value,
                    label: getLabel(LabelGroup.Filtering, 'NoIdentifier'),
                };
            }
            return {
                id: x?.value,
                label: x?.value,
            };
        });
        return results ?? [];
    },

    async getTimeDataSourcesAsync(
        payRunId: number,
        abortSignal: AbortSignal
    ): Promise<Array<FilterOptionResponseType> | null> {
        const response = await query(
            GetTimeDataSources,
            { payRunId },
            ModuleEnum.PayRuns,
            abortSignal
        );
        const results = response?.data?.timeDataSources?.map((x) => {
            if (x?.value === TIME_DATA_SOURCE_TIMESHEET) {
                return {
                    id: x.value,
                    label: getLabel(LabelGroup.Filtering, 'Timesheet'),
                };
            }
            if (x?.value === TIME_DATA_SOURCE_NO_SOURCE) {
                return {
                    id: x.value,
                    label: getLabel(LabelGroup.Filtering, 'NoSource'),
                };
            }
            return {
                id: x?.value,
                label: x?.value,
            };
        });
        return results ?? [];
    },

    async getEmployeeTimeEntriesAsync(
        variables: LoadDataEntryRequestType,
        abortSignal?: AbortSignal
    ): Promise<EmployeeTimeDataModelType | null> {
        const response = await query(
            GetEmployeeTimeEntries,
            variables,
            ModuleEnum.TimeData,
            abortSignal
        );
        return parseApolloQueryResult<EmployeeTimeDataModelType>(
            response,
            'timeData'
        );
    },
};
