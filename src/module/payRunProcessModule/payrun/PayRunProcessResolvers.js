import {mockPollPayRunsResponse, mockPayRunProgressResponse} from "./mockData.js";


const payRunProcessResolvers = {
    Query: {
        compositePayRunStates: (_, {payRunId, payRunIds}) => {
            return mockPayRunProgressResponse
        },
        pollPayRuns: (_, {payRunIds, ctx}) => {
            // Filter mock data based on payRunIds
            return mockPollPayRunsResponse
        },
        payRunProcessStates: (_, {payRunIds, ctx}) => {
            return mockPollPayRunsResponse.payRunProcessStates
        },
        payRunIssuesCount: (_, {payRunId, ctx}) => {
            return mockPollPayRunsResponse.payRunIssuesCount
        }
    }
}

export {payRunProcessResolvers}