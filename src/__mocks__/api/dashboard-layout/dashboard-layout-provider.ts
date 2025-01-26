import { ObjectId } from 'bson';

import { data as initData } from './dashboard-layout';
import { SourceCategoryLayoutType } from '@models/layout/DashboardReactGridLayoutTypes';

export type DashboardLayoutViewModel = {
    id: ObjectId;
    user: string;
    category: string;
    breakpoint: string;
    layout: Array<SourceCategoryLayoutType>;
    createdAt: Date;
    updatedAt?: Date;
};

let simulatedData: Array<DashboardLayoutViewModel> = initData;

export function getUserLayouts(breakpoint: string): any {
    const result = simulatedData
        .find((x) => x.breakpoint === breakpoint)
        .layout.map((item) => ({
            id: new ObjectId(),
            user: '1001',
            category: 'category',
            breakpoint,
            createdAt: new Date(),
            updatedAt: new Date(),
            layout: item,
        }));
    return {
        userLayouts: result,
    };
}

export function bulkAddUserLayouts(layouts: Array<any>): any {
    const persistData: Array<DashboardLayoutViewModel> = layouts.map(
        (item) => ({
            id: new ObjectId(),
            user: item.user,
            category: item.category,
            breakpoint: item.breakpoint,
            layout: item.layout,
            createdAt: new Date(),
        })
    );
    simulatedData = [...simulatedData, ...persistData];

    return {
        bulkAddUserLayouts: persistData,
    };
}

export function modifyLayout(
    id: ObjectId,
    layout: Array<SourceCategoryLayoutType>
): any {
    const vm = simulatedData.find((x) => x.id === id);
    if (vm) {
        vm.layout = layout;
        vm.updatedAt = new Date();
    }
    return {
        modifyLayout: vm,
    };
}

export function deleteUserLayoutsByCategory(category: string): any {
    simulatedData = simulatedData.filter((x) => x.category !== category);
    return {
        deleteUserLayoutsByCategory: { deletedCount: 5, isAcknowledged: true },
    };
}
