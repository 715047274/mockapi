import {buildSchema} from "graphql";

const schema2 = buildSchema(`
    input ServiceContextInput {
        sessionTicket: String,
        controlDbKey: String,
        userId: Int,
        cultureId: Int,
        prSchemaVersions: [Int],    
    }     
    input OverviewPayRunFilterInput {
        filterType: String
        dateRangeStart: String
        dateRangeEnd: String
    }
    
    type UserPreference {
        userPreferenceId: ID!
        preferenceName: String!
        preferenceValue: String!
        isDefault: Boolean!
    }
    
    type RoleAccessAuthorization {
        roleAccessAuthorizationId: ID!
        codeName: String!
        canCreate: Boolean!
        canUpdate: Boolean!
        canRead: Boolean!
        canDelete: Boolean!
    }
    type PpN {
        shortName: String!
    }
    type PayRunPeriod {
        shortName: String!
        codeName: String!
    }
    type PayRunItem {
        payRunId: ID!
        payGroupId: ID!
        payGroupName: String!
        payGroupIdentifier: String!
        payGroupCalendarId: ID!
        countryCode: String!
        countryName: String!
        payPeriod: String!
        payPeriodSuffix: String!
        payPeriodDisplay: String!
        periodStart: String!
        periodEnd: String!
        effectiveDate: String!
        payDate: String!
        commitDate: String!
        payrollLocked: Boolean!
        payrollCommitted: Boolean!
        payrollCommittedDate: String
        isQuarterAmendment: Boolean!
        isYearEndAmendment: Boolean!
        hoursDisplayPrecisionInStatements: Int!
        payRunStatus: String!
        geoCountryId: ID!
        payRunDefId: ID!
        isIPSRun: Boolean!
        isFasterPayment: Boolean!
        payHolidayGroupId: ID!
        payRunDateOffset: Int!
        payImpoundDaysOffest: Int!
        isOffCyclePayRun: Boolean!
        offCyclePayRunId: ID!
        offCyclePayRunName: String!
        offCyclePayRunTypeId: ID!
        offCyclePayRunTypeCode: String!
        offCycleReasonId: ID!
        offCycleXRefCode: String!
        payEntryBatchId: ID!
        impoundDate: String
        glAccrualPercent: Float!
        ledgerCode1: String
        ledgerCode2: String
        isAlternateFunding: Boolean!
        isLateDepositRun: Boolean!
        isoCurrencyCode: String!
    }

    type PayRunWithProcessState {
        totalCount: Int!
        items: [PayRunItem!]!
    }  
    
     type OffCycleRunType {
        offCyclePayRunTypeId: ID!
        shortName: String!
        codeName: String!
    }
    
    type UserPayGroup {
        geoCountryId: ID!
        countryCode: String!
    }   
    
    type PayHoliday {
        payHolidayId: ID!
        holidayDate: String!
        shortName: String!
        xRefCode: String!
        isBankHoliday: Boolean!
        clientId: ID!
        geoCountryId: ID!
        countryCode: String!
        payHolidayGroupId: ID!
    }
    
    type PayrollReasonScope {
        reasonScopeId: ID!
        xRefCode: String!
    }
    
    type PayrollReason {
        reasonId: ID!
        shortName: String!
        countryIds: [ID!]!
        scopeIds: [ID!]!
        scopes: [PayrollReasonScope!]!
    }
    
    
  type Query {
     userPreferences(ctx: ServiceContextInput, preferenceName: String): [UserPreference!]!
     roleAccessAuthorizations(ctx: ServiceContextInput!, accessAuthorizationName: String): [RoleAccessAuthorization!]!
     payRunPeriods(ctx: ServiceContextInput!): [PayRunPeriod!]!
     ppNs(ctx: ServiceContextInput!): [PpN!]!
     payRunsWithProcessState(
        ctx: ServiceContextInput!
        skip: Int!
        take: Int!
        filter: OverviewPayRunFilterInput!
        searchTerm: String!
     ): PayRunWithProcessState!
     offCycleRunTypes(ctx: ServiceContextInput!): [OffCycleRunType!]!
     userPayGroups(ctx: ServiceContextInput!): [UserPayGroup!]!
     payHolidays(ctx: ServiceContextInput!): [PayHoliday!]!
     payrollReasons(ctx: ServiceContextInput!): [PayrollReason!]!
  }
`);

const root2 = {
    greeting: () => "Hello from GraphQL Module 2",
    roleAccessAuthorizations: () => "",
    userPreferences: () => "",
    payRunPeriods: () => ""

};

export {schema2, root2};
