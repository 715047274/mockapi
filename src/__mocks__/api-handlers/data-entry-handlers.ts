import { rest, graphql } from 'msw';
import { ModuleEnum } from '@models/enums/ModuleEnum';
import {
    getQuickEntries,
    createQuickEntryMock,
    deleteQuickEntryMock,
    getProjectsMock,
    getDocketsMock,
    getQuickEntryBundle,
    getQuickEntrySavedByFilterMockOptions,
    getQuickEntryImportSetFilterMockOptions,
} from '@mocks/api/data-entry/quick-entry/quick-entry-provider';
import {
    getChecks,
    upsertCheckMock,
    deleteCheckMock,
    getCheckBundle,
    getPayEntryAdjustmentBatchPropertyDataMock,
    getCaIncomeTaxCalcMethodsMock,
    getVoidableChecksMock,
} from '@mocks/api/data-entry/check/check-provider';
import {
    deleteAdjustmentMock,
    getAdjustmentBundle,
    getAdjustmentSavedByFilterMockOptions,
    getAdjustments,
    upsertAdjustmentMock,
} from '@mocks/api/data-entry/adjustment/adjustment-provider';
import {
    getTimeData,
    getEmployeeTimeEntries,
    getTimeDataImportIdentifierMockOptions,
    getTimeDataSourcesMockOptions,
} from '@mocks/api/data-entry/time-data/time-data-provider';
import {
    getActiveThirdPartySickPayProviders,
    getThirdPartySickPayTaxExemptions,
} from '@mocks/api/third-party-sick-pay/third-party-sick-pay';
import {
    getPayRunCodes,
    getCodesByIds,
    getEarningAmountTypes,
    getTaxCodes,
    getWageAttachmentCodesByIds,
    getStateUnemploymentInsurancePayrollTaxes,
    getTaxAuthorityInstanceCtsCodes,
    getLegalEntityEmployeeInsurances,
} from '@mocks/api/code/code-provider';
import { getCheckTemplates } from '@mocks/api/code/check-templates';
import { getEmploymentStatus } from '@mocks/api/employment-status/employment-status';
import {
    getWcbAccountsMockAsync,
    getWcbCodesMockAsync,
} from '@mocks/api/wcb/wcbAccountsCodes';
import { getCheckTypes } from '@mocks/api/code/check-types';
import { getPayrollReasons } from '@mocks/api/code/payroll-reasons';
import { getWageAttachmentOrderedAmountTypesAsyncMock } from '@mocks/api/wage-attachment';
import { payHolidays } from '@mocks/api/holidays/pay-hoidays';
import { getAdjustmentTypes } from '@mocks/api/code/adjustment-types';
import { getDistributionCodes } from '@mocks/api/code/distribution-codes';
import { sleep } from '@utils/FuncUtils';
import { getEndpoint } from '@mocks/api-handlers/handler-utils';
import { getWageTypes } from '@mocks/api/code/wage-types';

const quickEntryGraphql = graphql.link(getEndpoint(ModuleEnum.QuickEntry));
const checkGraphql = graphql.link(getEndpoint(ModuleEnum.Check));
const adjustmentGraphql = graphql.link(getEndpoint(ModuleEnum.Adjustment));
const timeDataGraphql = graphql.link(getEndpoint(ModuleEnum.TimeData));
const thirdPartySickPayGraphql = graphql.link(
    getEndpoint(ModuleEnum.ThirdPartySickPay)
);
const payHolidayGraphql = graphql.link(getEndpoint(ModuleEnum.PayHoliday));
const codeGraphql = graphql.link(getEndpoint(ModuleEnum.Code));
const payRunsGraphql = graphql.link(getEndpoint(ModuleEnum.PayRuns));

