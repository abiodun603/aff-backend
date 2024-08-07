"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const middlewares_1 = require("../middlewares");
const blog_controller_1 = require("../controllers/blog.controller");
exports.default = (router) => {
    router.post("/product", middlewares_1.isAuthenticated, blog_controller_1.createBlogPost);
    router.get("/products", middlewares_1.isAuthenticated, blog_controller_1.getBlogPost);
    router.get("/product/:id", middlewares_1.isAuthenticated, blog_controller_1.getProductById);
    router.get("/product/counts", middlewares_1.isAuthenticated, blog_controller_1.productCount);
    router.patch("/product/:id", middlewares_1.isAuthenticated, blog_controller_1.updateProductPost);
    router.delete("/product/:id", middlewares_1.isAuthenticated, blog_controller_1.deleteProductPost);
};
//# sourceMappingURL=blog.js.map