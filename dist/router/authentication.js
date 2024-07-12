"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const authentication_controller_1 = require("../controllers/authentication.controller");
exports.default = (router) => {
    router.post('/auth/register', authentication_controller_1.register);
    router.post('/auth/login', authentication_controller_1.login);
};
//# sourceMappingURL=authentication.js.map