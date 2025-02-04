import {graphqlHTTP} from "express-graphql";
import {schema} from "../module/schema.js";
import {Router} from "express";
// import {generateSchema} from "../utils/generateSchema.js";

const router = Router();
export const basePath = "/PayrollMicroFrontendStreamGateway/PayrollFrontEndBridgeServiceAPI/graphql_by_fetch";
// const cSchema = generateSchema('../module/clientPropertyModule',
//     ['../module/clientPropertyModule/clientPropertyResolvers.js'])
// router.use(express.json()); // Ensure JSON parsing is enabled

router.use(graphqlHTTP((req) => ({
    schema,
    graphiql: true,
    context: req.body?.variables || {}
})));
