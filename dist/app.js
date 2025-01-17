"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const compression_1 = __importDefault(require("compression"));
const cors_1 = __importDefault(require("cors"));
const router_1 = __importDefault(require("./router"));
// import fileUpload from 'express-fileupload'
const app = (0, express_1.default)();
const whitelist = [
    "http://localhost:3000",
    "https://aff-ecommerce.vercel.app",
    "https://lasgicttraining.ropeafrica.com"
];
const corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        }
        else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true, // Allow credentials (cookies, authorization headers, TLS client certificates)
};
app.use((0, cors_1.default)(corsOptions));
// app.use(cors({
//   origin: whitelist
// }))
app.use((0, compression_1.default)());
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.json());
// app.use(fileUpload())
app.use("/api/v1", (0, router_1.default)());
exports.default = app;
//# sourceMappingURL=app.js.map