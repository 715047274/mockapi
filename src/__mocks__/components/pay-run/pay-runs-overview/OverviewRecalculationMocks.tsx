import { getLastCalculatedTimestamps } from '@mocks/api/pay-run';
import {
    getPayRunsWithProcessState,
    pollPayRuns,
} from '@mocks/api/pay-run/pay-run-provider';
import { PayRunType } from '@models/pay-run';
import * as viewModelImport from '@components/pay-run/pay-runs-overview/overview-recalculation/useOverviewRecalculationViewModel';
import * as componentImport from '@components/pay-run/pay-runs-overview/overview-recalculation/OverviewRecalculation';
import { makeOverridableObjectFactory } from '@mocks/makeOverridableObjectFactory';
import React from 'react';

export function mockOverviewRecalculationViewModel(
    overrides?: Partial<viewModelImport.IOverviewRecalculationViewModel>
): jest.SpyInstance {
    const viewModelFactory =
        makeOverridableObjectFactory<viewModelImport.IOverviewRecalculationViewModel>(
            {
                payRuns: [],
                totalPayRuns: 0,
                pageSize: 25,
                indexedPayRuns: {},
                loadingPayRuns: false,
                loadingStatuses: false,
                loadingLastCalcTimestamps: false,
                selectedIds: [],
                toggleIds: () => null,
                unselectIds: () => null,
                recalculate: () => null,
                currentPageIndex: 0,
                handlePageIndexChange: () => null,
            }
        );
    return jest
        .spyOn(viewModelImport, 'useOverviewRecalculationViewModel')
        .mockReturnValue(viewModelFactory(overrides));
}

export function mockOverviewRecalculation(): jest.SpyInstance {
    return jest
        .spyOn(componentImport, 'OverviewRecalculation')
        .mockReturnValue(<></>);
}

export function makeOverviewRecalculationPayRunMockData(
    skip = 0,
    take = 5
): PayRunType[] {
    const payRunsForTesting = getPayRunsWithProcessState({ skip, take }).items;
    const payRunIds = payRunsForTesting.map((pr) => pr.payRunId);
    const payRunStatusesForTesting = pollPayRuns(payRunIds);
    const lastCalcTimestampsForTesting = getLastCalculatedTimestamps(payRunIds);

    return [
        {
            ...payRunsForTesting[0],
            ...payRunStatusesForTesting?.payRunProcessStates[0],
            ...lastCalcTimestampsForTesting[0],
        },
        {
            ...payRunsForTesting[1],
            ...payRunStatusesForTesting?.payRunProcessStates[1],
            ...lastCalcTimestampsForTesting[1],
        },
        {
            ...payRunsForTesting[2],
            ...payRunStatusesForTesting?.payRunProcessStates[2],
            ...lastCalcTimestampsForTesting[2],
        },
        {
            ...payRunsForTesting[3],
            ...payRunStatusesForTesting?.payRunProcessStates[3],
            ...lastCalcTimestampsForTesting[3],
        },
        {
            ...payRunsForTesting[4],
            ...payRunStatusesForTesting?.payRunProcessStates[4],
            ...lastCalcTimestampsForTesting[4],
        },
    ];
}
