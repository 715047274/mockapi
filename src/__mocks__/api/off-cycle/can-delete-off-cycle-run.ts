import { CanDeleteResponseType } from '@models/common/DeleteResponseTypes';
import { PayRunMessageCodeEnum } from '@models/enums/PayRunEnums';

let iteration = 0;

export const canDeleteOffCycleRunResponse = (): CanDeleteResponseType =>
    mockCanDeleteOffCycleRunResult[iteration++ % 3];

export const mockCanDeleteOffCycleRunResult: CanDeleteResponseType[] = [
    {
        canDelete: false,
        messages: [
            {
                messageLabel:
                    'lblPayEntryLoadPayRunErrCantDeleteNonEmptyPayRun',
                messageLevel: PayRunMessageCodeEnum.Error,
            },
        ],
    },
    {
        canDelete: true,
        messages: null,
    },
];
