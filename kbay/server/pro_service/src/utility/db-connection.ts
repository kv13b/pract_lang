import mongoose from "mongoose";

mongoose.set("strictQuery", true);

const mongoDB = async () => {
    try {
        const DB_URL = process.env.DB_URL;
        if (!DB_URL) {
            throw new Error("DB_URL environment variable is not defined");
        }
        await mongoose.connect(DB_URL);
    } catch (err) {
        console.log("Error connecting to MongoDB", err);
    }
}
export { mongoDB };
