import {Router} from "express";
import {graphqlHTTP} from "express-graphql";
import {schema} from "../module/schema.js";
// import {generateSchema} from "../utils/generateSchema.js";

const router = Router();
export const basePath = "/MicrofrontendGraphqlGateway/PayrollFrontEndBridgeServiceAPI/ClientPayrollProperty";

// const cSchema = generateSchema('../module/clientPropertyModule',
//     ['../module/clientPropertyModule/clientPropertyResolvers.js'])


router.use(graphqlHTTP({
    schema,
    graphiql: true,
    rootValue: {
        Query: {
            clientPayrollProperties: schema.getQueryType().getFields().clientPayrollProperties.resolve
        }
    }
}));

export default router;
