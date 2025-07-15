import mongoose from "mongoose";


let isConnected = false;
const DB_NAME = 'opportunity_hub';

const connectDb = async () => {

    if (isConnected) {
        console.log("⚡ MongoDB already connected.");
        return;
    }
    try {
        const db = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        isConnected = true;
        console.log(`✅ MongoDB connected Successfullyy: ${db}`);
    } catch (error) {
        console.error("❌ Error connecting to MongoDB:", error);
        process.exit(1);
    }
}
export default connectDb