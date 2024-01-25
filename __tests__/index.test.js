const { ApolloServer } = require("@apollo/server");
const { typeDefs, resolvers, server } = require("../index.js");

it("returns hello with the provided name", async () => {
  const response = await server.executeOperation({
    query: "query SayHelloWorld($name: String) { hello(name: $name) }",
    variables: { name: "world" },
  });

  expect(response.body.singleResult.errors).toBeUndefined();
  expect(response.body.singleResult.data?.hello).toBe("Hello world!");
});

it("returns books", async () => {
  const response = await server.executeOperation(
    {
      query: "query GetBooks { books { title } }",
    },
    {
      contextValue: {
        token: "123",
      },
    }
  );

  const books = response.body.singleResult.data?.books;
  expect(response.body.singleResult.errors).toBeUndefined();
  expect(books).toEqual(expect.any(Array));
  expect(books).toHaveLength(2);
  expect(books[0]).toEqual(expect.any(Object));
  expect(books[0]).toHaveProperty("title");
  expect(books[0].title).toBe("The Awakening");
});

it("adds a book", async () => {
  const response = await server.executeOperation({
    query:
      "mutation AddBook($title: String, $author: String) { addBook(title: $title, author: $author) { title, author } }",
    variables: { title: "The Awakening", author: "Kate Chopin" },
  });

  const book = response.body.singleResult.data?.addBook;
  expect(response.body.singleResult.errors).toBeUndefined();
  expect(book).toEqual(expect.any(Object));
  expect(book).toHaveProperty("title");
  expect(book.title).toBe("The Awakening");
  expect(book).toHaveProperty("author");
  expect(book.author).toBe("Kate Chopin");
});
