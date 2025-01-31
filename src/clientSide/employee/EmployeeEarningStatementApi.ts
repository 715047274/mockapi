import { IEmployeeEarningStatementForCheckApi } from './IEmployeeEarningStatementApi';

import { ModuleEnum } from '@models/enums/ModuleEnum';
import { postModuleData } from '@api/common/FetchModuleData';
import { GetUrl } from '@utils/ApiUrlUtils';

export const EmployeeEarningStatmentForCheckApi: IEmployeeEarningStatementForCheckApi =
    {
        async isEmployeeEarningStatementForCheckDataReadyAsync(
            employeeId: number,
            payRunId: number,
            adjustmentBatchId: number,
            signal?: AbortSignal
        ): Promise<boolean> {
            const response = await postModuleData<boolean>(
                GetUrl(ModuleEnum.EmployeeEarningStatementForCheckDataIsReady),
                { employeeId, payRunId, adjustmentBatchId },
                {},
                {},
                false,
                signal
            );
            return response?.data ?? false;
        },
    };
