import cors from "cors";
import chalk from "chalk";
import dotenv from "dotenv";
import express from "express";
import connectDB from "./config/db.js";
import { startApolloServer } from "./config/graphql.js";


// express app
const app = express();


// dot env
dotenv.config({ path: '.env' });


// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ allowedOrigins: '*', credentials: true }));


// config
connectDB();
startApolloServer();


// listen
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(chalk.bgBlue(`Server is running on port ${PORT}`));
});