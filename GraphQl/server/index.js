const express = require("express");
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require("@as-integrations/express5");
const cors = require('cors');
const bodyParser = require('body-parser');
const { default: axios } = require("axios");
const { TODO } = require('./todo')
const { USER } = require('./user')

async function startServer() {
  const app = express();
  const server = new ApolloServer({
    typeDefs: `
        type User {
          id:ID!,
          name:String,
          username:String!,
          email:String!,
          phone:String!,
          website:String!
        }
        type Todo {
            id: ID!,
            title:String!,
            completed:Boolean,
            user:User
        }
        type Query{
            getTodos:[Todo]
            getAllUser:[User]
            getUser(id:ID):User
        }    
        `,
    resolvers: {
      Todo: {
        user: (todo) => USER.find((e) => e.id === todo.id),
      },
      Query: {
        getTodos: () => TODO,
        getAllUser: () => USER,
        getUser: async (parent, { id }) => USER.find((e) => e.id === id),
      }
    }

  });
  app.use(bodyParser.json({ limit: "1mb" }));
  app.use(cors())
  await server.start();
  app.use(
    "/graphql",
    expressMiddleware(server, {
      context: async ({ req }) => ({ req }),
    })
  );
  app.listen(8000, () => console.log("server started at port 8000"));
}
startServer();