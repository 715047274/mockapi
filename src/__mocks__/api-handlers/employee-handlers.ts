import { rest, graphql } from 'msw';
import { ModuleEnum } from '@models/enums/ModuleEnum';
import { CalculateStatus } from '@mocks/api/employee-calculate-status/EmployeeStatus';
import {
    getEmployeeTaxCodesMock,
    getEmployeeWageAttachmentCodesMock,
    getEmployeeWorkAssignmentsMock,
    searchEmployeesMock,
    getLaborMetricsMock,
    getEmployeePayrollTaxSubBundleMock,
    getEmployeeWorkAssignmentsByDateMock,
    getEmployeePersonAddressMock,
    getEmployeeEstateInfoMock,
} from '@mocks/api/data-entry/quick-entry/quick-entry-provider';
import {
    getEmployeeRate,
    getEmployeesMock1,
} from '@mocks/api/employee/employee-provider';
import { getEmployeeFlyoutBaseInfoMock } from '@mocks/api/employee/flyout/employee-flyout-provider';
import {
    mockDataOption2,
    makeEmployeeProcessStateMockData,
} from '@mocks/api/employee/employee-preview-summary-options';
import { searchEmployeesForAdjustmentMock } from '@mocks/api/data-entry/adjustment/adjustment-provider';
import { getEmployeePsdCodes } from '@mocks/api/employee/employee-psd-codes';
import { employeePriorStateBundle } from '@mocks/api/employee/employee-prior-state-bundle';
import { getEndpoint } from '@mocks/api-handlers/handler-utils';

const employeeGraphql = graphql.link(getEndpoint(ModuleEnum.Employee));
const employeeFlyoutGraphql = graphql.link(
    getEndpoint(ModuleEnum.EmployeeFlyout)
);

export const employeeHandlers = [
    employeeGraphql.query('payRunEmployees', (req, res, ctx) => {
        const { skip, take, payRunId, searchTerm, employeeIds } = req.variables;
        return res(
            ctx.data({
                payRunEmployees: getEmployeesMock1({
                    skip,
                    take,
                    payRunId,
                    searchTerm,
                    employeeIds,
                }),
            })
        );
    }),
    employeeGraphql.query('searchEmployees', (req, res, ctx) => {
        return res(
            ctx.data(
                searchEmployeesMock(
                    req?.variables?.maxResults,
                    req?.variables?.term
                )
            )
        );
    }),

    employeeGraphql.query('searchEmployeesForAdjustment', (req, res, ctx) => {
        return res(
            ctx.data(
                searchEmployeesForAdjustmentMock(
                    req?.variables?.maxResults,
                    req?.variables?.term
                )
            )
        );
    }),

    employeeGraphql.query('payRunEmployeeProcessStates', (req, res, ctx) => {
        const desiredEmployees = req?.variables?.employeeIds;
        let result;
        if (desiredEmployees?.length) {
            result = makeEmployeeProcessStateMockData(desiredEmployees);
        } else {
            result = mockDataOption2;
        }
        return res(
            ctx.data({
                payRunEmployeeProcessStates: result,
            })
        );
    }),
    employeeGraphql.query('employeeRate', (req, res, ctx) => {
        const { employeeId } = req.variables;
        return res(
            ctx.data({
                employeeRate: getEmployeeRate(employeeId),
            })
        );
    }),
    employeeGraphql.query('taxCodesForEmployee', (req, res, ctx) => {
        return res(ctx.data(getEmployeeTaxCodesMock()));
    }),
    employeeGraphql.query('employeeWageAttachmentCodes', (req, res, ctx) => {
        const { employeeId } = req.variables;
        return res(ctx.data(getEmployeeWageAttachmentCodesMock(employeeId)));
    }),
    employeeGraphql.query('employeeWorkAssignments', (req, res, ctx) => {
        return res(ctx.data(getEmployeeWorkAssignmentsMock()));
    }),
    employeeGraphql.query('employeeWorkAssignmentsByDate', (req, res, ctx) => {
        return res(ctx.data(getEmployeeWorkAssignmentsByDateMock()));
    }),
    employeeGraphql.query('employeePayrollTaxSubBundle', (req, res, ctx) => {
        return res(ctx.data(getEmployeePayrollTaxSubBundleMock()));
    }),
    employeeGraphql.query('searchLaborMetrics', (req, res, ctx) => {
        return res(ctx.data(getLaborMetricsMock()));
    }),
    employeeGraphql.query('personAddress', (req, res, ctx) => {
        return res(ctx.data(getEmployeePersonAddressMock()));
    }),
    employeeGraphql.query('employeePsdCodes', (req, res, ctx) => {
        return res(ctx.data(getEmployeePsdCodes()));
    }),
    employeeGraphql.query('employeePriorStateBundle', (req, res, ctx) => {
        return res(
            ctx.data(
                employeePriorStateBundle(
                    req.variables.payRunId,
                    req.variables.employeeId
                )
            )
        );
    }),
    //#endregion employee

    //#region employee status
    rest.post(getEndpoint(ModuleEnum.EmployeeStatus), (req, res, ctx) => {
        return res(ctx.json(CalculateStatus));
    }),
    //#endregion employee status

    //#region employee flyout
    employeeFlyoutGraphql.query('employeeFlyoutBaseInfo', (req, res, ctx) => {
        const { employeeId, payRunId } = req.variables;
        const employeeInfo = getEmployeeFlyoutBaseInfoMock(
            employeeId,
            payRunId
        );
        return res(
            ctx.data({
                employeeFlyoutBaseInfo: [
                    { ...employeeInfo, status: employeeInfo.employmentStatus },
                ],
            })
        );
    }),
    employeeGraphql.query('employeeEstateInfo', (req, res, ctx) => {
        return res(ctx.data(getEmployeeEstateInfoMock()));
    }),
    //#endregion employee flyout
];
