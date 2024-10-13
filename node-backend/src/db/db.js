import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGODB_URI);
    if (connection) {
      console.log("connected to db");
    }
  } catch (error) {
    console.log(error);
  }
};

export default connectDB;
