"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.viewFile = exports.deleteFile = exports.UploadBlogImage = void 0;
const file_service_1 = require("../services/file.service");
const UploadBlogImage = async (req, res) => {
    try {
        // Check if the file is provided
        if (!req.files) {
            return res.status(400).json({ message: "No file provided" });
        }
        // Upload the file
        const data = await (0, file_service_1.fileUploadMany)(req.files);
        // Generate the pre-signed URL
        // const presignedURL = await generatePresignedURL(result);
        // Return the result
        return res.status(200).json({
            status: "SUCCESS",
            message: "Request completed successfully",
            data
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
exports.UploadBlogImage = UploadBlogImage;
const deleteFile = async (req, res) => {
    try {
        if (req.params.filename) {
            // Upload file
            const result = await (0, file_service_1.deleteImage)(req.params.filename);
            return res.status(200).json({
                message: "Success",
                body: result
            });
        }
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
exports.deleteFile = deleteFile;
const viewFile = async (req, res) => {
    try {
        if (req.params.filename) {
            // Upload file
            const result = await (0, file_service_1.generatePresignedURL)(req.params.filename);
            return res.status(200).json({
                message: "Success",
                body: result
            });
        }
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
exports.viewFile = viewFile;
//# sourceMappingURL=image.controller.js.map