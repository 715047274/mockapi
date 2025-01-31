import express from "express";
import fs from "fs";
import path from "path";
import {loggerMiddleware, fileLoggerMiddleware} from "../middleware/logger.js";
import {PORT} from "../config/serverConfig.js";
import {fileURLToPath} from "url"; // Required for relative path resolution

const app = express();

// Get the current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Load Middlewares Before Starting App
 */
const loadMiddlewares = () => {
    app.use(loggerMiddleware); // Logs to console
    app.use(fileLoggerMiddleware); // Logs to file
};

/**
 * Load All Routes Dynamically
 */
const loadRoutes = async () => {

    // Correct relative path
    const routesDir = path.join(__dirname, "../routes");
    //const routesDir = path.join(process.cwd(), "./src/routes");

    const files = fs.readdirSync(routesDir)
    for (const file of files) {
        if (file.endsWith(".js")) {
            const module = await import(`../routes/${file}`);
            const {basePath} = module
            if (basePath) {
                const routeName = basePath || `/${file.replace(".js", "")}`; // Use `basePath` if defined
                app.use(routeName, module.default);
                console.log(`✅ Route Loaded: ${routeName}`);
            }
        }
    }
};

/**
 * Start the Express App
 */
const startApp = () => {
    app.listen(PORT, () => {
        console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
};

export {app, loadMiddlewares, loadRoutes, startApp};
