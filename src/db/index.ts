import config from "../config";
import * as mongoose from "mongoose";
import { ConnectOptions } from "mongoose";

import * as dotenv from "dotenv";
dotenv.config();


const inProduction: boolean = process.env.NODE_ENV === "production";

const connectDB = async (): Promise<void> => {
  mongoose.set({ strictQuery: true });

  try {
    const options: ConnectOptions = {
      autoIndex: inProduction ? false : true,
    };

    await mongoose.connect(config.db_url, options);
  } catch (err) {
    console.log(err);
  }
};

export default connectDB;