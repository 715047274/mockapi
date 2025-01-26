import { FieldIssueType, FormIssueType } from '@models/common/IssueTypes';
import { OffCycleFormType } from '@models/off-cycle';
import { getLabel, LabelGroup } from '@utils/LocalizationUtils';

type OffCycleFormIssuesKeys =
    | 'NO_COMMITTED_PAY_RUN_FOR_QUARTER_ERROR'
    | 'AUTO_SELECTED_LAST_RUN_OF_QUARTER_INFO';

export const OffCycleFormIssues: Record<
    OffCycleFormIssuesKeys,
    FormIssueType<OffCycleFormType>
> = {
    NO_COMMITTED_PAY_RUN_FOR_QUARTER_ERROR: {
        id: 'NoCommittedPayRunForQuarterError',
        type: 'Error',
        title: getLabel(
            LabelGroup.OffCycle,
            'NoCommittedPayRunForQuarterErrorMessageTitle'
        ),
        description: getLabel(
            LabelGroup.OffCycle,
            'NoCommittedPayRunForQuarterErrorMessage'
        ),
        fieldName: 'offCyclePayRunTypeId',
    },
    AUTO_SELECTED_LAST_RUN_OF_QUARTER_INFO: {
        id: 'AutoSelectedLastRunOfQuarterInfo',
        type: 'Information',
        title: getLabel(
            LabelGroup.OffCycle,
            'AutoSelectedLastRunOfQuarterMessageTitle'
        ),
        description: getLabel(
            LabelGroup.OffCycle,
            'AutoSelectedLastRunOfQuarterMessage'
        ),
        section: 'SourcePayRunCard',
    },
};

type OffCycleFieldIssuesKeys = 'CANNOT_CREATE_PRIOR_PERIOD_ADJUSTMENT_ERROR';

export const OffCycleFieldIssues: Record<
    OffCycleFieldIssuesKeys,
    FieldIssueType<OffCycleFormType>
> = {
    CANNOT_CREATE_PRIOR_PERIOD_ADJUSTMENT_ERROR: {
        id: 'CannotCreatePriorPeriodAdjustmentOffCycleError',
        fieldName: 'offCyclePayRunTypeId',
        type: 'error',
        errorMessage: getLabel(
            LabelGroup.OffCycle,
            'CannotCreatePriorPeriodAdjustmentOffCycleErrorMessage'
        ),
        errorMessagePrefix: getLabel(LabelGroup.Basic, 'GenericErrorWithColon'),
    },
};
