import {mockPayrollReasons} from "./mockData.js";

const codeResolvers = {
    Query:{
        payrollReasons: ({ctx})=>{
           return mockPayrollReasons
        }
    }
}

export {codeResolvers}