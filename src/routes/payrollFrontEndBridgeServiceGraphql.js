import { Router } from "express";
import { graphqlHTTP } from "express-graphql";
import { schema2, root2 } from "../module/payrollFrontEndBridgeServiceAPIModule.js";

const router = Router();
export const basePath = "/MicrofrontendGraphqlGateway/PayrollFrontEndBridgeServiceAPI/graphql";

router.use(
    graphqlHTTP({
        schema: schema2,
        rootValue: root2,
        graphiql: true, // Enable GraphQL Playground
    })
);

export default router;
