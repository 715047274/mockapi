import mercurius from "mercurius";
import fp from "fastify-plugin";
import {schema, resolvers} from "../routes/graphql/frontend/resolvers.js";

// todo this is working , the merge with different api not working
export default fp(async (fastify, options) => {
  // const {schema , resolvers }= options

    fastify.register(mercurius, {
        schema,
        resolvers,
        graphiql: true, // Enables the GraphiQL UI for testing GraphQL queries
        prefix: '/payroll'
    });
})