import {
    GetPayRunIssuesRequestType,
    IssueTextByGridEntryMapType,
    PayRunIssuesCountType,
    PayRunIssuesSummaryType,
    PayRunIssueType,
} from '@models/pay-run';
import { ObjectWithQuickEntryIdType } from '@models/quick-entry/quick-entry-summary/QuickEntryBaseType';
import {
    ApiPaginResultType,
    ApiResultType,
} from '@models/common/ApiResultTypes';
import { IPayRunIssuesApi } from '@api/pay-run';
import {
    convertToApiErrorResult,
    convertToApiPaginResult,
    convertToApiResult,
} from '@utils/ApiResultUtils';
import { query } from '@api/common/GraphqlUtil';
import { ModuleEnum } from '@models/enums/ModuleEnum';
import GetPayRunIssuesCount from './graphql/GetPayRunIssuesCount.graphql';
import GetPayRunIssuesSummary from './graphql/GetPayRunIssuesSummary.graphql';
import GetPayRunIssues from './graphql/GetPayRunIssues.graphql';
import GetEntryIssues from './graphql/GetEntryIssues.graphql';
import GetDataEntryIssuesBannerGridData from './graphql/GetDataEntryIssuesBannerGridData.graphql';
import GetPayRunMessageTypes from './graphql/GetPayRunMessageTypes.graphql';
import { getQuickEntryGridId } from '@components/data-entry/quick-entry/grid/quickEntryGridUtils';
import { getLabel, LabelGroup } from '@utils/LocalizationUtils';
import { LoadDataEntryRequestType } from '@models/data-entry/request/LoadDataEntryRequestType';
import { DataEntryIssuesBannerGridData } from '@models/data-entry/DataEntryIssuesBannerData';
import {
    FilterTypeEnum,
    UserSelectionActionsEnum,
} from '@models/constants/FilterConstants';
import { filterOptionPayLoad } from '@components/common/context/page-context/FilterOptionReducer';
import { PayrollValidationMessage } from '@models/common/PayrollValidationMessage';

export const PayRunIssuesApi: IPayRunIssuesApi = {
    async getPayRunIssuesCountAsync(
        payRunIds: number[]
    ): Promise<ApiPaginResultType<PayRunIssuesCountType[]>> {
        const variables = { payRunIds };
        const response = await query(
            GetPayRunIssuesCount,
            variables,
            ModuleEnum.PayRuns
        ).catch((error) => {
            return convertToApiErrorResult({ error });
        });
        return convertToApiResult(response, 'payRunIssuesCount');
    },

    async getPayRunIssuesAsync(
        {
            filters,
            payRunId,
            issueType,
            skip,
            take,
        }: GetPayRunIssuesRequestType,
        signal: AbortSignal
    ): Promise<ApiPaginResultType<PayRunIssueType> | null> {
        const variables = {
            payRunId,
            issueType,
            skip,
            take,
            ...(filters.length > 0 && { filters }),
        };
        const response = await query(
            GetPayRunIssues,
            variables,
            ModuleEnum.PayRunIssues,
            signal
        ).catch((error) => {
            return convertToApiErrorResult({ error });
        });

        return convertToApiPaginResult(response, 'payRunIssues');
    },

    async getPayRunIssuesSummaryAsync(
        payRunId: number,
        signal: AbortSignal,
        isPolling = false
    ): Promise<ApiPaginResultType<PayRunIssuesSummaryType[]>> {
        const variables = { payRunId };
        const response = await query(
            GetPayRunIssuesSummary,
            variables,
            ModuleEnum.PayRuns,
            signal,
            isPolling
        ).catch((error) => {
            return convertToApiErrorResult({ error });
        });
        return convertToApiResult(response, 'payRunIssuesSummary');
    },

    async getDataEntryIssuesBannerGridDataAsync(
        variables: LoadDataEntryRequestType,
        signal: AbortSignal
    ): Promise<ApiResultType<DataEntryIssuesBannerGridData>> {
        const response = await query(
            GetDataEntryIssuesBannerGridData,
            variables,
            ModuleEnum.PayRuns,
            signal
        ).catch((error) => {
            return convertToApiErrorResult({ error });
        });
        return convertToApiResult(response, 'dataEntryIssuesBannerGridData');
    },

    async getEntryIssuesAsync(
        payRunId: number,
        payEntryBatchDataIds: number[],
        payEntryBatchDataStageIds: number[],
        signal: AbortSignal
    ): Promise<IssueTextByGridEntryMapType> {
        const filters = [
            {
                field: 'PRPayEntryBatchDataId',
                operation: 0,
                parameterValue: {
                    value: payEntryBatchDataIds,
                },
            },
            {
                field: 'PRPayEntryBatchDataStageId',
                operation: 0,
                parameterValue: {
                    value: payEntryBatchDataStageIds,
                },
            },
            {
                field: 'PayRunId',
                operation: 0,
                parameterValue: {
                    value: payRunId,
                },
            },
            {
                field: 'IssueType',
                operation: 0,
                parameterValue: {
                    value: 4,
                },
            },
        ];

        const response = await query(
            GetEntryIssues,
            {
                filters,
            },
            ModuleEnum.PayRuns,
            signal
        ).catch((error) => {
            return convertToApiErrorResult({ error });
        });
        const result = convertToApiResult<PayrollValidationMessage[]>(
            response,
            'entryIssues'
        );
        if (!result?.data) {
            return Promise.resolve(null);
        }

        const issuesByEntry = {};
        result.data.forEach((issue) => {
            addIssueToIssuesByEntryMap(issuesByEntry, issue);
        });
        return issuesByEntry;
    },
};

