import mongoose from "mongoose";

mongoose.set("strictQuery", true);

const mongoDB = async () => {
    const DB_URL = "";
    try {
        await mongoose.connect(DB_URL);
    } catch (err) {
        console.log("Error connecting to MongoDB", err);
    }
}
export { mongoDB };
