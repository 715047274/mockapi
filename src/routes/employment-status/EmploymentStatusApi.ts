import { query } from '@api/common/GraphqlUtil';
import { IEmploymentStatusApi } from './IEmploymentStatusApi';
import { ApiLookupResultType } from '@models/common/ApiResultTypes';
import { ModuleEnum } from '@models/enums/ModuleEnum';
import {
    convertToApiLookupResult,
    convertToApiErrorResult,
} from '@utils/ApiResultUtils';

import GetEmploymentStatusLookup from './graphql/GetEmploymentStatusLookup.graphql';

export const EmploymentStatusApi: IEmploymentStatusApi = {
    async getEmploymentStatusLookupAsync(
        abortSignal?: AbortSignal
    ): Promise<ApiLookupResultType | null> {
        const response = await query(
            GetEmploymentStatusLookup,
            { randomNumForAbort: Math.random() }, //NOSONAR - it thinks the random number is for cryptography
            ModuleEnum.LegalEntities,
            abortSignal
        ).catch((error) => {
            return convertToApiErrorResult({ error });
        });
        return convertToApiLookupResult(
            response,
            'employmentStatus',
            'employmentStatusId',
            'shortName'
        );
    },
};
