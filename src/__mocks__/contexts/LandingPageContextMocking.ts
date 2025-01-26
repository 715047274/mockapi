import {
    DeepPartial,
    makeOverridableObjectFactory,
} from '@mocks/makeOverridableObjectFactory';
import * as landingPageContextImport from '@components/common/context/page-context/LandingPageContext';
import { ILandingPageContextValue } from '@models/user-selection-context';

export function mockLandingPageContext(
    overrides?: DeepPartial<ILandingPageContextValue>
): void {
    jest.spyOn(
        landingPageContextImport,
        'useLandingPageContext'
    ).mockReturnValue(getLandingPageContextMockedReturn(overrides));
}

export const getLandingPageContextMockedReturn =
    makeOverridableObjectFactory<ILandingPageContextValue>({
        state: landingPageContextImport.landingPageFiltersInitialState,
        dispatch: () => null,
    });
