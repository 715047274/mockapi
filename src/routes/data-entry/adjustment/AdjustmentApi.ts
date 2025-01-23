import { mutate, query } from '@api/common/GraphqlUtil';

import { ModuleEnum } from '@models/enums/ModuleEnum';
import { FilterModelSearchFields } from '@models/common/FilterTypes';

import { IAdjustmentApi } from './IAdjustmentApi';

import { parseApolloQueryResult } from '@utils/ApolloResponseParser';
import { createPagingParameter } from '@utils/PagingModelUtils';
import {
    createFilterModel,
    getFilterModelsFromGridState,
} from '@utils/FilterModelUtils';
import GetAdjustmentBundle from '@api/data-entry/adjustment/graphql/GetAdjustmentBundle.graphql';
import DeleteAdjustmentGraphql from '@api/data-entry/adjustment/graphql/DeleteAdjustment.graphql';
import UpsertAdjustmentGraphql from '@api/data-entry/adjustment/graphql/UpsertAdjustment.graphql';
import { prmInitialState } from '@components/common/context/page-context/initial-states/prmInitialState';
import { LoadDataEntryRequestType } from '@models/data-entry/request/LoadDataEntryRequestType';
import { AdjustmentModelType } from '@models/adjustment/adjustment-summary/AdjustmentGridEntryType';
import GetAdjustmentCount from '@api/data-entry/adjustment/graphql/GetAdjustmentCount.graphql';
import GetAdjustments from '@api/data-entry/adjustment/graphql/GetAdjustments.graphql';
import GetAdjustmentsSavedBy from '@api/data-entry/adjustment/graphql/GetAdjustmentsSavedBy.graphql';
import { AdjustmentBundleResponseType } from '@models/adjustment/response/AdjustmentBundleResponseType';
import { AdjustmentSavedByFilterResponseType } from '@models/adjustment/response/AdjustmentFilterResponseType';
import { ApiResultType } from '@models/common/ApiResultTypes';
import {
    convertToApiErrorResult,
    convertToApiResult,
} from '@utils/ApiResultUtils';
import { DeleteAdjustmentRequestType } from '@models/adjustment/request/DeleteAdjustmentRequestType';
import { AdjustmentDeleteResultType } from '@models/adjustment/response/DeleteAdjustmentResultType';
import { UpsertAdjustmentRequestType } from '@models/adjustment/request/UpsertAdjustmentRequestType';
import { UpsertAdjustmentResponseType } from '@models/adjustment/response/UpsertAdjustmentResponseType';

export const AdjustmentApi: IAdjustmentApi = {
    async getAdjustmentAsync(
        variables: LoadDataEntryRequestType,
        abortSignal?: AbortSignal
    ): Promise<AdjustmentModelType | null> {
        const response = await query(
            GetAdjustments,
            variables,
            ModuleEnum.Adjustment,
            abortSignal
        );
        const data = parseApolloQueryResult<AdjustmentModelType>(
            response,
            'Adjustments'
        );
        const dataWithEntryGridIds = {
            ...data,
            adjustments: {
                ...data.adjustments,
                items: data.adjustments.items.map((entry) => ({
                    ...entry,
                    gridId: entry.payEntryAdjustmentBatchId.toString(),
                })),
            },
        };
        return dataWithEntryGridIds;
    },

    async getAdjustmentCountAsync(
        payRunId,
        abortSignal?: AbortSignal
    ): Promise<number> {
        const filters = getFilterModelsFromGridState(
            prmInitialState.adjustment
        );

        filters.push(
            createFilterModel(
                FilterModelSearchFields.DataEntry_SearchParameter_PayRunId,
                payRunId
            )
        );

        const variables = {
            pagingParams: createPagingParameter(0, 0),
            filters,
        };

        const response = await query(
            GetAdjustmentCount,
            variables,
            ModuleEnum.Adjustment,
            abortSignal
        );
        const count = parseApolloQueryResult<AdjustmentModelType>(
            response,
            'Adjustments'
        );
        return count?.adjustments?.totalCount;
    },

    async getAdjustmentBundle(
        variables: LoadDataEntryRequestType,
        signal?: AbortSignal
    ): Promise<AdjustmentBundleResponseType | null> {
        const response = await query(
            GetAdjustmentBundle,
            variables,
            ModuleEnum.Adjustment,
            signal
        );
        const bundle = response?.data as AdjustmentBundleResponseType;
        return bundle;
    },

    async getSavedByFilterOptions(
        payRunId: number,
        abortSignal?: AbortSignal
    ): Promise<ApiResultType<AdjustmentSavedByFilterResponseType>> {
        const variables = {
            payRunId: payRunId,
        };
        const response = await query(
            GetAdjustmentsSavedBy,
            variables,
            ModuleEnum.Adjustment,
            abortSignal
        ).catch((error) => {
            return convertToApiErrorResult({ error });
        });
        return convertToApiResult(response, 'adjustmentsSavedBy');
    },

    async deleteAdjustmentsAsync(
        payRunId: number,
        payEntryAdjustmentBatchIds?: number[],
        signal?: AbortSignal
    ): Promise<ApiResultType<AdjustmentDeleteResultType>> {
        const deleteAdjustmentRequest: DeleteAdjustmentRequestType = {
            payRunId,
            payEntryAdjustmentBatchIds,
        };
        const response = await mutate(
            DeleteAdjustmentGraphql,
            {
                deleteAdjustments: deleteAdjustmentRequest,
            },
            ModuleEnum.AdjustmentMutation,
            signal
        ).catch((error) => convertToApiErrorResult({ error }));

        const result = convertToApiResult(
            response,
            'deleteAdjustment'
        ) as ApiResultType<AdjustmentDeleteResultType>;

        result?.data?.deletedAdjustments?.forEach(
            (adjustment) =>
                (adjustment.gridId =
                    adjustment.payEntryAdjustmentBatchId.toString())
        );
        return result;
    },

    async upsertAdjustmentsAsync(
        variables: UpsertAdjustmentRequestType,
        signal?: AbortSignal
    ): Promise<ApiResultType<UpsertAdjustmentResponseType> | null> {
        const response = await mutate(
            UpsertAdjustmentGraphql,
            variables,
            ModuleEnum.AdjustmentMutation,
            signal
        );

        return response as ApiResultType<UpsertAdjustmentResponseType>;
    },
};
