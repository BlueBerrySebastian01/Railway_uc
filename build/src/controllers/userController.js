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
exports.removeUser = exports.updateUser = exports.saveUser = exports.getUsersPortal = exports.getUsers = void 0;
const bcrypt = require('bcrypt');
const user_1 = __importDefault(require("../../models/user"));
const getUsers = (resq, resp) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield user_1.default.findAll();
    resp.json(users);
});
exports.getUsers = getUsers;
const getUsersPortal = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield user_1.default.findAll({
            attributes: [
                ['id', 'ID'],
                ['name', 'Nombre'],
                ['email', 'Correo']
            ]
        });
        res.json(users);
    }
    catch (error) {
        res.status(500).json({ status: 500, message: 'Error alintentar obtener los usuarios', devTool: error.message });
        console.log(error);
    }
});
exports.getUsersPortal = getUsersPortal;
const saveUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password, confirm_password } = req.body;
        if (password !== confirm_password) {
            res.status(500).json({ status: 500, message: 'Las contraseñas no coincides' });
        }
        const salt = yield bcrypt.genSalt(10);
        const encryptedPassword = yield bcrypt.hash(password, salt);
        const user = yield user_1.default.create({
            name,
            email,
            password: encryptedPassword
        });
        if (user) {
            res.status(201).json({ status: 200, message: 'Usuario creado' });
        }
    }
    catch (error) {
        res.status(500).json({ status: 500, message: '', devTool: error.message });
        console.log(error);
    }
});
exports.saveUser = saveUser;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const body = req.body;
        const fieldsUpdate = {};
        const objectAttributes = {
            "Nombre": "name",
            "Puesto": "Job",
            "Ext": "extension",
            "Correo": "email",
            "Publico": "public",
        };
        Object.entries(body).forEach(([key, value]) => {
            const mappedKey = objectAttributes[key];
            if (mappedKey) {
                fieldsUpdate[mappedKey] = value;
            }
        });
        const updated = yield user_1.default.update(fieldsUpdate, { where: { id } });
        if (updated[0] > 0) {
            res.json({
                status: 200,
                message: 'Contacto actualizado'
            });
        }
    }
    catch (error) {
        res.status(500).json({ status: 500, message: '', devTool: error.message });
        console.log(error);
    }
});
exports.updateUser = updateUser;
const removeUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const response = yield user_1.default.destroy({ where: { id } });
        if (response > 0) {
            res.json({
                status: 200,
                message: 'Contacto eliminado'
            });
        }
    }
    catch (error) {
        res.status(500).json({ status: 500, message: '', devTool: error.message });
        console.log(error);
    }
});
exports.removeUser = removeUser;
//# sourceMappingURL=userController.js.map