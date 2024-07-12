"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const config = {
    app_name: process.env['APP_NAME'] ?? 'Blog API',
    app_port: process.env.PORT || 4000,
    db_url: process.env['DB_URL'] ?? 'mongodb+srv://abiodun_mastery:Testing123@cluster0.jupgc1f.mongodb.net/affiliate',
    aws: {
        bucket: process.env['AWS_S3_BUCKET'] ?? '',
        region: process.env['AWS_REGION'] ?? '',
        access_key: process.env['AWS_ACCESS_KEY_ID'] ?? '',
        secret_key: process.env['AWS_SECRET_ACCESS_KEY'] ?? ''
    }
};
exports.default = config;
//# sourceMappingURL=index.js.map