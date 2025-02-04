import {mockPayRunPeriods, mockPpns, mockPayRunsWithProcessState} from './mockData.js'


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
    }
}


export {payRunResolvers}