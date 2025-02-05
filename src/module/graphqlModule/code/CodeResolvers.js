import {
    mockPayrollReasons,
    mockCheckTypes,
    mockCheckTemplate,
    mockEarningAmountTypes,
    mockWcbCodes,
    mockWcbAcounts, mockDistributionCodes, mockWageAttachmentOrderedAmountTypes
} from "./mockData.js";

const codeResolvers = {
    Query: {
        payrollReasons: (_, {ctx}) => {
            return mockPayrollReasons
        },
        checkTypes: (_, {ctx, includeAllType}) => {
            return mockCheckTypes
        },
        checkTemplates: (_, {ctx}) => {
            return mockCheckTemplate
        },
        earningAmountTypes: (_, {ctx, earningId}) => {
            return mockEarningAmountTypes
        },
        wcbAccounts: (_, {ctx}) => {
            return mockWcbAcounts
        },
        wcbCodes: (_, {ctx}) => {
            return mockWcbCodes
        },
        distributionCodes: (_, {ctx})=>{
            return mockDistributionCodes
        },
        wageAttachmentOrderedAmountTypes: (_,{ctx}) =>{
            return mockWageAttachmentOrderedAmountTypes
        }

    }
}

export {codeResolvers}