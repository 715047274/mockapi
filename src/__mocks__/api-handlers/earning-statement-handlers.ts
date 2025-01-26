import { rest } from 'msw';
import { ModuleEnum } from '@models/enums/ModuleEnum';
import { getEndpointForGet } from './handler-utils';
import pdf from './content/pdf.json';

const urlESCheck = getEndpointForGet(
    ModuleEnum.EmployeeEarningStatementForCheck
);

export const earningStatementHandlers = [
    rest.get(urlESCheck, (req, res, ctx) => {
        return res(
            ctx.set({
                'Content-Type': 'application/pdf',
                'Content-Length': pdf.data.length.toString(),
            }),
            ctx.body(pdf.data)
        );
    }),
];
