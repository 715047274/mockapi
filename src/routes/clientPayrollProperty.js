import { Router } from "express";
import { graphqlHTTP } from "express-graphql";
import { schema1, root1 } from "../module/clientPayrollPropertyModule.js";

const router = Router();
export const basePath = "/MicrofrontendGraphqlGateway/PayrollFrontEndBridgeServiceAPI/ClientPayrollProperty";

router.use(
    graphqlHTTP({
        schema: schema1,
        rootValue: root1,
        graphiql: true, // Enable GraphQL Playground
    })
);

export default router;
