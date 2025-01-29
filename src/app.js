import Fastify from 'fastify';
import {registerRestRoutes} from "./routes/rest.js";
import registerAll from "./plugins/registerAll.js";
import registerPlugins from "./plugins/registerPlugins.js";


const fastify = Fastify({
    logger: true, // Enable logging for debugging
});

async function start() {
    try {
        console.log("🚀 Starting Fastify server...");

        // ✅ Ensure plugins are registered before listening
        await fastify.register(registerPlugins);

        // await fastify.register(registerAll);
        await registerRestRoutes(fastify);
        // ✅ Ensure all plugins and routes are ready before starting
        await fastify.ready();
        console.log("✅ Fastify is ready!");
        console.log(fastify.printRoutes()); // Print registered routes

        // Start the server only after everything is registered
        await fastify.listen({port: 3000});
        console.log("✅ Server running at http://localhost:3000");
    } catch (error) {
        console.error("❌ Error starting server:", error);
        process.exit(1);
    }
}

start();
