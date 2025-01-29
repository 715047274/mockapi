const productType =` type Query {
    product(id: ID!): Product
  }

  type Product {
    id: ID!
    name: String!
    price: Float!
  }`

const productResolvers = {
    Query: {
        product: (_, { id }) => ({ id, name: 'Example Product', price: 29.99 }),
    },
};


export { productResolvers, productType}