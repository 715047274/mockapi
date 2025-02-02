import { Router } from "express";
import { graphqlHTTP } from "express-graphql";
import {schema} from "../module/schema.js";
// import { schema2, root2 } from "../module/payrollFrontEndBridgeServiceAPIModule.js";

const router = Router();
export const basePath = "/PayrollMicroFrontendStreamGateway/PayrollFrontEndBridgeServiceAPI/graphql";

router.use(
    graphqlHTTP((req)=>({
        schema: schema,
        graphiql: true,
        context: req.body?.variables || {}// Enable GraphQL Playground
    }))
);

export default router;
