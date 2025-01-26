import {
    DeepPartial,
    makeOverridableObjectFactory,
} from '@mocks/makeOverridableObjectFactory';
import * as layoutContextImport from '@components/common/context/LayoutContext';
import { FeaturesEnum } from '@models/constants/FeatureConstants';

export function mockLayoutContext(
    overrides?: DeepPartial<layoutContextImport.ILayoutContextValue>
): layoutContextImport.ILayoutContextValue {
    const mockReturn = getLayoutContextMockedReturn(overrides);
    jest.spyOn(layoutContextImport, 'useLayoutContext').mockReturnValue(
        mockReturn
    );
    return mockReturn;
}

const layoutContextMockedValue: layoutContextImport.ILayoutContextValue = {
    currentPage: {
        id: FeaturesEnum.Overview,
        title: 'title',
        component: document.createElement('div'),
        description: 'description',
        testId: 'description',
        enableBreadCrumb: true,
    },
    setCurrentPage: jest.fn(),
    setPageTitle: jest.fn(),
    prmToolbarRefresh: jest.fn(),
    addPrmToolbarRefreshHandler: jest.fn(),
    removeToolbarRefreshHandler: jest.fn(),
    leftPaneCollapsed: false,
    toggleLeftPane: jest.fn(),
    collapseLeftPane: jest.fn(),
    expandLeftPane: jest.fn(),
    sideBarOverlayBreakpoint: 1280,
    expandedSideBarWidth: 270,
    collapsedSideBarWidth: 65,
    cacheLoaded: {
        checkTemplateCodes: true,
        earningAmountTypes: true,
        wcbAccounts: true,
        wcbCodes: true,
        checkTypes: true,
        reasonTypes: true,
        wageAttachmentOrderedAmountTypes: true,
        payHolidays: true,
        offCycleRunTypes: true,
        distributionCodes: true,
        userPayGroups: true,
    },
    setCacheLoaded: jest.fn(),
};

export const getLayoutContextMockedReturn = makeOverridableObjectFactory(
    layoutContextMockedValue
);
