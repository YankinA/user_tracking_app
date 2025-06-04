import mongoose from "mongoose";

const connect = async () => {
  try {
    const uri = `mongodb://${process.env.DATABASE_HOST}:${process.env.DATABASE_PORT}/${process.env.DATABASE_NAME}`;
    await mongoose.connect(uri, {});
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
  }
};

export default { connect };
