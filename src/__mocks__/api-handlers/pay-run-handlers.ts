import { rest, graphql } from 'msw';
import { ModuleEnum } from '@models/enums/ModuleEnum';
import { suffixFetch } from '@utils/AppModeUtil';
import {
    getEntryIssues,
    payRunPeriods,
    ppNs,
    priorPayRuns,
    getCalculationResult,
    getCommitResult,
    getPayRunProgress,
    getQuarterLastCommittedPayRun,
    getPayRunUpdateStatuses,
    getMultipleCalculationResult,
    getLastCalculatedTimestamps,
} from '@mocks/api/pay-run';
import {
    getPayRunEmployeeProcessStateCount,
    getPayRunsWithProcessState,
    pollPayRuns,
    getPayRunIssuesSummary,
    getLastCommittedPayRun,
    getPayRunIssues,
    getPayRunMessageTypes,
} from '@mocks/api/pay-run/pay-run-provider';
import {
    mockOffCycleRunTypes,
    canDeleteOffCycleRunResponse,
    deleteOffCycleRunResponse,
    getOffCycleSourcePayRun,
    saveOffCyclePayRunResponse,
} from '@mocks/api/off-cycle';
import { getDataEntrySummaryMock } from '@mocks/api/dashboard-layout/data-entry-summary-provider';
import { getPreviousPayRuns } from '@mocks/api/preview/preview-summary-provider';
import { getEndpoint } from '@mocks/api-handlers/handler-utils';
import {
    getGlExportDefinitionsMocked,
    requestPayrollDataExportMocked,
    requestGlCalculateMocked,
} from '@mocks/api/pay-run/prm-export';
import { mockUserPayGroups } from '@mocks/api/user/user-pay-groups';
import { mockDoInAuditResult } from '@mocks/api/pay-run/pay-run-status-change';
import { sleep } from '@utils/FuncUtils';
import { searchPayRunLaborMetricsMock } from '@mocks/api/pay-run/pay-run-labor-metrics';
const payRunGraphql = graphql.link(getEndpoint(ModuleEnum.PayRuns));
const payRunIssuesGraphql = graphql.link(getEndpoint(ModuleEnum.PayRunIssues));
const offCycleGraphql = graphql.link(getEndpoint(ModuleEnum.OffCycle));
const payRunProcessMutationGraphql = graphql.link(
    getEndpoint(ModuleEnum.PayRunProcessMutation)
);
const payRunProcessGraphql = graphql.link(
    getEndpoint(ModuleEnum.PayRunProcess)
);
const generalLedgerGraphql = graphql.link(
    getEndpoint(ModuleEnum.GeneralLedger)
);
const payRunLaborMetricsGraphql = graphql.link(
    getEndpoint(ModuleEnum.PayRunLabormetric)
);

