const { createApolloServer } = require("./index.js");

(async () => {
  const { url } = await createApolloServer();

  console.log(`🚀  Server ready at: ${url}`);
})();

module.exports = { createApolloServer };