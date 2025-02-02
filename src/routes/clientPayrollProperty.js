import express, {Router} from "express";
import {graphqlHTTP} from "express-graphql";
import {schema} from "../module/schema.js";
// import {generateSchema} from "../utils/generateSchema.js";

const router = Router();
export const basePath = "/PayrollMicroFrontendStreamGateway/PayrollFrontEndBridgeServiceAPI/ClientPayrollProperty";
// const cSchema = generateSchema('../module/clientPropertyModule',
//     ['../module/clientPropertyModule/clientPropertyResolvers.js'])
router.use(express.json()); // Ensure JSON parsing is enabled


// Middleware to inject default ctx if missing
router.use((req, res, next) => {
    if (!req.body || !req.body.variables || !req.body.variables.ctx) {
        console.warn("⚠️ Injecting default ctx in request.");
        if (!req.body) req.body = {};
        if (!req.body.variables) req.body.variables = {};

        req.body.variables.ctx = {
            sessionTicket: "123",
            controlDbKey: "234",
            userId: 234,
            cultureId: 234,
            prSchemaVersions: []
        };
    }
    next();
});


router.use(graphqlHTTP((req)=>({
    schema,
    graphiql: true,
    rootValue: {
        Query: {
            clientPayrollProperties: schema.getQueryType().getFields().clientPayrollProperties.resolve
        }
    },
    context: req.body?.variables || {}
})));

export default router;
