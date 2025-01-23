import mercurius from "mercurius";
import {schema, resolvers} from "../routes/graphql/frontend/resolvers.js";


export async function registerPlugins(fastify){
    fastify.register(mercurius, {
        schema,
        resolvers,
        graphiql: true, // Enables the GraphiQL UI for testing GraphQL queries
        prefix:'/payroll'
    });
}