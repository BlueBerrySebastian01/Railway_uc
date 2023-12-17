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
exports.removeContact = exports.updateContact = exports.saveContact = exports.getContactsActive = exports.getContacts = void 0;
const directory_1 = __importDefault(require("../../models/directory"));
const sequelize_1 = require("sequelize");
const getContacts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const contacts = yield directory_1.default.findAll({
            attributes: [
                ['id', 'ID'],
                ['prefix', 'Grado'],
                ['name', 'Nombre'],
                ['job', 'Puesto'],
                ['extension', 'Ext'],
                ['email', 'Correo'],
                [sequelize_1.Sequelize.literal('CASE WHEN public = 1 THEN "true" ELSE "false" END'), 'Publico'],
            ]
        });
        res.json(contacts);
    }
    catch (error) {
        res.status(500).json({ status: 500, message: '', devTool: error.message });
        console.log(error);
    }
});
exports.getContacts = getContacts;
const getContactsActive = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const contacts = yield directory_1.default.findAll({
            where: {
                public: true
            }
        });
        console.log(contacts);
        res.json(contacts);
    }
    catch (error) {
        res.status(500).json({ status: 500, message: '', devTool: error.message });
        console.log(error);
    }
});
exports.getContactsActive = getContactsActive;
const saveContact = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        const contact = yield directory_1.default.create({
            id_user: data.id_user,
            prefix: data.prefix,
            name: data.name,
            job: data.job,
            email: data.email,
            extension: data.extension,
            public: data.public
        });
        if (contact) {
            res.json({
                status: 200,
                message: 'Contacto creado'
            });
        }
    }
    catch (error) {
        res.status(500).json({ status: 500, message: '', devTool: error.message });
        console.log(error);
    }
});
exports.saveContact = saveContact;
const updateContact = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const body = req.body;
        // console.log(body)
        const fieldsUpdate = {};
        const objectAttributes = {
            "Grado": "prefix",
            "Nombre": "name",
            "Puesto": "job",
            "Ext": "extension",
            "Correo": "email",
            "Publico": "public",
        };
        Object.entries(body).forEach(([key, value]) => {
            const mappedKey = objectAttributes[key];
            if (mappedKey) {
                if (mappedKey == 'public') {
                    fieldsUpdate[mappedKey] = (value == '0' ? false : true);
                }
                else {
                    fieldsUpdate[mappedKey] = value;
                }
            }
        });
        const updated = yield directory_1.default.update(fieldsUpdate, { where: { id } });
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
exports.updateContact = updateContact;
const removeContact = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const response = yield directory_1.default.destroy({ where: { id } });
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
exports.removeContact = removeContact;
//# sourceMappingURL=directoryController.js.map