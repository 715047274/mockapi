import {mockPayRunPeriods, mockPpns, mockPayRunsWithProcessState} from './mockData.js'


const payRunResolvers = {
    Query: {
        payRunsWithProcessState: ({ctx}) => {
            return mockPayRunsWithProcessState
        },
        ppNs: ({ctx}) => {
            return mockPpns
        },
        payRunPeriods: ({ctx}) => {
            return mockPayRunPeriods
        }
    }
}


export {payRunResolvers}