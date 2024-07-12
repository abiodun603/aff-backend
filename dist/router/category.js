"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const category_controller_1 = require("../controllers/category.controller");
const middlewares_1 = require("../middlewares");
exports.default = (router) => {
    router.post("/category", middlewares_1.isAuthenticated, category_controller_1.createCategory);
    router.get("/category", middlewares_1.isAuthenticated, category_controller_1.getCategoryForUser);
};
//# sourceMappingURL=category.js.map