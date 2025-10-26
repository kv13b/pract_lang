const express=require("express");
const {ApolloServer}=require('@apollo/server');
const { expressMiddleware } = require("@as-integrations/express5");
const cors=require('cors');
const bodyParser=require('body-parser');
const { default: axios } = require("axios");

async function startServer() {
    const app=express();
    const server=new ApolloServer({
        typeDefs:`
        type Todo {
            id: ID!,
            title:String!,
            completed:Boolean
        }
        type Query{
            getTodos:[Todo]
        }    
        `,
        resolvers:{
            Query:{
                getTodos:async()=>(
                    await axios.get("https://jsonplaceholder.typicode.com/todos")).data,//db operations
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
    app.listen(8000,()=>console.log("server started at port 8000"));
}
startServer();