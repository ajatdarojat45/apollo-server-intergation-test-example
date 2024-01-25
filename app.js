const { startStandaloneServer } = require("@apollo/server/standalone");
const { server } = require("./index.js");

(async () => {
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });

  console.log(`🚀  Server ready at: ${url}`);
})();