export function addIssueToIssuesByEntryMap(
    map: IssueTextByGridEntryMapType,
    issue: PayrollValidationMessage
): void {
    if (!issue.payEntryBatchDataId && !issue.payEntryBatchDataStageId) {
        return;
    }
    const gridId = getQuickEntryGridId(issue as ObjectWithQuickEntryIdType);
    if (map[gridId]) {
        map[gridId] = {
            errorCount: map[gridId].errorCount + 1,
            errorText: '',
            errorTitle: '',
        };
    } else {
        map[gridId] = {
            errorCount: 1,
            //call getLabel from the localizer itself since the label is from the monolith
            errorText: getLabel(
                LabelGroup.IssueMessages,
                issue.messageLabel,
                issue.messageParams,
                true
            ),
            errorTitle: issue.messageTitle,
        };
    }
}

export async function updatePayRunFilterOptionsAsync(
    filterOptionDispatch: React.Dispatch<{
        type: UserSelectionActionsEnum;
        payload: filterOptionPayLoad;
    }>,
    availableTypes: FilterTypeEnum[],
    abortSignal?: AbortSignal,
    payRunId?: number
): Promise<void> {
    if (
        availableTypes.includes(FilterTypeEnum.PAYRUN_MSGTYPE_SOURCE) &&
        !abortSignal?.aborted
    ) {
        const returnDistinctShortName = true;

        try {
            const getPRMessageTypes = await query(
                GetPayRunMessageTypes,
                { payRunId, returnDistinctShortName },
                ModuleEnum.PayRuns,
                abortSignal
            );
            const result = convertToApiResult(
                getPRMessageTypes,
                'payRunMessageTypes'
            );
            if (!abortSignal?.aborted) {
                const data = Array.isArray(result?.data) ? result.data : [];
                const items = data.map((item) => ({
                    id: item.messageTypeId,
                    title: item.shortName,
                    value: item.shortName,
                }));

                filterOptionDispatch({
                    type: UserSelectionActionsEnum.UPDATE_FILTER_OPTIONS,
                    payload: {
                        filterType: FilterTypeEnum.PAYRUN_MSGTYPE_SOURCE,
                        items: items,
                    },
                });
            }
        } catch (error) {
            convertToApiErrorResult({ error });
        }
    }
}
