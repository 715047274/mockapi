import {loadFilesSync} from "@graphql-tools/load-files";
import {mergeTypeDefs} from "@graphql-tools/merge";
import {makeExecutableSchema} from "@graphql-tools/schema";
import {mergeResolvers} from "@graphql-tools/merge";
import path from "path";
import { fileURLToPath } from "url";

// Convert ES module __dirname equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// Load all GraphQL schema files dynamically
const typeDefs = mergeTypeDefs(loadFilesSync((path.join(__dirname,"**/*.graphql"))));

// Load all resolvers dynamically
import {clientPropertyResolvers} from "./clientPorpertyModule/clientPropertyResolvers.js";

// graphql
import {userResolvers} from './graphqlModule/user/UserResolvers.js'
import {codeResolvers} from './graphqlModule/code/CodeResolvers.js'
import {roleResolvers} from './graphqlModule/role/RoleResolvers.js'
import {payRunResolvers} from './graphqlModule/payrun/PayRunResolvers.js'
import {payHolidaysResolvers} from './graphqlModule/holiday/PayHolidaysResolvers.js'
import {offCycleResolvers} from './graphqlModule/offCycle/OffCycleResolvers.js'


const resolvers = mergeResolvers([
    clientPropertyResolvers,
    userResolvers,
    codeResolvers,
    roleResolvers,
    payRunResolvers,
    payHolidaysResolvers,
    offCycleResolvers
]);

// Create executable schema
const schema = makeExecutableSchema(
    {
        typeDefs,
        resolvers
    }
);

export {schema};
