import morgan from "morgan";
import fs from "fs";
import path from "path";

// Define log file path
const logFilePath = path.join(process.cwd(), "server.log");

// Create a writable stream for file logging (append mode)
const logStream = fs.createWriteStream(logFilePath, { flags: "a" });

// Morgan logging format
const logFormat = ':method :url :status :response-time ms - :res[content-length]';

// Middleware for console logging (Pretty logs)
const loggerMiddleware = morgan(logFormat, {
    stream: process.stdout,
});

// Middleware for file logging
const fileLoggerMiddleware = morgan(logFormat, {
    stream: logStream,
});

export { loggerMiddleware, fileLoggerMiddleware };
