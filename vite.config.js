import { defineConfig } from 'vite';
import { ApolloServer, gql } from 'apollo-server';
import { readFileSync } from 'fs';
import path from 'path';

const schemaPath = path.resolve('./src/graphql/schema.graphql');
const typeDefs = gql(readFileSync(schemaPath, 'utf-8'));

export default defineConfig({
    plugins: [
        {
            name: 'graphql-mock-server',
            configureServer(server) {
                const resolvers = {
                    Query: {
                        getUser: (_, { role }) => {
                            const filePath =
                                role === 'admin'
                                    ? path.resolve('./src/mock-data/users/getUserAdmin.json')
                                    : path.resolve('./src/mock-data/users/getUser.json');
                            if (!filePath) {
                                throw new Error('Mock data not found');
                            }
                            const mockData = JSON.parse(readFileSync(filePath, 'utf-8'));
                            return mockData;
                        },
                    },
                };

                const apolloServer = new ApolloServer({ typeDefs, resolvers });

                apolloServer.start().then(() => {
                    server.middlewares.use(apolloServer.getMiddleware({ path: '/graphql' }));
                    console.log('🚀 GraphQL server running at http://localhost:5173/graphql');
                });
            },
        },
        {
            name: 'swagger-mock',
            configureServer(server) {
                server.middlewares.use((req, res, next) => {
                    if (req.url === '/swagger.json') {
                        const swaggerPath = path.resolve('./src/swagger.json');
                        const swaggerSpec = readFileSync(swaggerPath, 'utf-8');
                        res.setHeader('Content-Type', 'application/json');
                        res.end(swaggerSpec);
                    } else {
                        next();
                    }
                });
            },
        },
    ],
});
