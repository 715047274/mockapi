import {
    DeepPartial,
    makeOverridableObjectFactory,
} from '@mocks/makeOverridableObjectFactory';
import * as navigationControlContext from '@components/common/context/navigation-control/NavigationControlContext';

export function mockNavigationControlContext(
    overrides?: DeepPartial<navigationControlContext.INavigationControlContextValue>
): void {
    jest.spyOn(
        navigationControlContext,
        'useNavigationControlContext'
    ).mockReturnValue(getNavigationControlContextMockedReturn(overrides));
}

const emptyConsumables = {
    requestClose: () => Promise.resolve(true),
    addCloseMessage: () => null,
    removeCloseMessage: () => null,
    tryClose: () => Promise.resolve(true),
    setCloseFunction: () => null,
    removeCloseFunction: () => null,
};
export const getNavigationControlContextMockedReturn =
    makeOverridableObjectFactory<navigationControlContext.INavigationControlContextValue>(
        {
            flyoutNavigation: emptyConsumables,
            dataEntryTabNavigation: emptyConsumables,
            prmPageNavigation: emptyConsumables,
        }
    );
