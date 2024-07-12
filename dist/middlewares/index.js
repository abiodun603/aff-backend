"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthenticated = void 0;
const lodash_1 = require("lodash");
const users_1 = require("../db/models/users");
const isAuthenticated = async (req, res, next) => {
    try {
        const sessionToken = req.cookies['ABIODUN-AUTH'];
        if (!sessionToken) {
            return res.sendStatus(403);
        }
        const existingUser = await (0, users_1.getUserBySessionToken)(sessionToken);
        if (!existingUser) {
            return res.sendStatus(403);
        }
        (0, lodash_1.merge)(req, { identity: existingUser });
        return next();
    }
    catch (error) {
    }
};
exports.isAuthenticated = isAuthenticated;
//# sourceMappingURL=index.js.map