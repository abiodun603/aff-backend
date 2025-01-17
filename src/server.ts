import dotenv from "dotenv";
dotenv.config();

import connectDB from "./db";
import app from "./app";
import config from "./config";

process.on("uncaughtException", (err) => {
  console.log(err);
  process.exit(1);
});

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});

app.listen(process.env.PORT, async () => {
  console.log(`Listening for requests on port ${process.env.PORT} ...`);
  await connectDB();
  console.log("Successfully connected to mongodb");
});