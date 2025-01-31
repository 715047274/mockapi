import { loadMiddlewares, loadRoutes, startApp } from "./utils/loadApp.js";

/**
 * Bootstrapping the App
 */
const bootstrap = async () => {
    console.log("🔄 Loading Middlewares...");
    loadMiddlewares();

    console.log("🔄 Loading Routes...");
    await loadRoutes(); // Ensure routes are fully loaded before starting the server

    console.log("🚀 Starting Server...");
    startApp();
};

bootstrap();
