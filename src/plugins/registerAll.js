import fp from 'fastify-plugin';
import graphqlSchemas from './graphqlSchema.js';
import {userType, userResolvers} from '../routes/graphql/user/user.js'
import {productType, productResolvers} from '../routes/graphql/product/product.js'

export default fp(async (fastify, options) => {
    console.log('Registering all plugins...');

    // Register the GraphQL schemas plugin
    fastify.register(graphqlSchemas, {
        schemas: [
            {
                typeDefs: [userType],
                resolvers: [userResolvers],
            },
            {
                typeDefs: [productType],
                resolvers: [productResolvers],
            },
        ],
    });

    console.log('All plugins registered successfully.');
});
