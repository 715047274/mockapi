import { mutate, query } from '@api/common/GraphqlUtil';
import { CheckModelType } from '@models/check/check-summary/CheckGridEntryType';
import { ModuleEnum } from '@models/enums/ModuleEnum';
import { LoadDataEntryRequestType } from '@models/data-entry/request/LoadDataEntryRequestType';
import { ICheckApi } from './ICheckApi';
import { UpsertCheckRequestType } from '@models/check/request/UpsertCheckRequestType';
import { UpsertCheckResponseType } from '@models/check/response/UpsertCheckResponseType';
import { GetPayEntryAdjustmentBatchPropertyDataResponseType } from '@models/check/response/PayEntryAdjustmentBatchPropertyDataResponseType';
import { ContactInformationTypeResponseType } from '@models/check/response/ContactInformationTypeResponseType';
import { GetIncomeTaxCalcMethodsTypeResponseType } from '@models/check/response/IncomeTaxCalcMethodResponseType';

import { ApiResultType } from '@models/common/ApiResultTypes';
import { convertToApiResult } from '@utils/ApiResultUtils';
import { prmInitialState } from '@components/common/context/page-context/initial-states/prmInitialState';

import GetChecks from '@api/data-entry/check/graphql/GetChecks.graphql';
import GetCheckCount from '@api/data-entry/check/graphql/GetCheckCount.graphql';
import UpsertCheck from '@api/data-entry/check/graphql/UpsertCheck.graphql';
import DeleteCheck from '@api/data-entry/check/graphql/DeleteCheck.graphql';
import GetCheckBundle from '@api/data-entry/check/graphql/GetCheckBundle.graphql';
import GetPayEntryAdjustmentBatchPropertyData from '@api/data-entry/check/graphql/GetPayEntryAdjustmentBatchPropertyData.graphql';
import GetContactInformationType from '@api/data-entry/check/graphql/GetContactInformationType.graphql';
import GetCAIncomeTaxCalcMethods from '@api/data-entry/check/graphql/GetCAIncomeTaxCalcMethods.graphql';
import GetVoidableChecksGraphql from '@api/data-entry/check/graphql/GetVoidableChecks.graphql';

import { CheckDeleteResultType } from '@models/check/response/DeleteCheckResultType';
import { parseApolloQueryResult } from '@utils/ApolloResponseParser';
import { CheckBundleResponseTempType } from '@models/check/response/CheckBundleResponseType';
import { FilterModelSearchFields } from '@models/common/FilterTypes';
import {
    getFilterModelsFromGridState,
    createFilterModel,
} from '@utils/FilterModelUtils';
import { createPagingParameter } from '@utils/PagingModelUtils';
import { DeleteCheckRequestType } from '@models/check/request/DeleteCheckRequestType';
import { GetVoidableChecksResponseType } from '@models/check/response/GetVoidableChecksResponseType';

export const CheckApi: ICheckApi = {
    async getChecksAsync(
        variables: LoadDataEntryRequestType,
        abortSignal?: AbortSignal
    ): Promise<CheckModelType | null> {
        const response = await query(
            GetChecks,
            variables,
            ModuleEnum.Check,
            abortSignal
        );
        const data = parseApolloQueryResult<CheckModelType>(response, 'Checks');
        // for some reason js won't allow changing anything in data, so we have to do this...
        const dataWithEntryGridIds = {
            ...data,
            checks: {
                ...data.checks,
                items: data.checks.items.map((entry) => ({
                    ...entry,
                    gridId: entry.payEntryAdjustmentBatchId.toString(),
                })),
            },
        };
        return dataWithEntryGridIds;
    },

    async getCheckCountAsync(
        payRunId,
        abortSignal?: AbortSignal
    ): Promise<number> {
        const filters = getFilterModelsFromGridState(prmInitialState.check);

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
            GetCheckCount,
            variables,
            ModuleEnum.Check,
            abortSignal
        );
        const count = parseApolloQueryResult<CheckModelType>(
            response,
            'Checks'
        );
        return count?.checks?.totalCount;
    },

    async getCheckBundle(
        variables: LoadDataEntryRequestType,
        signal?: AbortSignal
    ): Promise<CheckBundleResponseTempType | null> {
        const response = await query(
            GetCheckBundle,
            variables,
            ModuleEnum.Check,
            signal
        );
        return response?.data;
    },

    async upsertCheckAsync(
        variables: UpsertCheckRequestType,
        signal?: AbortSignal
    ): Promise<UpsertCheckResponseType | null> {
        const response = await mutate(
            UpsertCheck,
            variables,
            ModuleEnum.CheckMutation,
            signal
        );
        return response?.data;
    },

    async deleteChecksAsync(
        payRunId: number,
        // The check with ALL its entries are going to be deleted when payEntryAdjustmentBatchId is passed
        payEntryAdjustmentBatchIds?: number[],
        // Only the check entry (without the check) will be deleted when payEntryBatchDataId is passed
        payEntryBatchDataIds?: number[],
        signal?: AbortSignal
    ): Promise<ApiResultType<CheckDeleteResultType>> {
        const deleteCheckRequestType: DeleteCheckRequestType = {
            payRunId,
            payEntryAdjustmentBatchIds,
            payEntryBatchDataIds,
        };
        const variables = {
            deleteCheckInput: deleteCheckRequestType,
        };
        const response = await mutate(
            DeleteCheck,
            variables,
            ModuleEnum.CheckMutation,
            signal
        );
        const result = convertToApiResult(
            response,
            'deleteCheck'
        ) as ApiResultType<CheckDeleteResultType>;
        result?.data?.deletedChecks?.forEach(
            (check) =>
                (check.gridId = check.payEntryAdjustmentBatchId.toString())
        );
        return result;
    },

    async getPayEntryAdjustmentBatchPropertyDataAsync(
        countryCode: string,
        payEntryAdjustmentBatchId?: number,
        signal?: AbortSignal
    ): Promise<GetPayEntryAdjustmentBatchPropertyDataResponseType | null> {
        const response = await query(
            GetPayEntryAdjustmentBatchPropertyData,
            { payEntryAdjustmentBatchId, countryCode },
            ModuleEnum.Check,
            signal
        );
        return response?.data;
    },

    async getContactInformationTypeAsync(
        signal?: AbortSignal
    ): Promise<ContactInformationTypeResponseType | null> {
        const response = await query(
            GetContactInformationType,
            {},
            ModuleEnum.Check,
            signal
        );
        return response?.data;
    },

    async getCAIncomeTaxCalcMethodsAsync(
        countryCode: string,
        signal?: AbortSignal
    ): Promise<GetIncomeTaxCalcMethodsTypeResponseType | null> {
        const response = await query(
            GetCAIncomeTaxCalcMethods,
            { countryCode },
            ModuleEnum.Check,
            signal
        );
        return response?.data;
    },

    async getVoidableChecksAsync(
        payGroupId: number,
        employeeId: number,
        fromDate: Date,
        toDate: Date,
        signal?: AbortSignal
    ): Promise<GetVoidableChecksResponseType | null> {
        const response = await query(
            GetVoidableChecksGraphql,
            { payGroupId, employeeId, fromDate, toDate },
            ModuleEnum.Check,
            signal
        );
        return response?.data;
    },
};
