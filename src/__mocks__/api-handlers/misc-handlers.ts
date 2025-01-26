import { rest, graphql } from 'msw';
import { ModuleEnum } from '@models/enums/ModuleEnum';
import { getClientPayrollProperties } from '@mocks/api/client-payroll-property/client-payroll-property-provider';
import {
    getUserLayouts,
    bulkAddUserLayouts,
    modifyLayout,
    deleteUserLayoutsByCategory,
} from '@mocks/api/dashboard-layout/dashboard-layout-provider';
import {
    getLegalEntities,
    getLegalEntitiesByIds,
} from '@mocks/api/legal-entity/legal-entity-provider';
import { getReturnValueForGetFeatures } from '@mocks/api/feature-control/feature-control-provider';
import { getMockUserRole } from '@mocks/api/role';
import { GetUrl } from '@utils/ApiUrlUtils';
import { getEndpoint } from '@mocks/api-handlers/handler-utils';
import {
    getWageTaxOverview,
    GetWageTaxLegalEntity,
    GetEmployeeWageTax,
    GetEmployeeWageTaxLegalEntityFilterMockOptions,
} from '@mocks/api/wage-tax/wage-tax-provider';
import { mockRoleAccessAuthorizations } from '@mocks/api/role/role';
import {
    mockSaveUserPreference,
    mockUserPreferences,
} from '@mocks/api/user/user-preferences';

const clientPayrollPropertyGraphql = graphql.link(
    getEndpoint(ModuleEnum.ClientPayrollProperty)
);
const dashboardGraphql = graphql.link(getEndpoint(ModuleEnum.DashboardLayout));
const legalEntityGraphql = graphql.link(getEndpoint(ModuleEnum.LegalEntities));
const legalEntityInfoGraphql = graphql.link(
    getEndpoint(ModuleEnum.InfoLegalEntities)
);
const wageTaxGraphql = graphql.link(getEndpoint(ModuleEnum.WageTax));
const getRoleAccessAuthorizationsGraphql = graphql.link(
    getEndpoint(ModuleEnum.PayRuns)
);
const getUserPreferencesGraphql = graphql.link(
    getEndpoint(ModuleEnum.UserPreference)
);
const saveUserPreferenceGraphql = graphql.link(
    getEndpoint(ModuleEnum.UserPreferenceMutation)
);

export const miscHandlers = [
    legalEntityGraphql.query('legalEntitiesByPayRun', (req, res, ctx) => {
        const { payRunId } = req.variables;
        return res(
            ctx.data({ legalEntitiesByPayRun: getLegalEntities(payRunId) })
        );
    }),
    legalEntityInfoGraphql.query('legalEntitiesByIds', (req, res, ctx) => {
        const { legalEntityIds } = req.variables;
        return res(
            ctx.data({
                legalEntitiesByIds: getLegalEntitiesByIds(legalEntityIds),
            })
        );
    }),
    //#region client payroll property
    clientPayrollPropertyGraphql.query(
        'clientPayrollProperties',
        (req, res, ctx) => {
            const { codeName } = req.variables;
            return res(ctx.data(getClientPayrollProperties(codeName)));
        }
    ),
    //#endregion client payroll

    //#region user layout
    dashboardGraphql.query('userLayouts', (req, res, ctx) => {
        const { breakpoint } = req.variables;
        return res(ctx.data(getUserLayouts(breakpoint)));
    }),
    dashboardGraphql.mutation('bulkAddUserLayouts', (req, res, ctx) => {
        const { layouts } = req.variables;
        return res(ctx.data(bulkAddUserLayouts(layouts)));
    }),
    dashboardGraphql.mutation('modifyLayout', (req, res, ctx) => {
        const { id, layout } = req.variables;
        return res(ctx.data(modifyLayout(id, layout)));
    }),
    dashboardGraphql.mutation(
        'deleteUserLayoutsByCategory',
        (req, res, ctx) => {
            const { category } = req.variables;
            return res(ctx.data(deleteUserLayoutsByCategory(category)));
        }
    ),
    //#endregion user layout

    //#region feature control
    rest.post(GetUrl(ModuleEnum.GetFeatures), (req, res, ctx) => {
        return res(ctx.json({ ...getReturnValueForGetFeatures() }));
    }),
    //#endregion feature control

    //#region role
    rest.post(GetUrl(ModuleEnum.GetRole), (req, res, ctx) => {
        return res(ctx.json({ ...getMockUserRole() }));
    }),
    //#endregion role

    //#region wage and tax
    wageTaxGraphql.query('wageTaxOverview', (req, res, ctx) => {
        const { pagingParams, filters, sortingParams } = req.variables;
        return res(
            ctx.data(
                getWageTaxOverview({
                    pagingParams,
                    filters,
                    sortingParams,
                })
            )
        );
    }),

    wageTaxGraphql.query('wageTaxLegalEntity', (req, res, ctx) => {
        const { pagingParams, filters, sortingParams } = req.variables;
        return res(
            ctx.data(
                GetWageTaxLegalEntity({
                    pagingParams,
                    filters,
                    sortingParams,
                })
            )
        );
    }),

    wageTaxGraphql.query('employeeWageTax', (req, res, ctx) => {
        const { filters } = req.variables;
        return res(
            ctx.data(
                GetEmployeeWageTax({
                    filters,
                })
            )
        );
    }),

    wageTaxGraphql.query('employeeWageTaxLegalEntity', (req, res, ctx) => {
        return res(
            ctx.data({
                employeeWageTaxLegalEntity:
                    GetEmployeeWageTaxLegalEntityFilterMockOptions(),
            })
        );
    }),

    getRoleAccessAuthorizationsGraphql.query(
        'roleAccessAuthorizations',
        (req, res, ctx) => {
            return res(ctx.data(mockRoleAccessAuthorizations));
        }
    ),

    getUserPreferencesGraphql.query('userPreferences', (req, res, ctx) => {
        return res(ctx.data(mockUserPreferences));
    }),
    saveUserPreferenceGraphql.mutation(
        'saveUserPreference',
        (req, res, ctx) => {
            return res(ctx.data(mockSaveUserPreference));
        }
    ),
];
