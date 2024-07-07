import express from "express";
import http from "http";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";            
import cors from "cors";
import mongoose from "mongoose";
import router from "./router";
import fileUpload from 'express-fileupload'

const app = express();

app.use(cors({
  credentials: true
}))

app.use(compression());
app.use(cookieParser());
app.use(express.urlencoded({extended: true}))
app.use(bodyParser.json());

const server = http.createServer(app);

server.listen(8080, () => {
  console.log('Server running on http://localhost:8080');
})

const MONGO_URL =  'mongodb+srv://abiodun_mastery:Testing123@cluster0.jupgc1f.mongodb.net/affiliate';


mongoose.Promise = Promise;

mongoose.connect(MONGO_URL);

mongoose.connection.on('error', error => console.log(error));

app.use(fileUpload())
app.use("/", router())