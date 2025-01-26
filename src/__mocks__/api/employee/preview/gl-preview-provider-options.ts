//const namesTopLevel = [
//    "Adjustment",
//    "Normal"
//];
const codes = {
    Earning: ['Regular', 'Overtime', 'Bonus'],
    'Net Pay': ['Net Pay'],
    Deduction: ['401k', 'Healthcare U-1'],
    Tax: ['Medicare', 'Soc Sec'],
    Garnishment: ['Spousal Support', 'Student Loan Garn'],
};
const journalNumbers = ['101', '123', '321', '202', '303'];
const debits = [303.03, 612.37, 981.65, 298.46];
const credits = [404.04, 345.64, 777.0];
const workLocations = ['Paper Shop-ME', 'Paper Shop-WA', 'Paper Shop-MT'];
const workLocationLedgerCodes = ['654', '543', '432'];
const jobAssignments = [
    'Store Manager',
    'Store Sales Associate',
    'Stock Distributor',
];
const jobAssignmentLedgerCodes = ['007', '006', '008'];
const legalEntities = ['Papyrus Emp.', 'Semper Vellum', 'Gleaming Ream LLC'];
const disbursementTypes = ['Direct Deposit', 'Pay Card', 'Net Check'];
const recordTypes = ['42', '451', '212'];
const levelLedgerCodes = ['First Level', 'Second Level', 'Third Level'];
const premiumIds = ['Premium-117', 'Premium-343'];

export const glPreviewMockOptions = {
    codeTypes: Object.keys(codes),
    codes,
    journalNumbers,
    debits,
    credits,
    workLocations,
    workLocationLedgerCodes,
    jobAssignments,
    jobAssignmentLedgerCodes,
    legalEntities,
    disbursementTypes,
    recordTypes,
    levelLedgerCodes,
    premiumIds,
};

const checkTypes = ['Additional', 'Manual', 'Onsite', 'Auto Void'];

export const checkFilterMockOptions = {
    checkTypes,
    legalEntities,
};
