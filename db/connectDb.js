import mongoose from "mongoose";

const connectDb = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDb connected: ${conn.connection.host}`);
  } catch (err) {
    console.log("Database Connection Error: ", err.message);
  }
};

export default connectDb;
