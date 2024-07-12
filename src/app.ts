import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";            
import cors from "cors";
import router from "./router";
// import fileUpload from 'express-fileupload'

const app = express();

const whitelist = [
  "http://localhost:3000"
];

app.use(cors({
  origin: whitelist
}))

app.use(compression());
app.use(cookieParser());
app.use(express.urlencoded({extended: true}))
app.use(bodyParser.json());


// app.use(fileUpload())
app.use("/api/v1", router())

export default app;