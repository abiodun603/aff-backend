"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const middlewares_1 = require("../middlewares");
const blog_controller_1 = require("../controllers/blog.controller");
exports.default = (router) => {
    router.post("/blog", middlewares_1.isAuthenticated, blog_controller_1.createBlogPost);
};
//# sourceMappingURL=blog.js.map