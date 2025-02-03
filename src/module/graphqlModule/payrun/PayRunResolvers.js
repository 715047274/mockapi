import {mockPayRunPeriods, mockPpns, mockPayRunsWithProcessState, mockPayRunLastCalculatedTimestamps, mockPayRunProgressResponse} from './mockData.js'


const payRunResolvers = {
    Query: {
        payRunsWithProcessState: (_, {ctx}) => {
            return mockPayRunsWithProcessState
        },
        ppNs: (_, {ctx}) => {
            return mockPpns
        },
        payRunPeriods: (_, {ctx}) => {
            return mockPayRunPeriods
        },
        payRunLastCalculatedTimestamps: (_,{payRunIds})=>{ return mockPayRunLastCalculatedTimestamps},
        compositePayRunStates:(_, {payRunId,payRunIds })=>{ return mockPayRunProgressResponse}
    }
}


export {payRunResolvers}