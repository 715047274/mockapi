import * as toasterContextImport from '@components/common/context/ToasterContext';

export function mockToastContext(
    override?: toasterContextImport.ShowToastFunctionType
): void {
    jest.spyOn(toasterContextImport, 'useToastContext').mockReturnValue(
        getToastContextMockedReturn(override)
    );
}

export const getToastContextMockedReturn = (
    override: toasterContextImport.ShowToastFunctionType
): toasterContextImport.ShowToastFunctionType => {
    return override ?? jest.fn();
};
