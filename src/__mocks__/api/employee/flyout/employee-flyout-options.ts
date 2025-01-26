import { EmployeeProcessStateEnum } from '@models/enums/PayRunStatusEnums';

const employeeNames = [
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
];
const STATUS_SAMPLE = ['Active', 'Inactive', 'Terminated'];
export const processStateCodes = [
    EmployeeProcessStateEnum.BLOCKED,
    EmployeeProcessStateEnum.CALCULATING,
    EmployeeProcessStateEnum.CALCULATED,
    EmployeeProcessStateEnum.COMMITTED,
    EmployeeProcessStateEnum.NONE,
    EmployeeProcessStateEnum.CALCULATED_ERROR,
    EmployeeProcessStateEnum.COMMITTED_ERROR,
];
export const lastCalculatedOptions = [
    '2023-07-05T05:02:04',
    '2023-07-01T21:07:24',
    '2023-06-25T15:59:54',
    '2023-06-17T00:42:14',
];

export const employees = Array(100)
    .fill(undefined)
    .map((employee, trueIdx) => {
        const idx = trueIdx + 1;
        return {
            employeeId: idx,
            employeeNumber: '' + idx,
            employeeName: employeeNames[trueIdx % employeeNames.length],
            employmentStatus: STATUS_SAMPLE[idx % STATUS_SAMPLE.length],
        };
    });
