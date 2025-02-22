import {getClientPayrollProperties} from "./api/clientPayrollPropertyProvider.js";
import {mockAccessAuthorizations} from "./api/role.js";
import {mockUserPreferences} from "./api/userPrefernces.js";

const miscResolvers = {
    Query: {
        clientPayrollProperties: async (_, {ctx}) => {
            const resp = getClientPayrollProperties()
            return resp
        },
        roleAccessAuthorizations: async (_, {ctx, accessAuthorizationName}) => {
            return mockAccessAuthorizations
        },
        // wageTaxOverview: async (_, {ctx}) => {
        //     return NotImplementedError
        // },
        // wageTaxLegalEntity: async (_, {ctx}) => {
        //     return NotImplementedError
        // },
        // employeeWageTax: async (_, {ctx}) => {
        //     return NotImplementedError
        // },
        // employeeWageTaxLegalEntity: async (_, {ctx}) => {
        //     return NotImplementedError
        // },
        userPreferences: async (_, {ctx}) => {
            return mockUserPreferences
        }
    },
    Mutation: {
        // saveUserPreference: async (_, {ctx}) => {
        //     return NotImplementedError
        // }
    }
}


const NotImplementedError = (_) => {
    throw new Error("Not Implemented Error")
}


export {miscResolvers}