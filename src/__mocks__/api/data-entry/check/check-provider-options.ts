export const TOTAL_COUNT = 55;

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
    payEntryAdjustmentBatchId: Array.from(
        Array(TOTAL_COUNT),
        (_, idx) => idx + 1
    ),
    employeeId: Array.from(Array(TOTAL_COUNT), (_, idx) => idx + 1),
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
    checkTemplateName: [
        'Bonus',
        'Bonus Gross Up Normal Taxation',
        'Bonus Special',
        'Commission',
        'COVID CARES Retention',
        'COVID FFCRA Sick/Family',
        'Deceased',
        'Final Pay Out',
        'Gross Up - Supp Flat Rate',
        'Gross Up Fica Only',
        'Gross Up Prize',
        'Gross Up Tom',
        'Manual',
        'Manual - CARES Employee Retention',
        'Manual - FFCRA Leave Payments',
        'Manual without Employer Taxes',
        'Normal',
        'Off Cycle',
        'On-Demand',
        'Prior Period New Starters',
        'Regular',
        'Rollover',
        'Spot Bonus Gross Up',
    ],
    checkTypeName: [
        'Normal',
        'Manual',
        'Onsite',
        'Additional',
        'Adjustment',
        'Auto Void',
        'Third Party Sick Pay Adjustment',
        'On-Demand',
        'On-Demand True-Up',
        'Voided On-Demand',
    ],
    totalNetPay: [253, 612.5, 3259.95, 9290],
    savedBy: ['CAdmin', 'Kumar P.', 'Jürgen S.', 'Michael L.', 'Dara C.'],
    lastUpdated: ['12/05/2022', '05/12/2022', '01/04/2023'],
    lastUpdatedTime: ['11:24:33 PM', '4:23:54 PM', '6:24:57 AM'],
};
