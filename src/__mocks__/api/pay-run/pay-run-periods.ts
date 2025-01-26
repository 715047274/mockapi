import { PayRunPeriod } from '@models/enums/PayRunPeriodEnum';

export const payRunPeriods = [
    {
        payRunPeriodId: 1,
        codeName: PayRunPeriod.CURRENT_PERIOD,
        shortName: 'Current period',
    },
    {
        payRunPeriodId: 2,
        codeName: PayRunPeriod.NEXT_PERIOD,
        shortName: 'Next period',
    },
    {
        payRunPeriodId: 3,
        codeName: PayRunPeriod.LAST_PERIOD,
        shortName: 'Last period',
    },
    {
        payRunPeriodId: 4,
        codeName: PayRunPeriod.LAST_MONTH,
        shortName: 'Last month',
    },
    {
        payRunPeriodId: 5,
        codeName: PayRunPeriod.LAST_QUARTER,
        shortName: 'Last quarter',
    },
    {
        payRunPeriodId: 6,
        codeName: '2024',
        shortName: '2024',
    },
    {
        payRunPeriodId: 7,
        codeName: '2023',
        shortName: '2023',
    },
    {
        payRunPeriodId: 8,
        codeName: '2022',
        shortName: '2022',
    },
    {
        payRunPeriodId: 9,
        codeName: '2021',
        shortName: '2021',
    },
    {
        payRunPeriodId: 10,
        codeName: '2020',
        shortName: '2020',
    },
];
