"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBlogPost = createBlogPost;
exports.getBlogPost = getBlogPost;
exports.getProductById = getProductById;
exports.productCount = productCount;
const blog_model_1 = __importDefault(require("../db/models/blog.model"));
const lodash_1 = require("lodash");
const mongoose_1 = require("mongoose");
async function createBlogPost(req, res) {
    try {
        const { title, slug, category, content, images, status } = req.body;
        // Safely retrieve the user's ID using lodash's get function
        const userId = (0, lodash_1.get)(req, 'identity._id');
        if (!title || !slug || !category || !content || !images) {
            return res.status(400).json({ message: "All fields are required." });
        }
        const productPost = new blog_model_1.default({
            title, slug, category, content, images, userId, status
        });
        productPost.save();
        return res.status(200).json({
            status: "SUCCESS",
            message: "Request completed successfully",
            productPost
        });
    }
    catch (error) {
        console.error("Error creating blog post:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}
async function getBlogPost(req, res) {
    try {
        // Safely retrieve the user's ID using lodash's get function
        const userId = (0, lodash_1.get)(req, 'identity._id');
        if (!userId) {
            return res.status(401).json({ message: 'Unauthorized: User ID is required' });
        }
        // Ensure the userId is a valid ObjectId
        const userObjectId = new mongoose_1.Types.ObjectId(userId);
        const productPost = await blog_model_1.default.find({ userId: userObjectId }).populate({
            path: 'category',
            select: 'name color'
        })
            .populate({
            path: 'userId',
            select: 'username' // Specify fields to select from the User model
        });
        if (!productPost) {
            return res.status(404).json({ message: 'Blog post not found' });
        }
        return res.status(200).json({
            status: "SUCCESS",
            message: "Request completed successfully",
            productPost
        });
    }
    catch (error) {
        console.log("Error getting blog post:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}
async function getProductById(req, res) {
    try {
        const productId = req.params?.id;
        // Safely retrieve the user's ID using lodash's get function
        const userId = (0, lodash_1.get)(req, 'identity._id');
        if (!userId) {
            return res.status(401).json({ message: 'Unauthorized: User ID is required' });
        }
        const productPost = await blog_model_1.default.findById(productId)
            .populate({
            path: 'category',
            select: 'name color'
        });
        if (!productPost) {
            return res.status(404).json({ message: 'Blog post not found' });
        }
        return res.status(200).json({
            status: "SUCCESS",
            message: "Request completed successfully",
            productPost
        });
    }
    catch (error) {
        console.log("Error getting blog post:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}
async function productCount(req, res) {
    try {
        const counts = await blog_model_1.default.aggregate([
            {
                $facet: {
                    totalProducts: [{ $count: "count" }],
                    publishedProducts: [{ $match: { status: "published" } }, { $count: "count" }],
                    draftProducts: [{ $match: { status: "draft" } }, { $count: "count" }]
                }
            },
            {
                $project: {
                    totalProducts: {
                        $arrayElemAt: ["$totalProducts.count", 0]
                    },
                    publishedProducts: {
                        $arrayElemAt: ["$publishedProducts.count", 0]
                    },
                    draftProducts: {
                        $arrayElemAt: ["$draftProducts.count", 0]
                    }
                }
            }
        ]);
        return res.status(200).json({
            status: "SUCCESS",
            message: "Request completed successfully",
            data: counts[0]
        });
    }
    catch (error) {
        console.log("Error getting product counts:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}
//# sourceMappingURL=blog.controller.js.map