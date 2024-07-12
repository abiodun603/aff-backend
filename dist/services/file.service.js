"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileUpload = fileUpload;
exports.fileUploadMany = fileUploadMany;
exports.deleteImage = deleteImage;
exports.deleteImagesFromStorage = deleteImagesFromStorage;
exports.reduceImageSize = reduceImageSize;
exports.generatePresignedURL = generatePresignedURL;
const url_1 = __importDefault(require("url"));
const sharp_1 = __importDefault(require("sharp"));
const crypto_1 = require("crypto");
const url_parser_1 = require("@smithy/url-parser");
const protocol_http_1 = require("@smithy/protocol-http");
const s3_request_presigner_1 = require("@aws-sdk/s3-request-presigner");
const client_s3_1 = require("@aws-sdk/client-s3");
const s3_config_1 = require("../config/s3.config");
async function fileUpload(file) {
    try {
        const url = `https://${s3_config_1.s3Bucket}.s3.${s3_config_1.s3Region}.amazonaws.com`;
        //Key is the file name we want to rename our uploaded file with
        const newFileName = `aff_${(0, crypto_1.randomUUID)()}.${file.mimetype.split("/")[1]}`;
        const bucketParams = {
            Bucket: s3_config_1.s3Bucket,
            Key: newFileName,
            Body: file.buffer,
            ContentType: file.mimetype,
            ContentDisposition: 'inline'
        };
        const command = new client_s3_1.PutObjectCommand(bucketParams);
        await s3_config_1.s3Client.send(command);
        return {
            location: `${url}/${bucketParams.Key}`,
            fileName: file.originalname
        };
    }
    catch (error) {
        console.log(error);
        return error;
    }
}
async function fileUploadMany(files) {
    try {
        const output = [];
        const s3Prefix = `https://${s3_config_1.s3Bucket}.s3.${s3_config_1.s3Region}.amazonaws.com`;
        for (const file of files) {
            await fileUpload(file);
            output.push({
                location: `${s3Prefix}/${file.originalname}`,
                fileName: file.originalname,
            });
        }
        return output;
    }
    catch (error) {
        console.log(error);
        return error;
    }
}
async function generatePresignedURL(filename) {
    try {
        const url = (0, url_parser_1.parseUrl)(`https://${s3_config_1.s3Bucket}.s3.${s3_config_1.s3Region}.amazonaws.com/${filename}`);
        const command = new client_s3_1.GetObjectCommand({
            Bucket: s3_config_1.s3Bucket,
            Key: filename,
        });
        const presignedUrlObj = await s3_config_1.s3Presigner.presign(new protocol_http_1.HttpRequest({
            ...url, method: "GET"
        }));
        const presignedUrl = await (0, s3_request_presigner_1.getSignedUrl)(s3_config_1.s3Client, command);
        // return formatUrl(presignedUrlObj)
        return presignedUrl;
    }
    catch (error) {
        console.log(error);
        return error;
    }
}
async function deleteImage(filename) {
    try {
        const bucketParams = {
            Bucket: s3_config_1.s3Bucket,
            Key: filename,
        };
        return await s3_config_1.s3Client.send(new client_s3_1.DeleteObjectCommand(bucketParams));
    }
    catch (error) {
        console.error(`Failed to delete image  from S3: ${error}`);
        return error;
    }
}
// To use deleteImage for example:
// const imageKey = "path/to/image.jpg";
// await deleteImage(imageKey);
// console.log("Image deleted successfully.");
// Define the function to delete images from S3 (replace with your implementation)
async function deleteImagesFromStorage(imageUrls) {
    for (const imageUrl of imageUrls) {
        // Parse the URL to get the pathname, which represents the object key
        const parsedUrl = url_1.default.parse(imageUrl);
        const objectKey = parsedUrl.pathname?.substring(1);
        if (objectKey) {
            const bucketParams = {
                Bucket: s3_config_1.s3Bucket,
                Key: objectKey
            };
            try {
                await s3_config_1.s3Client.send(new client_s3_1.DeleteObjectCommand(bucketParams));
                console.log(`Image '${objectKey}' deleted from S3.`);
            }
            catch (error) {
                console.error(`Failed to delete image '${objectKey}' from S3: ${error}`);
            }
        }
        else {
            console.error(`Invalid image URL: ${imageUrl}`);
        }
    }
}
async function reduceImageSize(file) {
    await (0, sharp_1.default)(file.buffer)
        .resize({ width: 1920, height: 1080, fit: "contain" })
        .toBuffer();
    return "";
}
//# sourceMappingURL=file.service.js.map