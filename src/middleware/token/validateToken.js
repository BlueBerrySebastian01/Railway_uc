"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const validateToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.header('auth-token');
    if (!token) {
        return res.status(401).json({ status: 401, message: 'No hay un token firmado en la sesión' });
    }
    try {
        if (!process.env.SECRET_PASS_JWT) {
            return res.status(500).json({ status: 500, error: 'La variable SECRET_PASS_JWT no está definida' });
        }
        const res_token = jsonwebtoken_1.default.verify(token, process.env.SECRET_PASS_JWT, {
            ignoreExpiration: false
        });
        if (res_token) {
            next();
        }
        else {
            res.json({ status: 401, message: 'Invalid Token.' });
        }
    }
    catch (error) {
        res.json({ status: 401, message: 'Invalid Token.', error: `DevInfo: ${error.message}` });
    }
});
exports.validateToken = validateToken;
//# sourceMappingURL=validateToken.js.map