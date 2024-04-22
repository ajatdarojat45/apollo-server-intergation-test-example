const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const bookSchema = require("./schemas/bookSchema.js");
const helloWorldSchema = require("./schemas/helloWorldSchema.js");

const typeDefs = [bookSchema.typeDefs, helloWorldSchema.typeDefs];
const resolvers = [bookSchema.resolvers, helloWorldSchema.resolvers];

const server = new ApolloServer({
  typeDefs,
  resolvers,
});


const createApolloServer = async (listenOptions = { port: 4000 }) => {
  const { url } = await startStandaloneServer(server, 
    { 
      listen: listenOptions,
      context: async ({ req }) => {
        return {
          authentication: async () => {
            // decode your token from req.headers.authorization 
            // and add your auth logic here
            console.log(req.headers.authorization, "<--")
            return {
              user: {
                id: '1',
                email: 'd@mail.com'
              }
            }
          }
        }
      } 
    });

  // return the server instance and the url the server is listening on
  return { server, url };
};

module.exports = {
  typeDefs,
  resolvers,
  server,
  createApolloServer
};
