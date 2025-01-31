import { buildSchema } from "graphql";

const schema1 = buildSchema(`
  type Query {
    message: String
  }
`);

const root1 = {
    message: () => "Hello from GraphQL Module 1",
};

export { schema1, root1 };
