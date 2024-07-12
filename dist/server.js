"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const db_1 = __importDefault(require("./db"));
const app_1 = __importDefault(require("./app"));
process.on("uncaughtException", (err) => {
    console.log(err);
    process.exit(1);
});
process.on("unhandledRejection", (err) => {
    console.log(err);
    process.exit(1);
});
app_1.default.listen(process.env.PORT, async () => {
    console.log(`Listening for requests on port ${process.env.PORT} ...`);
    await (0, db_1.default)();
    console.log("Successfully connected to mongodb");
});
//# sourceMappingURL=server.js.map