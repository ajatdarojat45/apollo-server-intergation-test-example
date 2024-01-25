const { ApolloServer, startStandaloneServer } = require("@apollo/server");
const bookSchema = require("./schemas/bookSchema.js");
const helloWorldSchema = require("./schemas/helloWorldSchema.js");

const typeDefs = [bookSchema.typeDefs, helloWorldSchema.typeDefs];
const resolvers = [bookSchema.resolvers, helloWorldSchema.resolvers];

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

module.exports = {
  typeDefs,
  resolvers,
  server,
};