export const dataEntryHandlers = [
    //#region quick entry
    quickEntryGraphql.query('quickEntries', (req, res, ctx) => {
        const { pagingParams, filters, sortingParams } = req.variables;
        return res(
            ctx.data(getQuickEntries({ pagingParams, filters, sortingParams }))
        );
    }),
    quickEntryGraphql.query('quickEntriesWithStaging', (req, res, ctx) => {
        const { pagingParams, filters, sortingParams } = req.variables;
        return res(
            ctx.data(getQuickEntries({ pagingParams, filters, sortingParams }))
        );
    }),
    quickEntryGraphql.query('quickEntriesSavedBy', (req, res, ctx) => {
        return res(
            ctx.data({
                quickEntriesSavedBy: getQuickEntrySavedByFilterMockOptions(),
            })
        );
    }),
    quickEntryGraphql.query('quickEntriesImportSets', (req, res, ctx) => {
        return res(
            ctx.data({
                quickEntriesImportSets:
                    getQuickEntryImportSetFilterMockOptions(),
            })
        );
    }),
    rest.post(
        getEndpoint(ModuleEnum.QuickEntryMutation),
        async (req, res, ctx) => {
            const { variables, operationName } = await req.json();
            let data: any;
            switch (operationName) {
                case 'createQuickEntry': {
                    await sleep(1000);
                    data = createQuickEntryMock(variables?.quickEntries[0]);
                    break;
                }
                case 'deleteQuickEntry': {
                    data = {
                        deleteQuickEntry: deleteQuickEntryMock(
                            variables?.quickEntries
                        ),
                    };
                    break;
                }
            }
            return res(ctx.json({ data: data }));
        }
    ),
    quickEntryGraphql.query('quickEntryBundle', async (req, res, ctx) => {
        await sleep(2000);
        return res(ctx.data(getQuickEntryBundle(req)));
    }),
    adjustmentGraphql.query('adjustmentBundle', async (req, res, ctx) => {
        await sleep(4000);
        return res(ctx.data(getAdjustmentBundle(req)));
    }),
    quickEntryGraphql.query('searchProjects', (req, res, ctx) => {
        return res(
            ctx.data(
                getProjectsMock(
                    req?.variables?.maxResults,
                    req?.variables?.term
                )
            )
        );
    }),
    quickEntryGraphql.query('searchDockets', (req, res, ctx) => {
        return res(
            ctx.data(
                getDocketsMock(req?.variables?.maxResults, req?.variables?.term)
            )
        );
    }),
    //#endregion quick entry

    //#region adjustment
    adjustmentGraphql.query('adjustments', (req, res, ctx) => {
        const { pagingParams, filters, sortingParams } = req.variables;
        return res(
            ctx.data(getAdjustments({ pagingParams, filters, sortingParams }))
        );
    }),
    adjustmentGraphql.query('adjustmentsSavedBy', (req, res, ctx) => {
        return res(
            ctx.data({
                adjustmentsSavedBy: getAdjustmentSavedByFilterMockOptions(),
            })
        );
    }),

    rest.post(
        getEndpoint(ModuleEnum.AdjustmentMutation),
        async (req, res, ctx) => {
            const { variables, operationName } = await req.json();
            let data: any;
            switch (operationName) {
                case 'upsertAdjustment': {
                    await sleep(1000);
                    data = upsertAdjustmentMock(
                        variables?.adjustments,
                        variables?.entries
                    );
                    break;
                }
                case 'deleteAdjustment': {
                    await sleep(1000);
                    data = {
                        deleteAdjustment: deleteAdjustmentMock(
                            variables.deleteAdjustments
                        ),
                    };
                    break;
                }
            }
            return res(ctx.json({ data }));
        }
    ),
    //#endregion adjustment

    //#region time data entry
    timeDataGraphql.query('timeData', (req, res, ctx) => {
        const { pagingParams, filters, sortingParams } = req.variables;
        return res(
            ctx.data(getTimeData({ pagingParams, filters, sortingParams }))
        );
    }),
    timeDataGraphql.query('employeeTimeEntryDetails', (req, res, ctx) => {
        const { pagingParams, filters, sortingParams } = req.variables;
        return res(
            ctx.data(
                getEmployeeTimeEntries({ pagingParams, filters, sortingParams })
            )
        );
    }),
    timeDataGraphql.query('timeDataImportIdentifier', (req, res, ctx) => {
        return res(ctx.data(getTimeDataImportIdentifierMockOptions()));
    }),
    timeDataGraphql.query('timeDataSources', (req, res, ctx) => {
        return res(ctx.data(getTimeDataSourcesMockOptions()));
    }),
    //#endregion time data entry

    //#region check
    checkGraphql.query('checks', (req, res, ctx) => {
        const { pagingParams, filters, sortingParams } = req.variables;
        return res(
            ctx.data(getChecks({ pagingParams, filters, sortingParams }))
        );
    }),
    rest.post(getEndpoint(ModuleEnum.CheckMutation), async (req, res, ctx) => {
        const { variables, operationName } = await req.json();
        let data: any;
        switch (operationName) {
            case 'upsertCheck': {
                await sleep(1000);
                data = upsertCheckMock(
                    variables?.checks[0],
                    variables?.checkEntries
                );
                break;
            }
            case 'deleteCheck': {
                await sleep(1000);
                data = {
                    deleteCheck: deleteCheckMock(variables.deleteCheckInput),
                };
                break;
            }
        }
        return res(ctx.json({ data }));
    }),
    checkGraphql.query('checkBundle', async (req, res, ctx) => {
        await sleep(2000);
        return res(ctx.data(getCheckBundle(req)));
    }),
    checkGraphql.query(
        'payEntryAdjustmentBatchPropertyData',
        (req, res, ctx) => {
            return res(ctx.data(getPayEntryAdjustmentBatchPropertyDataMock()));
        }
    ),
    checkGraphql.query('caIncomeTaxCalcMethods', (req, res, ctx) => {
        return res(ctx.data(getCaIncomeTaxCalcMethodsMock()));
    }),
    checkGraphql.query('voidableChecks', (req, res, ctx) => {
        const { payGroupId, employeeId } = req.variables;
        return res(ctx.data(getVoidableChecksMock(payGroupId, employeeId)));
    }),
    //#endregion check

    //#region third party sick pay
    thirdPartySickPayGraphql.query(
        'activeThirdPartySickPayProviders',
        (req, res, ctx) => {
            return res(ctx.data(getActiveThirdPartySickPayProviders()));
        }
    ),
    thirdPartySickPayGraphql.query(
        'thirdPartySickPayTaxExemptions',
        (req, res, ctx) => {
            return res(ctx.data(getThirdPartySickPayTaxExemptions()));
        }
    ),
    //#endregion third party sick pay

    //#region wage type
    codeGraphql.query('taxWageTypes', (req, res, ctx) => {
        return res(ctx.data(getWageTypes()));
    }),
    //#endregion wage type

    //#region Pay Holiday
    payHolidayGraphql.query('payHolidays', (req, res, ctx) => {
        return res(ctx.data({ payHolidays }));
    }),
    //#endregion Pay Holiday

    //#region codes
    codeGraphql.query('codes', (req, res, ctx) => {
        const { countryCode, codes } = req.variables;
        return res(
            ctx.data({
                codes: getCodesByIds(countryCode, codes),
            })
        );
    }),
    codeGraphql.query('payRunCodes', (req, res, ctx) => {
        // const { payRunId } = req.variables;
        return res(ctx.data(getPayRunCodes()));
    }),
    codeGraphql.query('checkTemplates', (req, res, ctx) => {
        return res(ctx.data(getCheckTemplates()));
    }),
    codeGraphql.query('checkTypes', (req, res, ctx) => {
        return res(ctx.data(getCheckTypes()));
    }),
    codeGraphql.query('payrollReasons', (req, res, ctx) => {
        return res(ctx.data(getPayrollReasons()));
    }),
    codeGraphql.query('earningAmountTypes', (req, res, ctx) => {
        return res(ctx.data(getEarningAmountTypes()));
    }),
    codeGraphql.query('payRunTaxCodes', (req, res, ctx) => {
        const { payRunId } = req.variables;
        return res(ctx.data(getTaxCodes(payRunId)));
    }),
    codeGraphql.query('wcbAccounts', (req, res, ctx) => {
        return res(ctx.data(getWcbAccountsMockAsync()));
    }),
    codeGraphql.query('wcbCodes', (req, res, ctx) => {
        return res(ctx.data(getWcbCodesMockAsync()));
    }),
    codeGraphql.query('wageAttachmentOrderedAmountTypes', (req, res, ctx) => {
        return res(ctx.data(getWageAttachmentOrderedAmountTypesAsyncMock()));
    }),
    codeGraphql.query('employmentStatus', (req, res, ctx) => {
        return res(ctx.data(getEmploymentStatus()));
    }),
    codeGraphql.query('employeeWageAttachmentCodesByIds', (req, res, ctx) => {
        return res(
            ctx.data(getWageAttachmentCodesByIds(req.variables.codeIds))
        );
    }),
    codeGraphql.query('adjustmentTypes', (req, res, ctx) => {
        return res(ctx.data(getAdjustmentTypes()));
    }),
    codeGraphql.query(
        'stateUnemploymentInsurancePayrollTaxes',
        (req, res, ctx) => {
            // const { payRunId } = req.variables;
            return res(ctx.data(getStateUnemploymentInsurancePayrollTaxes()));
        }
    ),
    codeGraphql.query('legalEntityEmployeeInsurances', (req, res, ctx) => {
        // const { payRunId } = req.variables;
        return res(ctx.data(getLegalEntityEmployeeInsurances()));
    }),
    codeGraphql.query('taxAuthorityInstanceCtsCodes', (req, res, ctx) => {
        // const { payRunId } = req.variables;
        return res(ctx.data(getTaxAuthorityInstanceCtsCodes()));
    }),
    codeGraphql.query('distributionCodes', (req, res, ctx) => {
        return res(ctx.data(getDistributionCodes()));
    }),

    //#endregion codes

    //#region issue banners

    payRunsGraphql.query('dataEntryIssuesBannerGridData', (req, res, ctx) => {
        return res(ctx.data({ dataEntryIssuesBannerGridData: null }));
    }),

    //#end region
];
