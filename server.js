import chalk from "chalk";
import express from "express";
import {schema} from "./graphql/schema.js";
import { createHandler } from 'graphql-http/lib/use/express';


// express app
const app = express();

// graphql endpoint
app.all('/graphql', createHandler({ schema }));


// middleware
app.use(express.json());


// listen
app.listen(8000, () => {
    console.log(chalk.bgBlue("Server is running on port 8000"));
});