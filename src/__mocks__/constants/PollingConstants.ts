export const DEFAULT_INTERVAL = 10000;

export const PAYRUN_PROCESS_INTERVAL = DEFAULT_INTERVAL;
export const PAYROLL_OVERVIEW_INTERVAL = DEFAULT_INTERVAL;
export const PREVIEW_PROCESS_STATUS_POLLING_INTERVAL = 5000;

// PayRun Smart Polling
// For payroll committed the polling interval is 10 seconds
export const PAY_RUN_UPDATE_LONG_POLLING_INTERVAL = 10000;
// For payroll not committed the polling interval is 2 seconds
export const PAY_RUN_UPDATE_POLLING_INTERVAL = 2000;
export const FALL_BACK_POLLING_INTERVAL = 15000;
