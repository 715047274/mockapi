import fp from 'fastify-plugin';
import mercurius from "mercurius";

import {makeExecutableSchema} from '@graphql-tools/schema';
import {mergeTypeDefs, mergeResolvers} from '@graphql-tools/merge';

export default fp(async (fastify, options) => {
    const {schemas} = options;

    if (!schemas || !Array.isArray(schemas)) {
        throw new Error('Schemas must be an array.');
    }
    console.log(`✅ Merging ${schemas.length} GraphQL schemas...`);

    // Extract typeDefs and resolvers from all schemas
    const mergedTypeDefs = mergeTypeDefs(schemas.map(s => s.typeDefs).flat());
    const mergedResolvers = mergeResolvers(schemas.map(s => s.resolvers).flat());

    const schema = makeExecutableSchema({
        typeDefs: mergedTypeDefs,
        resolvers: mergedResolvers,
    });
    console.log('✅ Merged GraphQL Schema:', mergedTypeDefs);
    console.log('✅ Merged GraphQL Resolvers:', mergedResolvers);
    fastify.register(mercurius, {
        schema,
        graphiql: true, // Enables GraphiQL UI (Alternative: 'graphiql')
        ide: true,        // ✅ Enables GraphQL Playground UI
        prefix: '/graphql',
    });

    // console.log(`Registered GraphQL schema at prefix: ${prefix}`);
});
