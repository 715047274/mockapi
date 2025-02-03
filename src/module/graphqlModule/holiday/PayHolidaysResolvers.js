import {mockHoliday} from "./mockData.js";

const payHolidaysResolvers = {
    Query:{
        payHolidays: (_,{ctx})=>{
            return mockHoliday
        }
    }
}

export {payHolidaysResolvers}