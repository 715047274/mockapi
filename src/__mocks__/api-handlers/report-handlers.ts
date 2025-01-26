import { graphql, rest } from 'msw';
import { ModuleEnum } from '@models/enums/ModuleEnum';
import { getEndpoint } from '@mocks/api-handlers/handler-utils';
import {
    getMockAuditDetails,
    getMockAuditItems,
    getMockPayRunReports,
} from '@mocks/api/reports';
import { GetUrl } from '@utils/ApiUrlUtils';

const reportGraphql = graphql.link(getEndpoint(ModuleEnum.Reports));

export const reportHandlers = [
    reportGraphql.query('payRunReports', (req, res, ctx) => {
        const { skip, take, searchTerm } = req.variables;
        return res(
            ctx.data({
                payRunReports: getMockPayRunReports(skip, take, searchTerm),
            })
        );
    }),
    reportGraphql.query('auditItems', (req, res, ctx) => {
        const { skip, take, searchTerm } = req.variables;
        return res(
            ctx.data({
                auditItems: getMockAuditItems(skip, take, searchTerm),
            })
        );
    }),

    rest.post(GetUrl(ModuleEnum.GetAuditCount), async (req, res, ctx) => {
        const { featureId } = await req.json();
        if (featureId === 7) {
            return res(ctx.status(500));
        }
        return res(ctx.json(Math.floor((featureId % 4) * 8)));
    }),
    rest.post(GetUrl(ModuleEnum.GetAuditDetails), async (req, res, ctx) => {
        const { featureId } = await req.json();
        return res(ctx.json(getMockAuditDetails(featureId)));
    }),
    rest.post(GetUrl(ModuleEnum.RunAudits), async (req, res, ctx) => {
        const { featureIds } = await req.json();
        if (featureIds?.[0] % 2) {
            return res(ctx.status(500));
        }
        return res(ctx.json({ status: 'success' }));
    }),
    rest.get(
        GetUrl(ModuleEnum.DownloadReport).split('?')[0],
        (req, res, ctx) => {
            const emptyFile = new Uint8Array();
            return res(
                ctx.status(200),
                ctx.set('Content-Type', 'application/octet-stream'),
                ctx.body(emptyFile)
            );
        }
    ),
    rest.get(
        GetUrl(ModuleEnum.DownloadArchiveReport).split('?')[0],
        (req, res, ctx) => {
            const emptyFile = new Uint8Array();
            return res(
                ctx.status(200),
                ctx.set('Content-Type', 'application/octet-stream'),
                ctx.set(
                    'Content-Disposition',
                    'attachment; filename="example-report.txt"'
                ),
                ctx.body(emptyFile)
            );
        }
    ),
];
