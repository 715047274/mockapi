import { mutate, query } from '@api/common/GraphqlUtil';
import {
    DeleteResponseType,
    CanDeleteResponseType,
} from '@models/common/DeleteResponseTypes';
import { ModuleEnum } from '@models/enums/ModuleEnum';
import { IOffCycleApi } from './IOffCycleApi';
import {
    OffCycleSaveRequestType,
    SourceOffCyclePayRunType,
    OffCyclePayRunResponseType,
} from '@models/off-cycle';

import SaveOffCyclePayRunGraphql from './graphql/SaveOffCyclePayRun.graphql';
import CanDeleteOffCycleRunGraphql from './graphql/CanDeleteOffCycleRun.graphql';
import DeleteOffCycleRunGraphql from './graphql/DeleteOffCycleRun.graphql';
import GetOffCycleSourcePayRunGraphql from './graphql/GetOffCycleSourcePayRun.graphql';

export const OffCycleApi: IOffCycleApi = {
    async saveOffCyclePayRunAsync(
        offCyclePayRun: OffCycleSaveRequestType,
        signal?: AbortSignal
    ): Promise<OffCyclePayRunResponseType> {
        const response = await mutate(
            SaveOffCyclePayRunGraphql,
            { offCyclePayRun },
            ModuleEnum.PayRunProcessMutation,
            signal
        );
        return response?.data?.saveOffCyclePayRun;
    },

    async canDeleteOffCycleRunAsync(
        offCyclePayRunId: number,
        signal?: AbortSignal
    ): Promise<CanDeleteResponseType> {
        const response = await query(
            CanDeleteOffCycleRunGraphql,
            { offCyclePayRunId },
            ModuleEnum.OffCycle,
            signal
        );
        return response?.data?.canDeleteOffCycleRun;
    },

    async deleteOffCycleRunAsync(
        offCyclePayRunId: number,
        signal?: AbortSignal
    ): Promise<DeleteResponseType> {
        const response = await mutate(
            DeleteOffCycleRunGraphql,
            { offCyclePayRunId },
            ModuleEnum.PayRunProcessMutation,
            signal
        );
        return response?.data?.deleteOffCycleRun;
    },

    async getOffCycleSourcePayRun(
        offCyclePayRunId: number,
        signal?: AbortSignal
    ): Promise<SourceOffCyclePayRunType> {
        const response = await query(
            GetOffCycleSourcePayRunGraphql,
            { offCyclePayRunId },
            ModuleEnum.OffCycle,
            signal
        );
        return response?.data?.offCycleSourcePayRun;
    },
};
