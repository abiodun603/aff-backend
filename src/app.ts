import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";            
import cors, { CorsOptions } from "cors";
import router from "./router";
// import fileUpload from 'express-fileupload'

const app = express();

const whitelist = [
  "http://localhost:3000",
  "https://aff-ecommerce.vercel.app",
];

const corsOptions: CorsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true, // Allow credentials (cookies, authorization headers, TLS client certificates)
};

app.use(cors(corsOptions));

// app.use(cors({
//   origin: whitelist
// }))

app.use(compression());
app.use(cookieParser());
app.use(express.urlencoded({extended: true}))
app.use(bodyParser.json());


// app.use(fileUpload())
app.use("/api/v1", router())

export default app;