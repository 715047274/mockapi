import {mockOffCycleType} from "./mockData.js";

export const offCycleResolvers = {
    Query:{
        offCycleRunTypes: ({ctx})=>{
            return mockOffCycleType
        }
    }
}