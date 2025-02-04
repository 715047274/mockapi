import {graphqlHTTP} from "express-graphql";
import {schema} from "../module/schema.js";
import {Router} from "express";
// import {generateSchema} from "../utils/generateSchema.js";

const router = Router();
export const basePath = "/PayrollMicroFrontendStreamGateway/PayrollFrontEndBridgeServiceAPI/PayRunProcess";


router.use(graphqlHTTP((req)=>({
    schema,
    graphiql: true,
    context: req.body?.variables || {}
})));

export default router;
