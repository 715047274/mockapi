import { DeductionCodes } from '@mocks/api/code/deduction-codes';
import { EarningCodes } from '@mocks/api/code/earning-codes';

export const TOTAL_COUNT = 66;

export const getEmployeeNameWithId = (
    total: number,
    searchTerm?: string
): Array<any> => {
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
    amount: [350, 2412.5, 1279.95, 990],
    businessDate: [
        '2022-10-01T00:00:00+05:30',
        '2022-11-22T00:00:00+05:30',
        '2023-12-13T00:00:00+05:30',
        '2023-01-09T00:00:00+05:30',
        '2024-02-11T00:00:00+05:30',
        '2024-03-17T00:00:00+05:30',
    ],
    codes: [...EarningCodes, ...DeductionCodes],
    deptJobName: [
        'Store Cashier',
        'Sales Representative',
        'Store Manager',
        'Warehouse Associate',
        'Software Developer',
    ],
    docketName: [null, 'DL', 'DO', null, null, 'DA', 'DP'],
    flsaAdjustPeriodEnd: ['01/27/23', '02/19/23', '03/17/24', '04/05/24'],
    flsaAdjustPeriodStart: ['01/24/23', '02/16/23', '03/14/24', '04/02/24'],
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
    hours: [20, null, 125, null, 40, 45],
    importIdentifier: {
        timeDataImportIdentifiers: [
            { value: 'Identifer 1' },
            { value: 'Identifer 2' },
            { value: 'Identifer 3' },
            { value: 'Identifer 4' },
        ],
    },
    timeDataSources: {
        timeDataSources: [
            { value: '[NON-WFM DATA]' },
            { value: '[INTERNAL WFM]' },
            { value: '[TK API]' },
        ],
    },
    isRetro: [true, false, false, false],
    laborDeptJobName: [
        'Warehouse Associate',
        'Store Asst. Manager',
        'Software Developer',
        'Sales Representative',
        'Store Cashier',
    ],
    laborMetrics: [
        {
            laborMetricsCodeId: 1,
            laborMetricsCodeShortName: 'Metal (Bucket)',
            laborMetricsTypeShortName: null,
            laborMetricsTypeId: null,
        },
        null,
        {
            laborMetricsCodeId: 2,
            laborMetricsCodeShortName: 'Christmas (Fund)',
            laborMetricsTypeShortName: null,
            laborMetricsTypeId: null,
        },
        {
            laborMetricsCodeId: 3,
            laborMetricsCodeShortName: 'General (Fund)',
            laborMetricsTypeShortName: null,
            laborMetricsTypeId: null,
        },
        {
            laborMetricsCodeId: 4,
            laborMetricsCodeShortName: 'Slush (Fund)',
            laborMetricsTypeShortName: null,
            laborMetricsTypeId: null,
        },
        null,
    ],
    laborOrgUnitName: [
        'Santa Fe, NM',
        '105 - Store',
        'California Dept',
        'Rods & Reels-MO',
    ],
    lastUpdated: ['01/04/2022', '12/05/2023', '05/12/2024'],
    lastUpdatedTime: ['11:22:33', '22:33:44', '09:13:43', '23:44:55'],
    legalEntityName: ['LE Pro Shop', 'ABC University', 'Legal Inc', 'LE USA'],
    pieceQuantity: [20, 0, 34, 26, 40, 32],
    orgUnitName: [
        'Store 105, BC',
        'Santa Fe, NM',
        'Rods & Reels-MO',
        'California Dept.',
    ],
    payEntryBatchDataId: Array(TOTAL_COUNT)
        .fill(0)
        .map((_, idx) => idx + 1),
    projectName: [
        'New York',
        'Idaho',
        null,
        null,
        'Delaware',
        'Texas',
        'Michigan',
    ],
    rate: [17.5, null, 19.3, 36.57, 22],
    savedBy: ['CAdmin', 'Michael L.', 'Kumar P.', 'Jürgen S.', 'Dara C.'],
    comment: [
        'TK Demo Comment',
        'TK Demo Comment EL-DE0001',
        'TK Demo Comment IL-DE0001',
        'TK Demo Comment EE-MN0002',
        'TK Demo Comment EE-IL0002',
    ],
    batchName: [
        'batch name EE-MN2',
        'batch name EL-DE0001',
        'batch name EE-MN0002',
        'batch name EE-MN0004',
    ],
    sourceSystem: [
        '[INTERNAL WFM]',
        'ADP',
        'Kronos',
        '[NON-WFM DATA]',
        'Dayforce',
        'Source A',
        null,
        '[EXTERNAL]',
    ],
    trailingTaxationPeriodEnd: ['03/17/24', '01/27/23', '02/19/23', '04/05/24'],
    trailingTaxationPeriodStart: [
        '03/14/24',
        '01/24/23',
        '02/16/23',
        '04/02/24',
    ],
    weekNumber: ['Week 1', 'Week 2', 'Week 3', null, 'Week 4'],
};
