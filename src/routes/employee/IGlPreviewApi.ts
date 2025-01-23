import { EmployeeGlPreviewType } from '@models/preview/GlPreviewType';

export interface IGlPreviewApi {
    getEmployeeGLPreviewAsync(
        payRunId: number,
        employeeId: number,
        signal?: AbortSignal
    ): Promise<{ data: EmployeeGlPreviewType; error?: string }>;
}
