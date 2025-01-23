import {
    LayoutPosition,
    ReactGridLayoutType,
    SourceCategory,
    SourceCategoryLayoutType,
} from '@models/layout/DashboardReactGridLayoutTypes';
import { PayRunAvailableFeaturesType } from '@utils/HidingFeatureUtils';

export interface IDashboardApi {
    getUserLayoutsAsync: (
        user: string,
        breakpoint: ReactGridLayoutType,
        payRunFeatures: PayRunAvailableFeaturesType,
        abortSignal: AbortSignal
    ) => Promise<Array<SourceCategoryLayoutType> | null>;
    addLayoutAsync: (
        user: string,
        category: SourceCategory,
        position: LayoutPosition,
        payRunFeatures: PayRunAvailableFeaturesType
    ) => Promise<Array<any> | null>;
    updateLayoutAsync: (
        user: string,
        breakpoint: ReactGridLayoutType,
        layout: SourceCategoryLayoutType
    ) => Promise<any>;
    deleteUserLayoutsByCategoryAsync: (
        user: string,
        category: number
    ) => Promise<any>;
}
