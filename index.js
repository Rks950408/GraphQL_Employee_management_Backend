const { ApolloServer } = require("apollo-server");
const typeDefs = require("./src/graphql/schema/typeDefs");
const resolvers = require("./src/graphql/resolvers");
const { verifyToken } = require("./src/graphql/auth");

const server = new ApolloServer({
  typeDefs,
  resolvers: {
    ...resolvers,
  },
  context: ({ req }) => {
    // Authentication logic (example)
    const token = req.headers.authorization || "";
    console.log(token);
    let user = null;
    if (token) {
      try {
        user = verifyToken(token);
      } catch (error) {
        console.error("Invalid token", error.message);
      }
    }
    return { user, token };
  },
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
