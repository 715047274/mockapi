import {
    DeepPartial,
    makeOverridableObjectFactory,
} from '@mocks/makeOverridableObjectFactory';
import * as payRunStateContextImport from '@components/common/context/PayRunStateContext';
import { PayRunStateType } from '@models/pay-run';
import { PayRunProcessStateEnum } from '@models/enums/PayRunStatusEnums';

export function mockPayRunStateContext(
    overrides?: DeepPartial<payRunStateContextImport.PayRunStateContextValueType>
): void {
    jest.spyOn(
        payRunStateContextImport,
        'usePayRunStateContext'
    ).mockReturnValue(getPayRunStateContextMockedReturn(overrides));
}

export const mockPayRunState: PayRunStateType = {
    payRunId: 1,
    payRunBlocked: false,
    payRunProcessState: PayRunProcessStateEnum.NONE,
};

export const getPayRunStateContextMockedReturn =
    makeOverridableObjectFactory<payRunStateContextImport.PayRunStateContextValueType>(
        {
            payRunState: mockPayRunState,
            setPayRunState: () => null,
            payRunCommittingOrCommitted: false,
            payRunValidatingOrCalculating: false,
        }
    );
