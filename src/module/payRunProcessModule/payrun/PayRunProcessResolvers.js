import {mockPayRunLastCalculatedTimestamps, mockPayRunProgressResponse} from "./mockData.js";


const payRunProcessResolvers = {
    Query:{
        payRunLastCalculatedTimestamps: (_,{payRunIds})=>{ return mockPayRunLastCalculatedTimestamps},
        compositePayRunStates:(_, {payRunId,payRunIds })=>{ return mockPayRunProgressResponse}
    }
}

export {payRunProcessResolvers}