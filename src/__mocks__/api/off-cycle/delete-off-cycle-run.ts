import { DeleteResponseType } from '@models/common/DeleteResponseTypes';
import { PayRunMessageCodeEnum } from '@models/enums/PayRunEnums';

let iteration = 0;

export const deleteOffCycleRunResponse = (): DeleteResponseType =>
    mockDeleteOffCycleRunResult[iteration++ % 2];

export const mockDeleteOffCycleRunResult: DeleteResponseType[] = [
    {
        success: false,
        messages: [
            {
                messageLabel:
                    'lblPayEntryLoadPayRunErrCantDeleteNonEmptyPayRun',
                messageLevel: PayRunMessageCodeEnum.Error,
            },
        ],
    },
    {
        success: true,
        messages: null,
    },
];