export const payRunHandlers = [
    rest.post(
        getEndpoint(ModuleEnum.PayRuns) + suffixFetch(),
        async (req, res, ctx) => {
            const { variables } = await req.json();
            const { payRunIds } = variables;
            return res(ctx.json({ data: pollPayRuns(payRunIds) }));
        }
    ),
    payRunGraphql.query('payRunsWithProcessState', (req, res, ctx) => {
        return res(
            ctx.data({
                payRunsWithProcessState: getPayRunsWithProcessState(
                    req.variables
                ),
            })
        );
    }),
    payRunGraphql.query('userPayGroups', (req, res, ctx) => {
        return res(
            ctx.data({
                userPayGroups: mockUserPayGroups,
            })
        );
    }),
    payRunGraphql.query('payRunEmployeeProcessStateCount', (req, res, ctx) => {
        const { payRunIds } = req.variables;
        return res(
            ctx.data({
                payRunEmployeeProcessStateCount:
                    getPayRunEmployeeProcessStateCount(payRunIds),
            })
        );
    }),
    payRunGraphql.query('previousPayRuns', (req, res, ctx) => {
        const { payRunId } = req.variables;
        return res(ctx.data({ previousPayRuns: getPreviousPayRuns(payRunId) }));
    }),
    payRunGraphql.query('payRunMessageTypes', (req, res, ctx) => {
        const { payRunId } = req.variables;
        const returnDistinctShortName = true;
        return res(
            ctx.data({
                payRunMessageTypes: getPayRunMessageTypes(
                    payRunId,
                    returnDistinctShortName
                ),
            })
        );
    }),
    payRunIssuesGraphql.query('payRunIssues', (req, res, ctx) => {
        const { payRunId, issueType, skip, take, filters } = req.variables;
        return res(
            ctx.data({
                payRunIssues: getPayRunIssues({
                    filters: filters || [],
                    payRunId,
                    issueType,
                    skip,
                    take,
                }),
            })
        );
    }),
    payRunGraphql.query('entryIssues', (req, res, ctx) => {
        const { filters } = req.variables;
        const quickEntries = filters?.find(
            (filter) => filter.field === 'PRPayEntryBatchDataId'
        )?.parameterValue?.value;
        const payRunId = filters?.find((filter) => filter.field === 'PayRunId')
            ?.parameterValue?.value;
        return res(
            ctx.data({ entryIssues: getEntryIssues(payRunId, quickEntries) })
        );
    }),
    payRunGraphql.query('payRunIssuesSummary', (req, res, ctx) => {
        return res(
            ctx.data({
                payRunIssuesSummary: getPayRunIssuesSummary(),
            })
        );
    }),
    payRunGraphql.query('payRunPeriods', (req, res, ctx) => {
        return res(ctx.data({ payRunPeriods: payRunPeriods }));
    }),
    payRunGraphql.query('ppNs', (req, res, ctx) => {
        return res(ctx.data({ ppNs: ppNs }));
    }),
    payRunGraphql.query('lastCommittedPayRun', (req, res, ctx) => {
        return res(
            ctx.data({
                lastCommittedPayRun: getLastCommittedPayRun(
                    req.variables?.payGroupId
                ),
            })
        );
    }),
    payRunGraphql.query('priorPayRuns', (req, res, ctx) => {
        return res(ctx.data({ priorPayRuns: priorPayRuns }));
    }),
    payRunGraphql.query('dataEntriesSummary', (req, res, ctx) => {
        return res(
            ctx.data({
                dataEntriesSummary: getDataEntrySummaryMock(),
            })
        );
    }),
    payRunProcessGraphql.mutation('calculatePayRun', (req, res, ctx) => {
        const { payRunId } = req.variables;
        return res(
            ctx.data({ calculatePayRun: getCalculationResult(payRunId) })
        );
    }),
    payRunProcessGraphql.mutation('calculatePayRuns', (req, res, ctx) => {
        const { payRunIds } = req.variables;
        return res(
            ctx.data({
                calculatePayRuns: getMultipleCalculationResult(payRunIds),
            })
        );
    }),
    payRunProcessGraphql.mutation('commitPayRun', (req, res, ctx) => {
        const { payRunId } = req.variables;
        return res(ctx.data({ commitPayRun: getCommitResult(payRunId) }));
    }),
    payRunProcessGraphql.query('payRunProgress', (req, res, ctx) => {
        return res(
            ctx.data({
                payRunProgress: getPayRunProgress(req.variables),
            })
        );
    }),
    payRunProcessGraphql.query('compositePayRunStates', (req, res, ctx) => {
        const { payRunIds } = req.variables;
        return res(
            ctx.data({
                payRunProgress: getPayRunProgress(req.variables),
                payRunStates: getPayRunUpdateStatuses(payRunIds),
            })
        );
    }),
    payRunProcessGraphql.query(
        'payRunLastCalculatedTimestamps',
        (req, res, ctx) => {
            const { payRunIds } = req.variables;
            return res(
                ctx.data({
                    payRunLastCalculatedTimestamps:
                        getLastCalculatedTimestamps(payRunIds),
                })
            );
        }
    ),
    payRunProcessGraphql.query('PayRunStates', (req, res, ctx) => {
        const { payRunIds } = req.variables;
        return res(
            ctx.data({
                payRunStates: getPayRunUpdateStatuses(payRunIds),
            })
        );
    }),
    payRunGraphql.query('quarterLastCommittedPayRun', (req, res, ctx) => {
        return res(
            ctx.data({
                quarterLastCommittedPayRun: getQuarterLastCommittedPayRun(
                    req.variables?.payGroupId
                ),
            })
        );
    }),

    //#region offCycle
    payRunProcessMutationGraphql.mutation(
        'saveOffCyclePayRun',
        (req, res, ctx) => {
            const { offCyclePayRun } = req.variables;
            return res(
                ctx.data({
                    saveOffCyclePayRun:
                        saveOffCyclePayRunResponse(offCyclePayRun),
                })
            );
        }
    ),
    payRunProcessMutationGraphql.mutation(
        'deleteOffCycleRun',
        (req, res, ctx) => {
            return res(
                ctx.data({
                    deleteOffCycleRun: deleteOffCycleRunResponse(),
                })
            );
        }
    ),
    offCycleGraphql.query('offCycleRunTypes', (req, res, ctx) => {
        return res(ctx.data({ offCycleRunTypes: mockOffCycleRunTypes }));
    }),
    offCycleGraphql.query('offCycleSourcePayRun', (req, res, ctx) => {
        return res(
            ctx.data({
                offCycleSourcePayRun: getOffCycleSourcePayRun(
                    req.variables?.offCyclePayRunId ?? 1010
                ),
            })
        );
    }),
    offCycleGraphql.query('canDeleteOffCycleRun', (req, res, ctx) => {
        return res(
            ctx.data({
                canDeleteOffCycleRun: canDeleteOffCycleRunResponse(),
            })
        );
    }),
    payRunGraphql.query('payRunEmployeeCount', (req, res, ctx) => {
        return res(
            ctx.data({
                payRunEmployeeCount: {
                    payRunId: req.variables?.payRunId,
                    countOfEmployeesInPayrun: 120,
                },
            })
        );
    }),
    //#endregion offCycle

    //#region GL Export
    generalLedgerGraphql.query('glExportDefinitions', (req, res, ctx) => {
        const { payGroupId } = req.variables;
        return res(
            ctx.data({
                glExportDefinitions: getGlExportDefinitionsMocked(payGroupId),
            })
        );
    }),
    payRunProcessGraphql.mutation('requestGLCalculate', (req, res, ctx) => {
        const { payRunIds } = req.variables;
        return res(ctx.data(requestGlCalculateMocked(payRunIds)));
    }),
    payRunProcessGraphql.mutation(
        'requestPayrollDataExport',
        (req, res, ctx) => {
            const { payRunId } = req.variables;
            return res(ctx.data(requestPayrollDataExportMocked(payRunId)));
        }
    ),
    payRunProcessGraphql.mutation('inAuditPayRun', async (req, res, ctx) => {
        await sleep(2000);
        const { payRunId } = req.variables;
        return res(ctx.data({ ...mockDoInAuditResult, payRunId }));
    }),
    //#endregion GL Export

    payRunLaborMetricsGraphql.query(
        'searchPayRunLaborMetrics',
        (req, rest, ctx) => {
            return rest(ctx.data(searchPayRunLaborMetricsMock));
        }
    ),
];
