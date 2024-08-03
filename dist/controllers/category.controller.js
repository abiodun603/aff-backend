"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCategoryForUser = exports.createCategory = void 0;
const category_1 = __importDefault(require("../db/models/category"));
const lodash_1 = require("lodash");
const createCategory = async (req, res) => {
    try {
        const { name, color } = req.body;
        // Safely retrieve the user's ID using lodash's get function
        const userId = (0, lodash_1.get)(req, 'identity._id');
        if (!name || !color) {
            return res.status(400).json({ message: 'Name and color are required' });
        }
        if (!userId) {
            return res.sendStatus(403);
        }
        const category = new category_1.default({ name, color, userId });
        await category.save();
        return res.status(201).json(category);
    }
    catch (err) {
        console.error('Error creating category:', err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
exports.createCategory = createCategory;
const getCategoryForUser = async (req, res) => {
    try {
        const categories = await category_1.default.aggregate([
            {
                $lookup: {
                    from: "blogposts",
                    localField: "_id",
                    foreignField: "category",
                    as: "blogPosts"
                }
            },
            {
                $project: {
                    name: 1, // include the name field in the output
                    color: 1,
                    blogPostCount: { $size: "$blogPosts" }
                }
            }
        ]);
        return res.status(200).json({
            status: "SUCCESS",
            message: "Request completed successfully",
            categories
        });
        // // Safely retrieve the user's ID using lodash's get function
        // const userId = get(req, 'identity._id');
        // if (!userId) {
        //   return res.sendStatus(403);
        // }
        // // fetch category belonging to the logged in user
        // const categories = await Category.find({userId})
        // return res.status(200).json(categories);
    }
    catch (err) {
        console.error('Error creating category:', err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
exports.getCategoryForUser = getCategoryForUser;
//# sourceMappingURL=category.controller.js.map