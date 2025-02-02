import {mockUserPreferences , mockUserPayGroups } from './mockData.js'
const userResolvers = {
    Query:{
        userPreferences: (_,{ctx, preferenceName}) =>{ return mockUserPreferences},
        userPayGroups: (_, {ctx}) => { return mockUserPayGroups}
    }
}