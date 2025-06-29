import * as mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export async function connect() {
    try {
        await mongoose.connect(process.env.MONGODB_URL!);
        const connection = mongoose.connection;

        connection.on("connected", () => {
            console.log("MongoDB connected successfully");
        });

        connection.on("error", (error) => {
            console.log("MongoDB connection error: ", error);
        });

    } catch (error) {
        console.log("Error connecting to MongoDB: ", error);
    }
}
