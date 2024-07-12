"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.s3Presigner = exports.s3Region = exports.s3Bucket = exports.s3Client = void 0;
const client_s3_1 = require("@aws-sdk/client-s3");
const s3_request_presigner_1 = require("@aws-sdk/s3-request-presigner");
const hash_node_1 = require("@smithy/hash-node");
const _1 = __importDefault(require("./"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const s3Client = new client_s3_1.S3Client({
    region: _1.default.aws.region,
    credentials: {
        accessKeyId: _1.default.aws.access_key,
        secretAccessKey: _1.default.aws.secret_key
    }
});
exports.s3Client = s3Client;
const s3Presigner = new s3_request_presigner_1.S3RequestPresigner({
    region: _1.default.aws.region,
    credentials: {
        accessKeyId: _1.default.aws.access_key,
        secretAccessKey: _1.default.aws.secret_key
    },
    sha256: hash_node_1.Hash.bind(null, "sha256")
});
exports.s3Presigner = s3Presigner;
const s3Bucket = _1.default.aws.bucket;
exports.s3Bucket = s3Bucket;
const s3Region = _1.default.aws.region;
exports.s3Region = s3Region;
//# sourceMappingURL=s3.config.js.map