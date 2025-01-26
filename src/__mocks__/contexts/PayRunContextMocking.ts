import {
    DeepPartial,
    makeOverridableObjectFactory,
} from '@mocks/makeOverridableObjectFactory';
import * as payRunContextImport from '@components/common/context/PayRunContext';
import { PayRunType } from '@models/pay-run';
import { CountryCodeConstant } from '@models/constants/CountryConstants';

export function mockPayRunContext(
    overrides?: DeepPartial<payRunContextImport.PayRunContextValueType>
): void {
    jest.spyOn(payRunContextImport, 'usePayRunContext').mockReturnValue(
        getPayRunContextMockedReturn(overrides)
    );
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
    impoundDate: '2022-12-27',
    countryCode: CountryCodeConstant.CAN,
    countryName: 'Canada',
    isoCurrencyCode: 'USD',
    payrollCommitted: false,
    payrollLocked: true,
    isQuarterAmendment: false,
    isYearEndAmendment: false,
    isOffCyclePayRun: false,
    payRunDefId: 1,
};

export const mockOffCyclePayRun: PayRunType = {
    ...mockPayRun,
    isOffCyclePayRun: true,
    offCycleReasonId: 1,
    offCyclePayRunTypeId: 1,
    offCyclePayRunName: 'Off Cycle Run',
    offCycleXRefCode: 'Reference Code',
    ledgerCode1: 'L1',
    ledgerCode2: 'L2',
    glAccrualPercent: 10,
};

export const getPayRunContextMockedReturn =
    makeOverridableObjectFactory<payRunContextImport.PayRunContextValueType>({
        payrun: mockPayRun,
        setPayrun: () => null,
        setPayrunCommitState: () => null,
        defaultPreviousPayRunId: 2,
        gotDefaultPreviousPayRunId: true,
        payRunCacheDataLoaded: true,
        extraPayRunTaxCodesLoaded: true,
    });
