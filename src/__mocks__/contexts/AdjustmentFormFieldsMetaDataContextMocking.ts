import {
    makeOverridableObjectFactory,
    DeepPartial,
} from '@mocks/makeOverridableObjectFactory';
import * as adjustmentFormFieldsMetaDataContext from '@components/common/context/AdjustmentFormFieldsMetaDataContext';
import { DataEntryFormField } from '@models/common/FormFieldBaseType';
import {
    DataEntryFormFieldMetadataType,
    IDataEntryFormFieldsMetaData,
} from '@models/data-entry/DataEntryFormFieldPropsType';
import { EmployeeFieldForAdjustmentData } from '@components/data-entry/adjustment/form-fields/EmployeeFieldForAdjustment';
import { AdjustmentTypeFieldData } from '@components/data-entry/adjustment/form-fields/AdjustmentTypeField';
import { ThirdPartySickPayProviderFieldData } from '@components/data-entry/adjustment/form-fields/ThirdPartySickPayProviderField';
import { ThirdPartySickPayTaxExemptionFieldData } from '@components/data-entry/adjustment/form-fields/ThirdPartySickPayTaxExemptionField';
import { MessageFieldData } from '@components/data-entry/form-fields/MessageField';
import { OverrideResidentPSDCodeFieldData } from '@components/data-entry/adjustment/form-fields/OverrideResidentPSDCodeField';
import { ResidentStateData } from '@components/data-entry/adjustment/form-fields/ResidentStateField';

const mockFormFieldMetadata: DataEntryFormFieldMetadataType = {
    reference: { current: { focus: jest.fn() } },
    fieldStatus: 'default',
    fieldStatusMessage: '',
    setFieldStatus: jest.fn(),
    setFieldStatusMessage: jest.fn(),
    fieldBase: null,
    fieldChanged: false,
    setFieldChanged: jest.fn(),
};

export function mockAdjustmentFormFieldsMetaDataContext(
    overrides?: DeepPartial<IDataEntryFormFieldsMetaData>
): void {
    jest.spyOn(
        adjustmentFormFieldsMetaDataContext,
        'useAdjustmentFormFieldsMetaDataContext'
    ).mockReturnValue(
        getAdjustmentFormFieldsMetaDataContextMockedReturn(overrides)
    );
}

export const getAdjustmentFormFieldsMetaDataContextMockedReturn =
    makeOverridableObjectFactory<IDataEntryFormFieldsMetaData>({
        fields: new Map<DataEntryFormField, DataEntryFormFieldMetadataType>([
            [
                DataEntryFormField.EmployeeField,
                {
                    ...mockFormFieldMetadata,
                    fieldBase: EmployeeFieldForAdjustmentData,
                },
            ],
            [
                DataEntryFormField.AdjustmentTypeField,
                {
                    ...mockFormFieldMetadata,
                    fieldBase: AdjustmentTypeFieldData,
                },
            ],
            [
                DataEntryFormField.ThirdPartySickPayProviderField,
                {
                    ...mockFormFieldMetadata,
                    fieldBase: ThirdPartySickPayProviderFieldData,
                },
            ],
            [
                DataEntryFormField.ThirdPartySickPayTaxExemptionField,
                {
                    ...mockFormFieldMetadata,
                    fieldBase: ThirdPartySickPayTaxExemptionFieldData,
                },
            ],
            [
                DataEntryFormField.DistributionCodeField,
                { ...mockFormFieldMetadata },
            ],
            [
                DataEntryFormField.MessageField,
                {
                    ...mockFormFieldMetadata,
                    fieldBase: MessageFieldData,
                },
            ],
            [
                DataEntryFormField.OverrideResidentPSDCodeField,
                {
                    ...mockFormFieldMetadata,
                    fieldBase: OverrideResidentPSDCodeFieldData,
                },
            ],
            [
                DataEntryFormField.ResidentStateField,
                {
                    ...mockFormFieldMetadata,
                    fieldBase: ResidentStateData,
                },
            ],
        ]),
    });
