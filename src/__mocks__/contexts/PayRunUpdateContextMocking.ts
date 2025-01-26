import {
    makeOverridableObjectFactory,
    DeepPartial,
} from '@mocks/makeOverridableObjectFactory';
import * as payRunUpdateContextImport from '@components/common/context/PayRunUpdateContext';

export function mockPayRunUpdateContext(
    overrides?: DeepPartial<payRunUpdateContextImport.PayRunUpdateContextValueType>
): void {
    jest.spyOn(
        payRunUpdateContextImport,
        'usePayRunUpdateContext'
    ).mockReturnValue(getPayRunUpdateContextMockedReturn(overrides));
}

export const getPayRunUpdateContextMockedReturn =
    makeOverridableObjectFactory<payRunUpdateContextImport.PayRunUpdateContextValueType>(
        {
            updateVersions: {
                CalculationState: 1,
                CommitState: 2,
                DataEntryState: 3,
                IssuesState: 4,
                PreviewState: 5,
            },
            statusText: '',
        }
    );
