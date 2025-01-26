import { OffCyclePayRunTypeCode } from '@models/enums/RunTypeEnums';
import { OffCycleRunTypeType } from '@models/off-cycle';

export const mockOffCycleRunTypes: OffCycleRunTypeType[] = [
    {
        offCyclePayRunTypeId: 1,
        shortName: 'Normal Off Cycle',
        codeName: OffCyclePayRunTypeCode.NORMAL,
    },
    {
        offCyclePayRunTypeId: 2,
        shortName: 'Record of Employment(ROE)',
        codeName: OffCyclePayRunTypeCode.ROE,
    },
    {
        offCyclePayRunTypeId: 3,
        shortName: 'Prior Period Adjustment',
        codeName: OffCyclePayRunTypeCode.PRIOR_PERIOD_ADJUSTMENT,
    },
    {
        offCyclePayRunTypeId: 4,
        shortName: 'Maintenance',
        codeName: OffCyclePayRunTypeCode.MAINTENANCE,
    },
    {
        offCyclePayRunTypeId: 5,
        shortName: 'Pay Period Adjustment',
        codeName: OffCyclePayRunTypeCode.PAY_PERIOD_ADJUSTMENT,
    },
    {
        offCyclePayRunTypeId: 6,
        shortName: 'On-Demand Pay Off Cycle',
        codeName: OffCyclePayRunTypeCode.ODP_OFFCYCLE,
    },
    {
        offCyclePayRunTypeId: 7,
        shortName: 'Auto Generate Elections',
        codeName: OffCyclePayRunTypeCode.AUTO_GENERATE_ALL_EMPLOYEES,
    },
    {
        offCyclePayRunTypeId: 8,
        shortName: 'AUS FBT Reporting',
        codeName: OffCyclePayRunTypeCode.AUS_FBT_REPORTING,
    },
    {
        offCyclePayRunTypeId: 9,
        shortName: 'Early Year Adjustment',
        codeName: OffCyclePayRunTypeCode.EARLY_YEAR_ADJUSTMENT,
    },
    {
        offCyclePayRunTypeId: 10,
        shortName: 'Recalculation Run',
        codeName: OffCyclePayRunTypeCode.DEU_RECALCULATION_AUTO,
    },
    {
        offCyclePayRunTypeId: 11,
        shortName: 'German March Clause Run',
        codeName: OffCyclePayRunTypeCode.DEU_MARCH_CLAUSE_AUTO,
    },
    {
        offCyclePayRunTypeId: 12,
        shortName: 'SGP New Hire OffCycle',
        codeName: OffCyclePayRunTypeCode.SGP_AUTO_GENERATE_NEW_HIRE_OFFCYCLE,
    },
    {
        offCyclePayRunTypeId: 13,
        shortName: 'Singapore Termination Off Cycle',
        codeName: OffCyclePayRunTypeCode.SGP_AUTO_GENERATE_TERMINATION_OFFCYCLE,
    },
];
