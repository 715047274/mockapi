import * as useToasterImport from '@hooks/useToaster';
import {
    DeepPartial,
    makeOverridableObjectFactory,
} from '@mocks/makeOverridableObjectFactory';

export function mockUseToaster(
    overrides?: DeepPartial<useToasterImport.IToaster>
): useToasterImport.IToaster {
    const mockReturn = getUseToasterMockedReturn(overrides);
    jest.spyOn(useToasterImport, 'useToaster').mockReturnValue(mockReturn);
    return mockReturn;
}

export const getUseToasterMockedReturn =
    makeOverridableObjectFactory<useToasterImport.IToaster>({
        toastSuccess: jest.fn(),
        toastError: jest.fn(),
        toastWarning: jest.fn(),
        toastInfo: jest.fn(),
        toastMessage: jest.fn(),
        toast: jest.fn(),
    });
