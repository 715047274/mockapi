import {graphqlHTTP} from "express-graphql";
import {schema} from "../module/schema.js";
import {Router} from "express";
// import {generateSchema} from "../utils/generateSchema.js";

const router = Router();
export const basePath = "/PayrollMicroFrontendStreamGateway/PayrollFrontEndBridgeServiceAPI/ClientPayrollProperty";
// const cSchema = generateSchema('../module/clientPropertyModule',
//     ['../module/clientPropertyModule/clientPropertyResolvers.js'])
// router.use(express.json()); // Ensure JSON parsing is enabled

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
