import * as useClickGuardImport from '@hooks/useClickGuard';
import {
    DeepPartial,
    makeOverridableObjectFactory,
} from '@mocks/makeOverridableObjectFactory';

export const registerClickSpy = jest.fn();
export const resetClickStateSpy = jest.fn();

export function mockUseClickGuard(
    overrides?: DeepPartial<useClickGuardImport.IUseClickGuardReturn>
): void {
    jest.spyOn(useClickGuardImport, 'useClickGuard').mockReturnValue(
        getSseClickGuardMockedReturn(overrides)
    );
}

export const getSseClickGuardMockedReturn =
    makeOverridableObjectFactory<useClickGuardImport.IUseClickGuardReturn>({
        hasRecentClick: false,
        registerClick: registerClickSpy,
        resetClickState: resetClickStateSpy,
    });
