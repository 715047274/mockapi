import {
    DeepPartial,
    makeOverridableObjectFactory,
} from '@mocks/makeOverridableObjectFactory';
import * as breadCrumbContextImport from '@components/common/context/breadCrumbContext';

export function mockBreadCrumbContext(
    overrides?: DeepPartial<breadCrumbContextImport.IBreadCrumbContextValue>
): breadCrumbContextImport.IBreadCrumbContextValue {
    const mockReturn = getBreadCrumbContextMockedReturn(overrides);
    jest.spyOn(breadCrumbContextImport, 'useBreadCrumbContext').mockReturnValue(
        mockReturn
    );
    return mockReturn;
}

const breadCrumbContextMockedValue: breadCrumbContextImport.IBreadCrumbContextValue =
    {
        showBreadCrumb: true,
        setShowBreadCrumb: jest.fn(),
        selectedPreviewItemId: '',
        setSelectedPreviewItemId: jest.fn(),
        path: [
            { displayName: 'Preview', id: 'Summary' },
            { displayName: 'Earnings Preview', id: '' },
        ],
        setPath: jest.fn(),
        allowRedirectToLegalEntity: false,
        setAllowRedirectToLegalEntity: jest.fn(),
    };

const getBreadCrumbContextMockedReturn = makeOverridableObjectFactory(
    breadCrumbContextMockedValue
);
