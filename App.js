"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("./src/models/server");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const server = new server_1.Server();
server.listen();
//# sourceMappingURL=App.js.map