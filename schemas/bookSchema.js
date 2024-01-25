const typeDefs = `#graphql
  type Book {
    title: String
    author: String
  }

  type Query {
    books: [Book]
  }

  type Mutation {
    addBook(title: String, author: String): Book
  }
`;

const books = [
  {
    title: "The Awakening",
    author: "Kate Chopin",
  },
  {
    title: "City of Glass",
    author: "Paul Auster",
  },
];

const resolvers = {
  Query: {
    books: () => books,
  },

  Mutation: {
    addBook: (_, { title, author }) => {
      const book = { title, author };
      return book;
    },
  },
};

module.exports = {
  typeDefs,
  resolvers,
};
