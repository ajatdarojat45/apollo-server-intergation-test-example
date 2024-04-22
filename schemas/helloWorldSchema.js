const typeDefs = `#graphql
  type Query {
    hello(name: String): String!
    helloWithAuth(name: String): String!
  }
`;

const resolvers = {
  Query: {
    hello: (_, { name }) => `Hello ${name}!`,
    helloWithAuth: async (_, { name }, contextValue) => {
      const { authentication } = contextValue;
      const user = await authentication();
      console.log(user, "<-- user");
      return `Hello ${name}!`;
    }, 
  },
};

module.exports = {
  typeDefs,
  resolvers,
};
