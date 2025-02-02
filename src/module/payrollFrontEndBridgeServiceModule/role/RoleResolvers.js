import {mockAccessAuthorizations} from './mockData.js'

const roleResolvers = {
    Query: {
        roleAccessAuthorizations: (_, {ctx, accessAuthorizationName}) => {
            return mockAccessAuthorizations
        }
    }
}

export {roleResolvers}