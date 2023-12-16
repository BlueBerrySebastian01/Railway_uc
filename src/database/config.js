"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const database = process.env.DB_NAME || '';
const user = process.env.DB_USER || '';
const password = process.env.DB_PASSWORD || '';
const DB = new sequelize_1.Sequelize(database, user, password, {
    host: 'localhost',
    dialect: 'mysql',
    logging: false
});
exports.default = DB;
//# sourceMappingURL=config.js.map