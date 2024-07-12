"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const users_controller_1 = require("../controllers/users.controller");
const middlewares_1 = require("../middlewares");
exports.default = (router) => {
    router.get("/users", middlewares_1.isAuthenticated, users_controller_1.getAllUsers);
};
//# sourceMappingURL=users.js.map