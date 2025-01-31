import { ModuleEnum } from '@models/enums/ModuleEnum';
import { query } from '@api/common/GraphqlUtil';
import { IHolidayApi } from './IHolidayApi';
import { PayHolidayType } from '@models/common/PayHolidayType';

import GetPayRunCodesGraphql from './graphql/GetPayHolidays.graphql';

export const HolidayApi: IHolidayApi = {
    async getPayHolidayAsync(signal?: AbortSignal): Promise<PayHolidayType[]> {
        const response = await query(
            GetPayRunCodesGraphql,
            {},
            ModuleEnum.PayHoliday,
            signal
        );
        return response?.data?.payHolidays;
    },
};
