import mongoose from "mongoose";

const connect = async () => {
  //to check already connected or not?
  if (mongoose.connections[0].readyState) return;
//else connect it now.
  try {
    await mongoose.connect(process.env.NEXT_PUBLIC_MONGO_URL);
    console.log("Mongo Connection successfully established.");
  } catch (error) {
    throw new Error("Error connecting to Mongoose");
  }
};

export default connect;
