import {
    makeOverridableObjectFactory,
    DeepPartial,
} from '@mocks/makeOverridableObjectFactory';
import * as dataEntryContextImport from '@components/common/context/DataEntryContext';

export function mockDataEntryContext(
    overrides?: DeepPartial<dataEntryContextImport.IDataEntryContextValue>
): void {
    jest.spyOn(dataEntryContextImport, 'useDataEntryContext').mockReturnValue(
        getDataEntryContextMockedReturn(overrides)
    );
}

export const getDataEntryContextMockedReturn =
    makeOverridableObjectFactory<dataEntryContextImport.IDataEntryContextValue>(
        {
            payRunQuickEntryCount: 0,
            setPayRunQuickEntryCount: () => null,
            addPayRunQuickEntryCount: () => null,
            reducePayRunQuickEntryCount: () => null,
            refreshPayRunQuickEntryCount: () => null,
            payRunCheckCount: 0,
            setPayRunCheckCount: () => null,
            addPayRunCheckCount: () => null,
            reducePayRunCheckCount: () => null,
            refreshPayRunCheckCount: () => null,
            payRunAdjustmentCount: 0,
            setPayRunAdjustmentCount: () => null,
            addPayRunAdjustmentCount: () => null,
            reducePayRunAdjustmentCount: () => null,
            refreshPayRunAdjustmentCount: () => null,
            payRunTimeDataCount: 0,
            setPayRunTimeDataCount: () => null,
            addPayRunTimeDataCount: () => null,
            reducePayRunTimeDataCount: () => null,
            refreshPayRunTimeDataCount: () => null,
            quickEntryGridIssuesBannerData: null,
            setQuickEntryGridIssuesBannerData: () => null,
            refreshQuickEntryGridIssuesBannerData: () => null,
            refreshCheckGridIssuesBannerData: () => null,
        }
    );
