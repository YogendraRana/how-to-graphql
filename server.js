import cors from "cors";
import chalk from "chalk";
import dotenv from "dotenv";
import express from "express";
import connectDB from "./config/db.js";
import { schema } from "./graphql/schema.js";
import { createHandler } from 'graphql-http/lib/use/express';


// express app
const app = express();


// dot env
dotenv.config({path: '.env'});


// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({allowedOrigins: '*', credentials: true}));


// config
connectDB();


// graphql endpoint
app.all('/graphql', createHandler({ schema, graphiql: process.env.NODE_ENV !== 'production' }));


// listen
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(chalk.bgBlue(`Server is running on port ${PORT}`));
});