import {
    makeOverridableObjectFactory,
    DeepPartial,
} from '@mocks/makeOverridableObjectFactory';
import { PayRunType } from '@models/pay-run';
import { CountryCodeConstant } from '@models/constants/CountryConstants';
import * as offCycleModalContextImport from '@components/common/context/OffCycleModalContext';

export function mockOffCycleModalContext(
    overrides?: DeepPartial<offCycleModalContextImport.OffCycleModalContextValueType>
): void {
    jest.spyOn(
        offCycleModalContextImport,
        'useOffCycleModalContext'
    ).mockReturnValue(getOffCycleModalContextMockedReturn(overrides));
}

export const mockPayRun: PayRunType = {
    payRunId: 1,
    payGroupId: 101,
    payGroupName: 'Pay Group Name',
    payPeriodDisplay: '01-02',
    payDate: '2022-12-28',
    periodStart: '2022-12-07',
    periodEnd: '2022-12-28',
    commitDate: '2022-12-28',
    countryCode: CountryCodeConstant.USA,
    payrollCommitted: false,
    isQuarterAmendment: false,
    isYearEndAmendment: false,
    isOffCyclePayRun: false,
};

export const getOffCycleModalContextMockedReturn =
    makeOverridableObjectFactory<offCycleModalContextImport.OffCycleModalContextValueType>(
        {
            selectedPayRun: mockPayRun,
            isEditOffCycle: false,
            isOffCycleModalOpen: true,
            openOffCycleModal: jest.fn(),
            closeOffCycleModal: jest.fn(),
        }
    );
