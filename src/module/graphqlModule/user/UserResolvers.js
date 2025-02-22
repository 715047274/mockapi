import {mockUserPreferences , mockUserPayGroups } from './mockData.js'
const userResolvers = {
    Query:{
        userPreferences: (_,{ctx, preferenceName}) =>{ return mockUserPreferences},
        userPayGroups: (_, {ctx, returnOnlyHyperscalePayGroups }) => {

            console.log("the user pay group is called")
            return [{
                    payGroupId: "1234",
                    geoCountryId: "US",
                    onDemandPayEnabled: true,
                    ipsEnabled: false,
                    countryCode: "US",
                    shortName: "USA Payroll"
            }]
        }
    }
}
export {userResolvers}