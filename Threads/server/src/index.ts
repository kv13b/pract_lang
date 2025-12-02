import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@as-integrations/express5';

const app = express();

async function init() {
    const server = new ApolloServer({
        typeDefs: `
            type Query{
                hello:String
            }
        `,
        resolvers: {
            Query:{
                hello:()=>`Hey there`
            }
        },
    });
    app.use(express.json())
    await server.start();
    app.use('/graphql', expressMiddleware(server));
    const PORT = Number(process.env.PORT) || 8000;
    app.get("/", (req, res) => {
        res.json({ message: "Server is up and running" });
    })
    app.listen(PORT, () => console.log(`server started at port :${PORT}`))
}
init();
