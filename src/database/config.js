"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const database = 'railway'
const user ='root'
const password = '5ceC3b4cB5b6eC54Dfe2d-c365AGF346'


const DB = new sequelize_1.Sequelize(database, user, password, {
    host: 'roundhouse.proxy.rlwy.net',
    dialect: 'mysql',
    logging: false,
    port: 36012
});
exports.default = DB;
//# sourceMappingURL=config.js.map