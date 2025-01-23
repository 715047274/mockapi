import { PayHolidayType } from '@models/common/PayHolidayType';

export interface IHolidayApi {
    getPayHolidayAsync: (signal?: AbortSignal) => Promise<PayHolidayType[]>;
}
