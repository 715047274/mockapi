import {
    DeepPartial,
    makeOverridableObjectFactory,
} from '@mocks/makeOverridableObjectFactory';
import * as appModeContextImport from '@components/common/context/AppModeContext';
import { AppMode } from '@models/enums/AppMode';

export function mockAppModeContext(
    overrides?: DeepPartial<appModeContextImport.AppModeValueType>
): void {
    jest.spyOn(appModeContextImport, 'useAppModeContext').mockReturnValue(
        getAppModeContextMockedReturn(overrides)
    );
}

export const getAppModeContextMockedReturn =
    makeOverridableObjectFactory<appModeContextImport.AppModeValueType>({
        appMode: AppMode.Mock,
        loadingFromDayforce: false,
    });
