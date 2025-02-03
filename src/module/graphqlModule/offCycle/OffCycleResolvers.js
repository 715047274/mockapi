import {mockOffCycleType} from "./mockData.js";

export const offCycleResolvers = {
    Query:{
        offCycleRunTypes: (_, {ctx})=>{
            return mockOffCycleType
        }
    }
}