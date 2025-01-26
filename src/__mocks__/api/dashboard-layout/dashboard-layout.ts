import { getDefaultConfigLayouts } from '@components/config/DashboardLayoutConfigs';
import { DashboardLayoutViewModel } from './dashboard-layout-provider';
import { ObjectId } from 'bson';
import { makeMockPayRunAvailableFeaturesObject } from '@mocks/api/feature-control/feature-control-provider';

const createLayouts = () => {
    const result: Array<DashboardLayoutViewModel> = [];
    const configLayouts = getDefaultConfigLayouts(
        makeMockPayRunAvailableFeaturesObject()
    );
    for (const layoutType in configLayouts) {
        result.push({
            id: new ObjectId(),
            user: '1001',
            category: 'category',
            breakpoint: layoutType,
            layout: configLayouts[layoutType],
            createdAt: new Date(),
        });
    }
    return result;
};

export const data: Array<DashboardLayoutViewModel> = createLayouts();
