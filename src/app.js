import Fastify from 'fastify';
// import {registerPlugins} from "./plugins/registerPlugins.js";
import {registerRestRoutes} from "./routes/rest.js";
import registerGraphQLPlugin from "./plugins/registerPlugins.js"

const fastify = Fastify({logger: true});

// // Register plugins (Swagger, GraphQL)
// await registerPlugins(fastify);

// Register routes (REST API)
await registerRestRoutes(fastify);


fastify.register(registerGraphQLPlugin)



// Start the server
const start = async () => {
    try {
        await fastify.listen({port: 3000});
        console.log('🚀 GraphQL server running at http://localhost:3000/graphql');
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
};

start();
