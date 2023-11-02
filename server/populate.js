import { readFile } from "fs/promises";
import dotenv from "dotenv";
dotenv.config();

import connect from "./Db/connectDb.mjs";
import Post from "./models/Post.mjs";


const start = async () => {
  try {
    await connect(process.env.MONGO_URI);
    await Post.deleteMany();
    const jsonProducts = JSON.parse(
      await readFile(new URL("./blogdata.json", import.meta.url))
    );
    await Post.create(jsonProducts);
    console.log("Success");
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

start ()