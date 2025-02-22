import {EarningCodes} from '../../code/earningCodes.js'
import {DeductionCodes} from '../../code/deductionCodes.js'
import {TaxCodes } from '../../code/taxCodes.js'
import {ADJUSTMENT_TYPE_CODE, EmploymentTypeCode, THIRD_PARTY_SICK_PAY_TYPE_CODE} from "../../../constant/constant.js";

const TOTAL_COUNT = 36;

export const getEmployeeNameWithId = ( total, searchTerm)=>{
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


export const mockDataOptions = {
    payEntryAdjustmentBatchId: Array(TOTAL_COUNT).fill(0).map((_, idx) => idx + 1),
    employeeId: Array(TOTAL_COUNT).fill(0).map((_, idx) => idx + 1),
    employeeName: [
    'Ellen Kooij',
    'Bruno Barajas',
    'Asha Lila',
    'Sylvia Avila',
    'Jon Horner',
    'Amélie Lacroix',
    'Hana Song',
    'John Doe',
    "Moira O'Deorain",
    'Jean-Baptiste Augustin',
    'Oleg Wójcik',
    'Aziz Perumal',
    'Ekrem Suca',
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
    employmentTypes: [
    EmploymentTypeCode.EMPLOYEE,
    EmploymentTypeCode.CONTRACTOR,
    EmploymentTypeCode.PENSIONER,
],
    adjustmentTypes: [
    {
        adjustmentTypeCode: ADJUSTMENT_TYPE_CODE,
        adjustmentTypeId: 4,
        adjustmentTypeName: 'Adjustment',
    },
    {
        adjustmentTypeCode: THIRD_PARTY_SICK_PAY_TYPE_CODE,
        adjustmentTypeId: 8,
        adjustmentTypeName: 'Third Party Sick Pay Adjustment',
    },
],
    savedBy: [
    { savedByUserId: 1, savedByUserName: 'CAdmin' },
    { savedByUserId: 2, savedByUserName: 'Kumar P.' },
    { savedByUserId: 3, savedByUserName: 'Jürgen S.' },
    { savedByUserId: 4, savedByUserName: 'Michael L.' },
    { savedByUserId: 5, savedByUserName: 'Dara C.' },
],
    employeePriorStateBundle: [
    { legalEntityId: 1, employeeStateCode: 'CA' },
    { legalEntityId: 2, employeeStateCode: 'SN' },
    { legalEntityId: 12, employeeStateCode: 'MX-MEX' },
    { legalEntityId: 3, employeeStateCode: 'NJ' },
],
    lastUpdated: ['12/05/2022', '05/12/2022', '01/04/2023'],
    lastUpdatedTime: ['11:24:33 PM', '4:23:54 PM', '6:24:57 AM'],
    laborMetrics: [
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
    employeeWorkAssignments: [
    {
        uniqueId: '1-1-1',
        employeeWorkAssignmentId: 1,
        deptJobId: 1,
        jobAssignmentDisplayName: 'QA Pos (QA)',
        orgUnitId: 1,
        orgUnitDisplayName: 'QA - Alaska Store',
        legalEntityId: 1,
        legalEntityName: 'ABC University',
        isPrimary: false,
        isCurrent: true,
        laborPercentage: 20,
        isPrimaryPerLegalEntity: true,
        payRate: 10,
    },
    {
        uniqueId: '2-2-2',
        employeeWorkAssignmentId: 2,
        deptJobId: 2,
        jobAssignmentDisplayName: 'QA Pos1 (QA 1)',
        orgUnitId: 2,
        orgUnitDisplayName: 'QA - Alaska Store 1',
        legalEntityId: 2,
        legalEntityName: 'ABC University 1',
        isPrimary: false,
        isCurrent: true,
        laborPercentage: 30,
        isPrimaryPerLegalEntity: null,
        payRate: 20,
    },
    {
        uniqueId: '3-3-3',
        employeeWorkAssignmentId: 3,
        deptJobId: 3,
        jobAssignmentDisplayName: 'QA Pos1 (QA 2)',
        orgUnitId: 3,
        orgUnitDisplayName: 'QA - Alaska Store 2',
        legalEntityId: 3,
        legalEntityName: 'ABC University 2',
        isPrimary: false,
        isCurrent: true,
        laborPercentage: 25,
        isPrimaryPerLegalEntity: null,
        payRate: 30,
    },
    {
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
        isPrimaryPerLegalEntity: null,
    },
],
    importSets: [
    { name: 'Import Set 1', importSetId: 1 },
    { name: 'Import Set 2', importSetId: 2 },
    { name: 'Import Set 3', importSetId: 3 },
    { name: 'Import Set 4', importSetId: 4 },
    { name: 'Import Set 5', importSetId: 5 },
],
};