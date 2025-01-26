import { rest, graphql } from 'msw';
import { ModuleEnum } from '@models/enums/ModuleEnum';
import { VarianceStatusEnum } from '@models/enums/VarianceStatusEnum';
import { GetUrl } from '@utils/ApiUrlUtils';
import {
    getPreviewSummary,
    getPreviewCodes,
    getPreviewProcessStatus,
    getPreviewPayment,
    getPaymentItems,
} from '@mocks/api/preview/preview-summary-provider';
import { getFilterLookups } from '@mocks/api/legal-entity/legal-entity-provider';
import { generateEmployeeGlPreviewType } from '@mocks/api/employee/preview/gl-preview-provider';
import {
    getEmployeeAllChangesSummaryMock,
    getEmployeeChangesSummaryMock,
} from '@mocks/api/employee/employee-changes-summary-provider';
import { getEmployeePreviews } from '@mocks/api/employee/employee-preview-provider';
import {
    getEmployees1Mock,
    getEmployeesCodeDetailsMock,
    getpreviewEmployeesByFiltersMock,
    getEmployeesPaymentDetailsMock,
} from '@mocks/api/employee/employee-preview-summary-options';
import { getEndpoint } from '@mocks/api-handlers/handler-utils';

const employeePreviewGraphql = graphql.link(
    getEndpoint(ModuleEnum.EmployeePreview)
);
const previewGraphql = graphql.link(
    getEndpoint(ModuleEnum.PayRunPreviewSummary)
);

