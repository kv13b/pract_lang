import mongoose from "mongoose";

mongoose.set("strictQuery", true);

const mongoDB = async () => {
    try {
        // URL-encode special characters in password
        const password = encodeURIComponent("SUNshined@19");
        const DB_URL = `mongodb+srv://karthikbhatt22:${password}@kbay.wasclcl.mongodb.net/`;
        
        if (!DB_URL) {
            throw new Error("DB_URL environment variable is not defined");
        }
        
        await mongoose.connect(DB_URL);
        console.log("Connected to MongoDB");
    } catch (err) {
        console.log("Error connecting to MongoDB", err);
        throw err; // Re-throw to prevent handler from continuing
    }
}

export { mongoDB };