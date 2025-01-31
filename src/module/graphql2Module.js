import { buildSchema } from "graphql";

const schema2 = buildSchema(`
  type Query {
    greeting: String
  }
`);

const root2 = {
    greeting: () => "Hello from GraphQL Module 2",
};

export { schema2, root2 };
