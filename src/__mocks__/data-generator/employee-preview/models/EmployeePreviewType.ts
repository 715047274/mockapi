import { ObjectId } from 'bson';

export type EmployeePreviewType = {
    _id: { $oid: ObjectId };
    SchemaVersion: string;
    ClientId: number;
    Namespace: string;
    CountryCode: string;
    EmployeeId: number;
    EmployeeName: string;
    EmployeeNumber: string;
    TotalGroupEmployeeCount: number;
    PayRunId: number;
    PaygroupCalendarId: number;
    OffCyclePayRunId?: number;
    PrimaryLegalEntityId?: number;
    PrimaryDeptJobId?: string;
    PrimaryOrgUnitId?: string;
    PrimaryLegalEntityName?: string;
    PrimaryDepartmentName?: string;
    PrimaryOrgUnitName?: string;
    CurrentAmount: number;
    CurrentHours?: number;
    LimitedTaxableWages?: number;
    TotalTaxableWages?: number;
    MtdAmount?: number;
    QtdAmount?: number;
    YtdAmount?: number;
    AdjustmentAmount?: number;
    AdjustmentHours?: number;
    Items: Array<EmployeePreviewItemType>;
};

export type EmployeePreviewItemType = {
    UniqueId: string;
    Level: number;
    ParentId: string;
    Name: string;
    ItemTypeName: string;
    ItemType: number;
    ItemId: number;
    CurrentAmount: number;
    CurrentHours?: number;
    LimitedTaxableWages?: number;
    TotalTaxableWages?: number;
    MtdAmount?: number;
    QtdAmount?: number;
    YtdAmount?: number;
    AdjustmentAmount?: number;
    AdjustmentHours?: number;
    IsNISplitDetails?: boolean;
    IsNI?: boolean;
    NiTaxId?: number;
};
