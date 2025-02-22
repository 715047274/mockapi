import {getEmploymentStatus} from "../employmentStatus/employmentStatus.js";
import {EarningCodes} from '../../code/earningCodes.js'
import {DeductionCodes} from '../../code/deductionCodes.js'
import {TaxCodes } from '../../code/taxCodes.js'
import {CodeTypeEnum, EmploymentTypeCode} from "../../../constant/constant.js";

export const TOTAL_COUNT = 73;

export const getEmployeeNameWithId = ( total, searchTerm)=> {
    const { employeeName } = mockDataOptions;
    return Array(total * employeeName.length)
        .fill({ employeeId: null, employeeName: null })
        .map((_, idx) => {
            return {
                employeeId: idx + 1,
                employeeName:
                    employeeName[idx % employeeName.length] + ` ${idx}`,
            };
        })
        .filter((en) =>
            en.employeeName
                .toLowerCase()
                .includes((searchTerm ?? '').toLowerCase())
        )
        .slice(0, total);
};

const employeeWorkAssignmentsTemplate = {
    uniqueId: null,
    employeeWorkAssignmentId: null,
    deptJobId: null,
    jobAssignmentDisplayName: null,
    orgUnitId: null,
    orgUnitDisplayName: null,
    legalEntityId: null,
    legalEntityName: null,
    isPrimary: false,
    isCurrent: true,
    laborPercentage: null,
    isPrimaryPerLegalEntity: null,
    payRate: null,
    effectiveStart: null,
    effectiveEnd: null,
};

