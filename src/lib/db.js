import mongoose from "mongoose";

export const connect = async () => {
  try {
    mongoose.connect(process.env.NEXT_PUBLIC_MONGO_URL)
    const connection = mongoose.connection;
    
    connection.on("connected", () => {
      console.log("Connection with MONGODB is Successfull !")
    })
    connection.on("error", (err) => {
      console.log("Error establishing connection", err)
      process.exit()
    })
  } catch (error) {
    console.log("Error while connecting to server !", error);
  }
}
