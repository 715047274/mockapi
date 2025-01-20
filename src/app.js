//
// const express = require('express');
// const app = express();
// const swaggerUi = require('swagger-ui-express');
// const swaggerDocument = require('./swagger.json');
//
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
//
// app.set('port', 3001)
// app.listen(3001, ()=>{
//     console.log("Example app listening on port 3001 !")
// })

import Fastify from 'fastify';
import mercurius from 'mercurius';
import fastifySwagger from '@fastify/swagger';
import { readFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Resolve __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const fastify = Fastify({ logger: true });

// Read GraphQL schema
const schemaPath = path.resolve(__dirname, './graphql/schema.graphql');
const schema = readFileSync(schemaPath, 'utf-8');

// Mock resolvers
const resolvers = {
    Query: {
        getUser: async (_, { role }) => {
            const filePath =
                role === 'admin'
                    ? path.resolve(__dirname, './mock-data/user/getUserAdmin.json')
                    : path.resolve(__dirname, './mock-data/user/getUser.json');
            const data = JSON.parse(readFileSync(filePath, 'utf-8'));
            return data;
        },
    },
};

// Register Swagger plugin
fastify.register(fastifySwagger, {
    routePrefix: '/documentation', // Path to Swagger UI
    swagger: {
        info: {
            title: 'Mock GraphQL Server',
            description: 'Mock GraphQL API with Fastify and Swagger',
            version: '1.0.0',
        },
        consumes: ['application/json'],
        produces: ['application/json'],
        tags: [{ name: 'graphql', description: 'GraphQL API' }],
    },
    exposeRoute: true, // Enable the Swagger UI route
});

// Register Mercurius (GraphQL plugin)
fastify.register(mercurius, {
    schema,
    resolvers,
    graphiql: true, // Enables the GraphiQL UI for testing GraphQL queries
});

// Start the server
const start = async () => {
    try {
        await fastify.listen({ port: 3000 });
        console.log('🚀 GraphQL server running at http://localhost:3000/graphql');
        console.log('📚 Swagger docs at http://localhost:3000/documentation');
        console.log(__dirname)
        const logPath = path.resolve(__dirname, './mock-data/user/getUserAdmin.json')
        console.log(logPath)
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
};

start();
