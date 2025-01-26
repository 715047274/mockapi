import {
    makeOverridableObjectFactory,
    DeepPartial,
} from '@mocks/makeOverridableObjectFactory';
import * as adjustmentEntryFormFieldsMetaDataContext from '@components/common/context/AdjustmentEntryFormFieldsMetaDataContext';
import { DataEntryFormField } from '@models/common/FormFieldBaseType';
import {
    DataEntryFormFieldMetadataType,
    IDataEntryFormFieldsMetaData,
} from '@models/data-entry/DataEntryFormFieldPropsType';

const mockFormFieldMetadata: DataEntryFormFieldMetadataType = {
    reference: { current: jest.fn() },
    fieldStatus: 'default',
    fieldStatusMessage: '',
    setFieldStatus: jest.fn(),
    setFieldStatusMessage: jest.fn(),
    fieldBase: null,
    fieldChanged: false,
    setFieldChanged: jest.fn(),
};

export function mockAdjustmentEntryFormFieldsMetaDataContext(
    overrides?: DeepPartial<IDataEntryFormFieldsMetaData>
): void {
    jest.spyOn(
        adjustmentEntryFormFieldsMetaDataContext,
        'useAdjustmentEntryFormFieldsMetaDataContext'
    ).mockReturnValue(
        getAdjustmentEntryFormFieldsMetaDataContextMockedReturn(overrides)
    );
}

export const getAdjustmentEntryFormFieldsMetaDataContextMockedReturn =
    makeOverridableObjectFactory<IDataEntryFormFieldsMetaData>({
        fields: new Map<DataEntryFormField, DataEntryFormFieldMetadataType>([
            [DataEntryFormField.CodeField, mockFormFieldMetadata],
            [DataEntryFormField.AmountField, mockFormFieldMetadata],
            [DataEntryFormField.PriorPayRunField, mockFormFieldMetadata],
            [DataEntryFormField.MessageField, mockFormFieldMetadata],
            [DataEntryFormField.LegalEntityField, mockFormFieldMetadata],
            [
                DataEntryFormField.SendToPaymentSolutionsField,
                mockFormFieldMetadata,
            ],
            [DataEntryFormField.EIReferenceCodeField, mockFormFieldMetadata],
        ]),
    });
