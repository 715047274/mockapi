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
    const routesDir = path.join(__dirname, "../routes");

    const files = fs.readdirSync(routesDir);
    for (const file of files) {
        if (file.endsWith(".js")) {
            const modulePath = `file://${path.join(routesDir, file)}`;
            const module = await import(modulePath);

            if (module.default) {
                const basePath = module.basePath || `/${file.replace(".js", "")}`; // Use `basePath` if defined

                const router = express.Router();

                // Apply middleware if defined in the route file
                if (module.middleware) {
                    router.use(module.middleware);
                    console.log(`🛠️ Middleware applied to: ${basePath}`);
                }

                // Attach the route
                router.use("/", module.default);
                app.use(basePath, router);

                console.log(`✅ Route Loaded: ${basePath}`);
            } else {
                console.warn(`⚠️ Skipping ${file}: No default export found.`);
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
