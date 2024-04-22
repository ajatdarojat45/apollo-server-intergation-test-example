// Instead of bypassing the HTTP layer, you might want to fully run your server and test it with a real HTTP client. 
// Apollo Server doesn't provide built-in support for this at this time.

// Instead, you can run operations against your server using a combination of any HTTP or GraphQL client such as supertest 
// or Apollo Client's HTTP Link.

// we import a function that we wrote to create a new instance of Apollo Server
const { createApolloServer } = require('../index');

// we'll use supertest to test our server
const request = require('supertest');   

// this is the query for our test
const queryData = {
  query: `query sayHello($name: String) {
    helloWithAuth(name: $name)
  }`,
  variables: { name: 'world with auth' },
};

describe('e2e demo', () => {
  let server, url;

  // before the tests we spin up a new Apollo Server
  beforeAll(async () => {
    // Note we must wrap our object destructuring in parentheses because we already declared these variables
    // We pass in the port as 0 to let the server pick its own ephemeral port for testing
    ({ server, url } = await createApolloServer({ port: 0 }));
    console.log(url, "<-- url")
  });

  // after the tests we'll stop the server
  afterAll(async () => {
    await server?.stop();
  });

  it('says hello buth with auth e2e',  async () => {
    // send our request to the url of the test server
    const response = await request(url)
        .post('/')
        .set('Authorization', 'Bearer 123testing')
        .send(queryData);
    expect(response.errors).toBeUndefined();
    expect(response.body.data?.helloWithAuth).toBe('Hello world with auth!');
  });
});