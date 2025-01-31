import {
    SourceCategory,
    LayoutPosition,
    ReactGridLayoutType,
    SourceCategoryLayoutType,
    LayoutDefaultWidth,
    LayoutDefaultHeight,
} from '@models/layout/DashboardReactGridLayoutTypes';
import { generateUUID } from '@api/UUIDService';

import { getDefaultConfigLayouts } from '@components/config/DashboardLayoutConfigs';

import { mutate } from '@api/common/GraphqlUtil';
// import GetUserLayouts from '@api/dashboard/graphql/GetUserLayouts.graphql';
import BulkAddLayouts from '@api/dashboard/graphql/BulkAddLayouts.graphql';
import UpdateLayout from '@api/dashboard/graphql/UpdateLayout.graphql';
import DeleteLayoutsByCategory from '@api/dashboard/graphql/DeleteLayoutsByCategory.graphql';
import { PayRunAvailableFeaturesType } from '@utils/HidingFeatureUtils';
import { ModuleEnum } from '@models/enums/ModuleEnum';
import { IDashboardApi } from '@api/dashboard/IDashboardApi';
import { ObjectId } from 'bson';

const StringigyPattern = ['c', 'i', 'x', 'y', 'w', 'h', 'minW', 'minH'];

export const DashboardApi: IDashboardApi = {
    getUserLayoutsAsync,
    addLayoutAsync,
    updateLayoutAsync,
    deleteUserLayoutsByCategoryAsync,
};

async function getUserLayoutsAsync(
    user: string,
    breakpoint: ReactGridLayoutType,
    payRunAvailableFeatures: PayRunAvailableFeaturesType,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    abortSignal: AbortSignal
): Promise<Array<SourceCategoryLayoutType> | null> {
    // const response = await query(
    //     GetUserLayouts,
    //     { user, breakpoint },
    //     ModuleEnum.DashboardLayout
    // );
    // WARNING - there is business logic in createTempMockData - when switching to the
    // commented code here, additional work is needed to merge the logic
    // return response?.data?.userLayouts;

    // TODO: When the API is ready for the dashboard,
    // the following method will need to be deleted and the code above will need to be uncommented.
    return await createTempMockData(user, breakpoint, payRunAvailableFeatures);
}

function createTempMockData(
    user: string,
    breakpoint: ReactGridLayoutType,
    payRunAvailableFeatures: PayRunAvailableFeaturesType
): Promise<Array<SourceCategoryLayoutType> | null> {
    const configLayouts = getDefaultConfigLayouts(payRunAvailableFeatures);
    const result = configLayouts[breakpoint].map((item) => ({
        layout: item,
        id: new ObjectId(),
    }));

    return new Promise((resolve) => {
        resolve(result);
    });
}

async function saveUserLayouts(
    category: number,
    user: string,
    layouts: Array<{
        type: ReactGridLayoutType;
        layout: SourceCategoryLayoutType;
    }>
) {
    const response = await mutate(
        BulkAddLayouts,
        {
            layouts: layouts.map((item) => ({
                category,
                user,
                breakpoint: item.type as string,
                layout: JSON.stringify(item.layout, StringigyPattern, 0),
            })),
        },
        ModuleEnum.DashboardLayout
    );

    if (response.errors?.length > 0) {
        throw new Error(
            (response.errors[0].extensions?.message as string) ?? 'Unknow error'
        );
    }

    return response.data.bulkAddUserLayouts;
}

async function updateUserLayoutAsync(
    id: string,
    layout: SourceCategoryLayoutType
): Promise<any> {
    const response = await mutate(
        UpdateLayout,
        {
            id,
            layout: JSON.stringify(layout, StringigyPattern, 0),
        },
        ModuleEnum.DashboardLayout
    );

    return response?.data?.updateLayout;
}

async function deleteUserLayoutsByCategoryAsync(
    user: string,
    category: number
): Promise<any> {
    const response = await mutate(
        DeleteLayoutsByCategory,
        {
            user,
            category,
        },
        ModuleEnum.DashboardLayout
    );

    return response?.data?.deleteLayoutsByCategory;
}

function updateLayoutAsync(
    user: string,
    breakpoint: ReactGridLayoutType,
    layout: SourceCategoryLayoutType
): Promise<any> {
    return updateUserLayoutAsync(layout.mid, layout);
}

const createLayouts = (
    category: SourceCategory,
    position: LayoutPosition,
    payRunAvailableFeatures: PayRunAvailableFeaturesType
): { [P: string]: SourceCategoryLayoutType } => {
    const result: { [P: string]: SourceCategoryLayoutType } = {};
    const configLayouts = getDefaultConfigLayouts(payRunAvailableFeatures);
    for (const layoutType in configLayouts) {
        const cfg = configLayouts[layoutType]?.find(
            (x) => x.c === Number(category)
        );
        result[layoutType] = {
            c: Number(category),
            i: generateUUID(),
            x: position.x, //todo: check beyond max width and assign to 0?
            y: position.y, //todo: check beyond max height and assign to 0?
            w: cfg?.w || LayoutDefaultWidth,
            h: cfg?.h || LayoutDefaultHeight,
            minW: cfg?.minW || LayoutDefaultWidth,
            minH: cfg?.minH || LayoutDefaultHeight,
        };
    }
    return result;
};

async function addLayoutAsync(
    user: string,
    category: SourceCategory,
    position: LayoutPosition,
    payRunAvailableFeatures: PayRunAvailableFeaturesType
): Promise<any> {
    const newLayouts = createLayouts(
        category,
        position,
        payRunAvailableFeatures
    );
    const layoutTypes: Array<ReactGridLayoutType> = [
        'xxl',
        'xl',
        'lg',
        'md',
        'sm',
        'xs',
        'xxs',
    ];
    const layouts = [];
    layoutTypes.forEach((layoutType) => {
        layouts.push({ type: layoutType, layout: newLayouts[layoutType] });
    });
    const savedLayouts = await saveUserLayouts(Number(category), user, layouts);
    const result = {};
    savedLayouts?.forEach((item) => {
        result[item.breakpoint] = { id: item.id, layout: item.layout };
    });
    return result;
}
