"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const database =  'borcommx_ucback';
const user = 'borcommx_user_ucback';
const password = 'hv4DH{%bOQz$';
const DB = new sequelize_1.Sequelize(database, user, password, {
    host: 'sh-pro30.hostgator.mx',
    dialect: 'mysql',
    logging: false,
    port: '2083'
});
exports.default = DB;
//# sourceMappingURL=config.js.map