export const previewHandlers = [
    //#region earning statement
    rest.post(
        GetUrl(ModuleEnum.EmployeeEarningStatementHeaders),
        (req, res, ctx) => {
            return res(ctx.json([{ uniqueId: 1, title: '' }]));
        }
    ),
    //#endregion earning statement

    //#region preview
    rest.post(
        getEndpoint(ModuleEnum.RequestPreviewEmployeeCaching),
        (req, res, ctx) => {
            return res(ctx.json(true));
        }
    ),
    rest.post(
        getEndpoint(ModuleEnum.RequestPreviewDataWarmup),
        (req, res, ctx) => {
            return res(ctx.json(true));
        }
    ),
    previewGraphql.query('previewSummary', (req, res, ctx) => {
        const { legalEntityIds } = req.variables;
        return res(
            ctx.data({
                previewSummary: getPreviewSummary(legalEntityIds),
            })
        );
    }),

    previewGraphql.query('previewPaymentSummary', (req, res, ctx) => {
        const { payRunId, toComparePayRunId, legalEntityIds } = req.variables;
        return res(
            ctx.data({
                previewPaymentSummary: getPreviewPayment(
                    payRunId,
                    toComparePayRunId,
                    legalEntityIds
                ),
            })
        );
    }),

    previewGraphql.query('previewPaymentItems', (req, res, ctx) => {
        const {
            payRunId,
            toComparePayRunId,
            legalEntityIds,
            skip,
            take,
            summaryItemType,
        } = req.variables;
        return res(
            ctx.data(
                getPaymentItems(
                    payRunId,
                    summaryItemType,
                    toComparePayRunId,
                    legalEntityIds,
                    skip,
                    take
                )
            )
        );
    }),

    previewGraphql.query('paymentTotalItemsLegalCount', (req, res, ctx) => {
        return res(ctx.data({ paymentTotalItemsLegalCount: 3 }));
    }),

    previewGraphql.query('previewProcessStatus', (req, res, ctx) => {
        return res(
            ctx.data({
                previewProcessStatus: getPreviewProcessStatus(),
            })
        );
    }),

    previewGraphql.query('previewCodeLevelSummary', (req, res, ctx) => {
        const {
            payRunId,
            toComparePayRunId,
            legalEntityIds,
            skip,
            take,
            itemType,
        } = req.variables;
        return res(
            ctx.data(
                getPreviewCodes(
                    payRunId,
                    itemType,
                    toComparePayRunId,
                    legalEntityIds,
                    skip,
                    take
                )
            )
        );
    }),

    previewGraphql.query(
        'previewFilterLookUpValuesByPayRun',
        (req, res, ctx) => {
            const { payRunId } = req.variables;
            return res(
                ctx.data({
                    previewFilterLookUpValuesByPayRun:
                        getFilterLookups(payRunId),
                })
            );
        }
    ),
    //#endregion preview

    //#region employee preview
    employeePreviewGraphql.query('previewEmployee', (req, res, ctx) => {
        const { employeeId, payRunId, toComparePayRunId, legalEntityIds } =
            req.variables;
        return res(
            ctx.data({
                previewEmployee: getEmployeePreviews(
                    employeeId,
                    payRunId,
                    toComparePayRunId,
                    legalEntityIds
                ),
            })
        );
    }),
    employeePreviewGraphql.query(
        'previewOverThresholdEmployees',
        (req, res, ctx) => {
            return res(
                ctx.data({
                    previewOverThresholdEmployees: {
                        totalCount: 5,
                        employeeIds: [6, 7, 8, 9, 10],
                    },
                })
            );
        }
    ),
    employeePreviewGraphql.query(
        'previewEmployeeSummaries',
        (req, res, ctx) => {
            const { employeeIds } = req.variables;
            return res(
                ctx.data({
                    previewEmployeeSummaries: getEmployees1Mock(employeeIds),
                })
            );
        }
    ),
    employeePreviewGraphql.query(
        'previewCodeLevelEmployeeDetails',
        (req, res, ctx) => {
            const { skip, take, legalEntityIds } = req.variables;
            return res(
                ctx.data({
                    previewCodeLevelEmployeeDetails:
                        getEmployeesCodeDetailsMock(
                            { skip, take },
                            legalEntityIds
                        ),
                })
            );
        }
    ),

    employeePreviewGraphql.query('paymentEmployeeDetails', (req, res, ctx) => {
        const { skip, take } = req.variables;
        return res(
            ctx.data({
                paymentEmployeeDetails: getEmployeesPaymentDetailsMock({
                    skip,
                    take,
                }),
            })
        );
    }),

    employeePreviewGraphql.query(
        'previewEmployeeLegalEntities',
        (req, res, ctx) => {
            const { payRunId, employeeId } = req.variables;
            return res(
                ctx.data({
                    previewEmployeeLegalEntities: getFilterLookups(
                        payRunId,
                        employeeId
                    ),
                })
            );
        }
    ),

    employeePreviewGraphql.query(
        'filteredPreviewEmployees',
        (req, res, ctx) => {
            const { filter, skip, take } = req.variables;
            const { legalEntityIds, employmentStatusIds, codeIds, searchTerm } =
                filter;
            const { employees, totalCount } = getpreviewEmployeesByFiltersMock(
                { skip, take },
                searchTerm,
                legalEntityIds,
                codeIds,
                employmentStatusIds
            );
            return res(
                ctx.data({
                    filteredPreviewEmployees: {
                        totalCount: totalCount,
                        items: employees,
                        varianceStatus: VarianceStatusEnum.VarianceReady,
                        filterUniqueId: null,
                    },
                })
            );
        }
    ),

    employeePreviewGraphql.query('employeeChangesSummary', (req, res, ctx) => {
        const { payRunId, employmentStatusType } = req.variables;
        return res(
            ctx.data({
                employeeChangesSummary: getEmployeeChangesSummaryMock(
                    employmentStatusType,
                    payRunId
                ),
            })
        );
    }),

    employeePreviewGraphql.query(
        'allEmployeeChangesSummary',
        (req, res, ctx) => {
            return res(
                ctx.data({
                    allEmployeeChangesSummary:
                        getEmployeeAllChangesSummaryMock(),
                })
            );
        }
    ),

    //#endregion employee preview

    //#region gl preview
    employeePreviewGraphql.query('employeeGLPreview', (req, res, ctx) => {
        const { employeeId } = req.variables;
        return res(
            ctx.data({
                employeeGLPreview: generateEmployeeGlPreviewType(employeeId),
                /*{
                    glPreviewFilters: generateCheckFilters(6, employeeId),
                    items: generateGlPreviewEntries(
                        24,
                        employeeId
                    ),
                }*/
            })
        );
    }),
    //#endregien glpreview
];
