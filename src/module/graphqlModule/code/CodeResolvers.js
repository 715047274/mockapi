import {mockPayrollReasons} from "./mockData.js";

const codeResolvers = {
    Query: {
        payrollReasons: (_, {ctx}) => {
            return mockPayrollReasons
        }
    }
}

export {codeResolvers}