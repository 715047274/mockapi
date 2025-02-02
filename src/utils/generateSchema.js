import { loadFilesSync } from "@graphql-tools/load-files";
import { mergeTypeDefs } from "@graphql-tools/merge";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { mergeResolvers } from "@graphql-tools/merge";
import path from "path";
import { fileURLToPath,pathToFileURL  } from "url";
import fs from "fs";

// Convert ES module __dirname equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Generates a GraphQL schema from the given .graphql folder and resolvers list.
 * @param {string} graphqlFolderPath - Path to the folder containing .graphql schema files.
 * @param {string[]} resolverFiles - Array of resolver file locations.
 * @returns {object} - Executable GraphQL schema.
 */
const generateSchema = async (graphqlFolderPath, resolverFiles) => {
    try {
        const inputPath = path.join(__dirname, graphqlFolderPath, "/*.graphql");
        console.log(inputPath)
        // Load .graphql schema files from the specified folder
        if (!fs.existsSync(path.resolve(__dirname, graphqlFolderPath))) {
            throw new Error(`❌ Schema folder does not exist: ${path.resolve(__dirname, graphqlFolderPath)}`);
        }

        const typeDefs = mergeTypeDefs(loadFilesSync(inputPath));

        // Dynamically import resolvers using `file://` URLs
        const resolversArray = await Promise.all(
            resolverFiles.map(async (resolverPath) => {
                const resolverFullPath = path.resolve(__dirname, resolverPath);
                const resolverURL = pathToFileURL(resolverFullPath).href;

                console.log(`🔍 Attempting to import resolver from: ${resolverURL}`);

                try {
                    const module = await import(resolverURL);
                    return module.default || module; // ✅ Always return the default export
                } catch (importError) {
                    console.error(`❌ Failed to import resolver: ${resolverURL}`);
                    console.error(importError);
                    throw importError;
                }
            })
        );

        const resolvers = mergeResolvers(resolversArray);

        // Create executable schema
        return makeExecutableSchema({ typeDefs, resolvers });

    } catch (error) {
        console.error("❌ Error generating schema:", error);
        throw error;
    }
};

export { generateSchema };
