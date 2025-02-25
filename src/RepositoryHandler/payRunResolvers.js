// import {
//     mockPayRunLastCalculatedTimestamps,
//     mockPayRunPeriods,
//     mockPayRunsWithProcessState,
//     mockPpns
// } from "../module/graphqlModule/payrun/mockData.js";
import {getPayRunsWithProcessState} from "./api/payrun/payrunProvider.js";
import {mockUserPayGroups} from "../module/graphqlModule/user/mockData.js";
import {ppNs, priorPayRuns} from './api/payrun/index.js'

const payRunResolvers = {
    Query: {
        payRunsWithProcessState: (_, args) => {
            const result = getPayRunsWithProcessState(args)

            return result
        },
        commitByDatesByPayRunIds: (_, {ctx}) =>{ return []},
        userPayGroups:(_, {ctx, returnOnlyHyperscalePayGroups}) =>{
            return mockUserPayGroups
        },
        // payRunEmployeeProcessStateCount: (_, {ctx})=>{},
        previousPayRuns: (_, {ctx})=>{
            return []
        },
        // payRunMessageTypes: (_, {ctx})=>{},
        // payRunIssues: (_, {ctx}) =>{},
        // entryIssuesL:(_, {ctx})=>{},
        // payRunIssuesSummary: (_,{ctx})=>{},
        // payRunPeriods: (_, {ctx}) => {
        //     return priorPayRuns
        // },
        ppNs: (_, {ctx}) => {
            return ppNs
        },
        // lastCommittedPayRun:(_, {ctx})=>{},
        priorPayRuns:(_, {ctx})=>{return priorPayRuns},
        // dataEntriesSummary:(_, {ctx})=>{},
        //payRunLastCalculatedTimestamps: (_,{payRunIds})=>{ return mockPayRunLastCalculatedTimestamps},

    }
}


export {payRunResolvers}