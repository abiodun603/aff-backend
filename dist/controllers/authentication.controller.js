"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = exports.login = void 0;
const users_1 = require("../db/models/users");
const helpers_1 = require("../helpers");
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.sendStatus(400);
        }
        const user = await (0, users_1.getUserByEmail)(email).select('+authentication.salt +authentication.password');
        if (!user) {
            return res.sendStatus(400);
        }
        // authenticate user without knowing there password using the hash comparison 
        const expectedHash = (0, helpers_1.authentication)(user?.authentication?.salt, password);
        if (user.authentication.password !== expectedHash) {
            return res.sendStatus(403);
        }
        const salt = (0, helpers_1.random)();
        user.authentication.sessionToken = (0, helpers_1.authentication)(salt, user._id.toString());
        await user.save();
        res.cookie('ABIODUN-AUTH', user.authentication.sessionToken, {
            domain: 'localhost',
            path: "/"
        });
        return res.status(200).json(user).send();
    }
    catch (error) {
    }
};
exports.login = login;
const register = async (req, res) => {
    try {
        const { email, password, username } = req.body;
        console.log(email, password, username);
        if (!email || !password || !username) {
            return res.sendStatus(400);
        }
        const existingUser = await (0, users_1.getUserByEmail)(email);
        if (existingUser) {
            console.log(existingUser, "hmmm");
            return res.status(400).json({ error: 'User already exists' });
        }
        const salt = (0, helpers_1.random)();
        const user = await (0, users_1.createUser)({
            username,
            email,
            authentication: {
                salt,
                password: (0, helpers_1.authentication)(salt, password),
            }
        });
        console.log(user);
        return res.status(200).json(user).end();
    }
    catch (err) {
        console.log(err);
        return res.sendStatus(400);
    }
};
exports.register = register;
//# sourceMappingURL=authentication.controller.js.map