"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const middlewares_1 = require("../middlewares");
const multer_config_1 = __importDefault(require("../config/multer.config"));
const image_controller_1 = require("../controllers/image.controller");
exports.default = (router) => {
    router.post('/upload', multer_config_1.default.array('files', 12), middlewares_1.isAuthenticated, image_controller_1.UploadBlogImage);
    router.get("/file/:filename", middlewares_1.isAuthenticated, image_controller_1.viewFile);
    router.delete("/file/:filename", middlewares_1.isAuthenticated, image_controller_1.deleteFile);
};
//# sourceMappingURL=uploadS3.js.map