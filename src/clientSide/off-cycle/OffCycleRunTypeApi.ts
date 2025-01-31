import { query } from '@api/common/GraphqlUtil';
import { ModuleEnum } from '@models/enums/ModuleEnum';
import { IOffCycleRunTypeApi } from './IOffCycleRunTypeApi';
import { OffCycleRunTypeType } from '@models/off-cycle';

import GetOffCycleRunTypesGraphql from './graphql/GetOffCycleRunTypes.graphql';

export const OffCycleRunTypeApi: IOffCycleRunTypeApi = {
    async getOffCycleRunTypesAsync(): Promise<OffCycleRunTypeType[]> {
        const response = await query(
            GetOffCycleRunTypesGraphql,
            {},
            ModuleEnum.OffCycle
        );
        return response?.data?.offCycleRunTypes ?? null;
    },
};
