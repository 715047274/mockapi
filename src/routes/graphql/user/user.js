const userType =`  type Query {
    dev(id: ID!): Dev
  }

  type Dev {
    id: ID!
    name: String!
    email: String!
  }`

const userResolvers = {
    Query: {
        dev: (_, { id }) => ({ id, name: 'John Doe', email: 'john@example.com' }),
    },
};


export { userResolvers, userType}