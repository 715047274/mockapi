import {payHolidays} from './api/hoildays/payHoildays.js'

export const dataEntryResolvers = {
    Query:{
        payHolidays: (_, {ctx})=>{
            return payHolidays
        }
    }
}