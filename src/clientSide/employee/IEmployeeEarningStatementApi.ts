export interface IEmployeeEarningStatementForCheckApi {
    isEmployeeEarningStatementForCheckDataReadyAsync(
        employeeId: number,
        payRunId: number,
        adjustmentBatchId: number,
        signal?: AbortSignal
    ): Promise<boolean>;
}
