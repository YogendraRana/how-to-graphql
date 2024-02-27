import chalk from "chalk";
import mongoose from "mongoose";

const connectDB = async () => {
    const connection = await mongoose.connect(
        process.env.DB_URI,
    );

    console.log(chalk.bgGreen(`MongoDB Connected: ${connection.connection.host}`));
}

export default connectDB;