import { ApiLookupResultType } from '@models/common/ApiResultTypes';

export interface IEmploymentStatusApi {
    getEmploymentStatusLookupAsync: (
        abortSignal?: AbortSignal
    ) => Promise<ApiLookupResultType | null>;
}
