import { Router } from "express";
import { graphqlHTTP } from "express-graphql";
import { schema2, root2 } from "../module/graphql2Module.js";

const router = Router();
export const basePath = "/graphql2";

router.use(
    graphqlHTTP({
        schema: schema2,
        rootValue: root2,
        graphiql: true, // Enable GraphQL Playground
    })
);

export default router;
