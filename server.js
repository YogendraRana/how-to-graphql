import http from "http";
import cors from "cors";
import chalk from "chalk";
import dotenv from "dotenv";
import express from "express";
import connectDB from "./config/db.js";
import { ApolloServer, } from "@apollo/server";
import { startStandaloneServer } from '@apollo/server/standalone';
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer"

// import resolvers and typeDefs
import typeDefs from "./graphql/typeDefs.js";
import resolvers from "./graphql/resolvers.js";

// http server
const app = express();
const httpServer = http.createServer(app);

// Middleware
app.use(cors({ origin: ["http://localhost:3000", "https://studio.apollographql.com"] }));
app.use(express.json());

// .env file
dotenv.config({ path: '.env' });

// connect to database
connectDB();

// start server
const startServer = async () => {

    // apollo server
    const apolloServer = new ApolloServer({
        typeDefs,
        resolvers,
        plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    });

    // run server
    const { url } = await startStandaloneServer(apolloServer, {
        listen: { port: process.env.GQL_PORT || 4000 },
    });

    console.log(chalk.bgGreen(`Server ready at ${url}`));
}

startServer();