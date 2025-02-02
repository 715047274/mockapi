import {mockAccessAuthorizations} from './mockData.js'
const roleResolvers = {
    Query:{
        roleAccessAuthorizations: ({ctx}) => {return mockAccessAuthorizations}
    }
}

export {roleResolvers}