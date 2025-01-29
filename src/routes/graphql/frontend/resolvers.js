import path from "path";
import {readFileSync} from "fs";
import { fileURLToPath } from 'url';

// Resolve __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const resolvers = {
    Query: {
        getUser: async (_, { role }) => {
            const filePath =
                role === 'admin'
                    ? path.resolve(__dirname, './mock-data/user/getUserAdmin.json')
                    : path.resolve(__dirname, './mock-data/user/getUser.json');
            console.log("00000000000000")
            const data = JSON.parse(readFileSync(filePath, 'utf-8'));
            return data;
        },
    },
};

const schemaPath = path.resolve(__dirname, './schema.graphql');
const schema = readFileSync(schemaPath, 'utf-8');



export {resolvers, schema}