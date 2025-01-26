import { AuditDetails } from '@models/reports';
import { mockAuditDetailsData } from './audit-details-data';
import { mockAuditDetailsColumns } from './audit-details-columns';
import { mockAuditDetailsColumns_earning } from './audit-details-columns-earning';
import { mockAuditDetailsData_earning } from './audit-details-data-earning';

export const getMockAuditDetails = (
    featureId: number
): { Result: AuditDetails } => {
    let result: AuditDetails;
    switch (featureId) {
        case 1:
            result = {
                ...mockAuditDetails,
                DataRowCount: 0,
                Columns: [],
                Data: [],
            };
            break;
        case 10:
            result = { ...mockAuditDetails_earning };
            break;
        default:
            result = { ...mockAuditDetails };
    }
    return { Result: result };
};

export const mockAuditDetails: AuditDetails = {
    Columns: mockAuditDetailsColumns,
    Data: mockAuditDetailsData,
    DataRowCount: mockAuditDetailsData.length,
    ContainsDuplicate: false,
    DuplicateReasonFields: null,
    HasAccessAuthOnPivot: true,
    NumberOfReportColumn: null,
    DuplicateReasonQueryEntities: [],
    EnableUtils: true,
    ClientEntityId: null,
    EntityState: 0,
    LastModifiedTimestamp: null,
    LocalizedName: '',
    LocalizedDescription: '',
    PrimaryKeyId: null,
    OriginalValues: null,
    ExtendedProperties: [],
};

export const mockAuditDetails_earning: AuditDetails = {
    Columns: mockAuditDetailsColumns_earning,
    Data: mockAuditDetailsData_earning,
    DataRowCount: mockAuditDetailsData_earning.length,
    ContainsDuplicate: false,
    DuplicateReasonFields: null,
    HasAccessAuthOnPivot: true,
    NumberOfReportColumn: null,
    DuplicateReasonQueryEntities: [],
    EnableUtils: true,
    ClientEntityId: null,
    EntityState: 0,
    LastModifiedTimestamp: null,
    LocalizedName: '',
    LocalizedDescription: '',
    PrimaryKeyId: null,
    OriginalValues: null,
    ExtendedProperties: [],
};
