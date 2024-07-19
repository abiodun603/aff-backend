"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBlogPost = createBlogPost;
const blog_model_1 = __importDefault(require("../db/models/blog.model"));
const lodash_1 = require("lodash");
async function createBlogPost(req, res) {
    try {
        const { title, slug, category, tags, content, images, status } = req.body;
        // Safely retrieve the user's ID using lodash's get function
        const userId = (0, lodash_1.get)(req, 'identity._id');
        if (!title || !slug || !category || !tags || !content || !images) {
            return res.status(400).json({ message: "All fields are required." });
        }
        const blogPost = new blog_model_1.default({
            title, slug, category, tags, content, images, userId, status
        });
        blogPost.save();
        return res.status(200).json(blogPost);
    }
    catch (error) {
        console.error("Error creating blog post:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}
//# sourceMappingURL=blog.controller.js.map