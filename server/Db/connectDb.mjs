import mongoose from "mongoose";

const connectDB = (uri) => {
  mongoose.set("strictQuery", true);
  return mongoose.connect(uri, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });
};

export default connectDB;