export const mockDataOptions = {
    payEntryBatchDataId: Array(TOTAL_COUNT)
        .fill(0)
        .map((_, idx) => idx + 1),
    employeeId: Array(TOTAL_COUNT)
        .fill(0)
        .map((_, idx) => idx + 1),
    employeeName: [
        'Amélie Lacroix',
        'Hana Song',
        'John Doe',
        "Moira O'Deorain",
        'Jean-Baptiste Augustin',
        'Oleg Wójcik',
        'Aziz Perumal',
        'Ekrem Suca',
        'Ellen Kooij',
        'Bruno Barajas',
        'Asha Lila',
        'Sylvia Avila',
        'Jon Horner',

        'Nikola Nele',
        'Daler Edda',
        'Tatjana Therese',
        'Ezras Kyllikki',
        'Piero Amita',
        'Eudora Herbert',
        'Varvara Rahul',
        'Plutarch Eos',
    ],
    codes: [...EarningCodes, ...DeductionCodes, ...TaxCodes],
    hours: [20, 125, 35, 40, 45],
    rate: [17.5, 19.3, 36.57, 22],
    percent: [null, null, null, null, null, null, null, 26.1279, 6],
    amount: [350, 2412.5, 1279.95, 990],
    lastUpdated: ['01/04/2023', '12/05/2022', '05/12/2022'],
    lastUpdatedTime: ['1:22:33 PM', '2:33:44 PM', '3:44:55 AM'],
    workAssignmentId: 1,
    employmentTypes: [
        EmploymentTypeCode.EMPLOYEE,
        EmploymentTypeCode.CONTRACTOR,
        EmploymentTypeCode.PENSIONER,
    ],
    employeeTaxes: TaxCodes,
    employeeWageAttachments: [
        {
            uniqueId: '4~2',
            codeId: 2,
            codeTypeId: CodeTypeEnum.WageAttachment,
            shortName: 'Wage 1',
            isPayEntryWageAttachment: true,
            garnishmentLimitAmount: 10,
            isActive: true,
            effectiveStart: '2020-01-01T00:00:00',
            effectiveEnd: null,
        },
        {
            uniqueId: '4~3',
            codeId: 3,
            codeTypeId: CodeTypeEnum.WageAttachment,
            shortName: 'Wage 2',
            isPayEntryWageAttachment: true,
            garnishmentLimitAmount: null,
            isActive: true,
            effectiveStart: '2020-01-01T00:00:00',
            effectiveEnd: null,
        },
    ],
    employeeWorkAssignments: [
        {
            ...employeeWorkAssignmentsTemplate,
            uniqueId: '1-1-1',
            employeeWorkAssignmentId: 1,
            deptJobId: 1,
            jobAssignmentDisplayName: 'QA Pos (QA)',
            orgUnitId: 1,
            orgUnitDisplayName: 'QA - Alaska Store',
            legalEntityId: 1,
            legalEntityName: 'ABC University',
            laborPercentage: 20,
            isPrimaryPerLegalEntity: true,
            payRate: 10,
        },
        {
            ...employeeWorkAssignmentsTemplate,
            uniqueId: '2-2-2',
            employeeWorkAssignmentId: 2,
            deptJobId: 2,
            jobAssignmentDisplayName: 'QA Pos1 (QA 1)',
            orgUnitId: 2,
            orgUnitDisplayName: 'QA - Alaska Store 1',
            legalEntityId: 2,
            legalEntityName: 'ABC University 1',
            laborPercentage: 30,
            isPrimaryPerLegalEntity: null,
            payRate: 20,
        },
        {
            ...employeeWorkAssignmentsTemplate,
            uniqueId: '3-3-3',
            employeeWorkAssignmentId: 3,
            deptJobId: 3,
            jobAssignmentDisplayName: 'QA Pos1 (QA 2)',
            orgUnitId: 3,
            orgUnitDisplayName: 'QA - Alaska Store 2',
            legalEntityId: 3,
            legalEntityName: 'ABC University 2',
            laborPercentage: 25,
            isPrimaryPerLegalEntity: null,
            payRate: 30,
        },
        {
            ...employeeWorkAssignmentsTemplate,
            uniqueId: '4-4-4',
            employeeWorkAssignmentId: 4,
            deptJobId: 4,
            jobAssignmentDisplayName: 'QA Pos1 (QA 3)',
            orgUnitId: 4,
            orgUnitDisplayName: 'QA - Alaska Store 3',
            legalEntityId: 4,
            legalEntityName: 'ABC University 3',
            isPrimary: false,
            isCurrent: false,
        },
    ],
    employeeWorkAssignmentsByDate: [
        {
            ...employeeWorkAssignmentsTemplate,
            uniqueId: '1-1-1',
            employeeWorkAssignmentId: 1,
            deptJobId: 1,
            jobAssignmentDisplayName: 'QA Pos (QA)',
            orgUnitId: 1,
            orgUnitDisplayName: 'QA - Alaska Store',
            legalEntityId: 1,
            legalEntityName: 'ABC University',
            laborPercentage: 20,
            isPrimaryPerLegalEntity: true,
            payRate: 10,
        },
        {
            ...employeeWorkAssignmentsTemplate,
            uniqueId: '2-2-2',
            employeeWorkAssignmentId: 2,
            deptJobId: 2,
            jobAssignmentDisplayName: 'QA Pos1 (QA 1)',
            orgUnitId: 2,
            orgUnitDisplayName: 'QA - Alaska Store 1',
            legalEntityId: 2,
            legalEntityName: 'ABC University 1',
            laborPercentage: 30,
        },
    ],
    laborMetrics: [
        {
            codeId: 0,
            displayName: 'System Activity',
        },
        {
            codeId: 1,
            displayName: 'Oblong (Box)',
        },
        {
            codeId: 2,
            displayName: 'Round (Box)',
        },
        {
            codeId: 3,
            displayName: 'Square (Box)',
        },
        {
            codeId: 4,
            displayName: 'Metal (Bucket)',
        },
        {
            codeId: 5,
            displayName: 'Plastic (Bucket)',
        },
        {
            codeId: 6,
            displayName: 'Wooden (Bucket)',
        },
        {
            codeId: 7,
            displayName: 'Blue (Color)',
        },
        {
            codeId: 8,
            displayName: 'Red (Color)',
        },
        {
            codeId: 9,
            displayName: 'Yellow (Color)',
        },
        {
            codeId: 10,
            displayName: 'Christmas (Fund)',
        },
        {
            codeId: 11,
            displayName: 'General (Fund)',
        },
        {
            codeId: 12,
            displayName: 'Slush (Fund)',
        },
    ],
    savedBy: [
        { savedByUserId: 1, savedByUserName: 'CAdmin' },
        { savedByUserId: 2, savedByUserName: 'Kumar P.' },
        { savedByUserId: 3, savedByUserName: 'Jürgen S.' },
        { savedByUserId: 4, savedByUserName: 'Michael L.' },
        { savedByUserId: 5, savedByUserName: 'Dara C.' },
    ],
    workLocations: [
        { orgUnitId: 1008, name: '103 - Lancaster' },
        { orgUnitId: 1041, name: '103 - Store' },
    ],
    employmentStatus: getEmploymentStatus().employmentStatus,
    importSets: [
        { name: 'Import Set 1', importSetId: 1 },
        { name: 'Import Set 2', importSetId: 2 },
        { name: 'Import Set 3', importSetId: 3 },
        { name: 'Import Set 4', importSetId: 4 },
        { name: 'Import Set 5', importSetId: 5 },
    ],
};
