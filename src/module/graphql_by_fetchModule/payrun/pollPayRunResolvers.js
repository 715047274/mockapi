import {mockPayRunQueryResponse} from "./mockData.js";


const pollPayRunResolvers = {
    Query:{
        pollPayRuns: (_, {payRunIds, ctx})=>{
            return mockPayRunQueryResponse
        }
    }
}

export {pollPayRunResolvers}