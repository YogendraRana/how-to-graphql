import cors from "cors";
import chalk from "chalk";
import dotenv from "dotenv";
import express from "express";
import connectDB from "./config/db.js";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from '@apollo/server/standalone';


// express app
const app = express();


let users = [
    {
        id: "1",
        name: 'John Doe',
        email: 'john@gmail.com',
        password: 'password'

    },
    {
        id: "2",
        name: 'Jane Doe',
        email: '',
        password: 'password2'
    },
]

// The GraphQL schema
const typeDefs = `#graphql
    type User {
        id: ID!
        name: String
        email: String!
        password: String!
    }

    type Query {
        getUser(id: ID!): User,
        getUsers: [User],
    }
`;


const resolvers = {
    Query: {
        getUser (parent, {id}, context, info) {
            const user = users.find(user => user.id === id);
            return user;
        },
        getUsers () {
            return users;
        },
    },
};


// apollo serer
const apolloServer = new ApolloServer({ typeDefs, resolvers });


const { url } = await startStandaloneServer(apolloServer, {
    listen: { port: 4000 },
});


// dot env
dotenv.config({ path: '.env' });


// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ allowedOrigins: '*', credentials: true }));


// config
connectDB();


// graphql endpoint
// app.all('/graphql', createHandler({ schema, graphiql: process.env.NODE_ENV !== 'production' }));


// listen
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(chalk.bgBlue(`Server is running on port ${PORT}`));
});