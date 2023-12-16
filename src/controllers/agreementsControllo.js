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
exports.removeAgreement = exports.updateAgreement = exports.saveAgreement = exports.getAgreements = void 0;
const agreement_1 = __importDefault(require("../../models/agreement"));
const user_1 = __importDefault(require("../../models/user"));
const sequelize_1 = require("sequelize");
// import * as fs from 'fs/promises';
// import * as path from 'path';
const fs = require('fs');
const path = require('path');
const routeStorage = '../../public/storage';
const getAgreements = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const agreements = yield agreement_1.default.findAll({
            include: {
                model: user_1.default,
                attributes: []
            },
            attributes: [
                ['id', 'ID'],
                [sequelize_1.Sequelize.literal('User.name'), 'Usuario'],
                ['image', 'Convenio']
            ]
        });
        res.json(agreements);
    }
    catch (error) {
        res.status(500).json({ status: 500, message: 'Error al intentar obtener los convenios', devTool: error.message });
        console.log(error);
    }
});
exports.getAgreements = getAgreements;
const saveAgreement = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const file = req.files;
        const { id_user } = req.body;
        if (file) {
            const uploadFile = file['image'] ? file['image'][0] : undefined;
            if (uploadFile) {
                const serverUrl = `${req.protocol}://${req.get('host')}`;
                const url = `${serverUrl}/storage/${uploadFile === null || uploadFile === void 0 ? void 0 : uploadFile.filename}`;
                const agreement = yield agreement_1.default.create({
                    id_user: id_user,
                    image: url
                });
                if (agreement) {
                    res.json({
                        status: 200,
                        message: 'Convenio agregado'
                    });
                }
            }
        }
    }
    catch (error) {
        res.status(500).json({ status: 500, message: 'Erro al intentar subir el convenio', devTool: error.message });
        console.log(error);
    }
});
exports.saveAgreement = saveAgreement;
const updateAgreement = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const data = req.body;
        const files = req.files;
        console.log(files);
        if (Object.keys(data).length > 0 || Object.keys(files).length > 0) {
            let body = {};
            if (Object.keys(data).length > 0) {
                body = Object.assign(Object.assign({}, body), data);
            }
            if (Object.keys(files).length > 0) {
                const fileFields = ['image'];
                const serverUrl = `${req.protocol}://${req.get('host')}`;
                const fileUrls = {};
                for (const field of fileFields) {
                    const file = files[field] ? files[field][0] : undefined;
                    const currentFile = yield agreement_1.default.findByPk(id, {
                        attributes: [field],
                    });
                    const existingFileName = currentFile === null || currentFile === void 0 ? void 0 : currentFile.get(field);
                    if (existingFileName) {
                        const fileNameFromUrl = existingFileName === null || existingFileName === void 0 ? void 0 : existingFileName.split('/').pop();
                        if (fileNameFromUrl) {
                            const existingFilePath = path.join(serverUrl, 'storage', fileNameFromUrl);
                            try {
                                yield fs.unlink(existingFilePath);
                                console.log(`Archivo existente eliminado: ${existingFilePath}`);
                            }
                            catch (unlinkError) {
                                console.error('Error al eliminar el archivo existente:', unlinkError);
                            }
                        }
                        else {
                            console.warn('La imagen no existe');
                        }
                    }
                    fileUrls[field] = file ? `${serverUrl}/storage/${file.filename}` : undefined;
                }
                body = Object.assign(Object.assign({}, body), fileUrls);
            }
            yield agreement_1.default.update(body, {
                where: { id: id },
            });
            res.json({
                status: 200,
                message: 'Convenio actualizado'
            });
        }
    }
    catch (error) {
        res.status(500).json({ status: 500, message: 'Error al intentar actulizar el convenio', devTool: error.message });
        console.log(error);
    }
});
exports.updateAgreement = updateAgreement;
const removeAgreement = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const serverUrl = `${req.protocol}://${req.get('host')}`;
        const indexData = yield agreement_1.default.findOne({
            where: {
                id: id,
            },
        });
        const textoModificado = indexData === null || indexData === void 0 ? void 0 : indexData.image.replace(`${serverUrl}/storage`, '');
        const rutaCompleta = path.join(__dirname, routeStorage, textoModificado);
        if (fs.existsSync(rutaCompleta)) {
            fs.unlinkSync(rutaCompleta);
            console.log(`La imagen ${rutaCompleta} ha sido eliminada correctamente.`);
        }
        else {
            console.log(`La imagen ${rutaCompleta} no existe en la ruta especificada.`);
        }
        const response = yield agreement_1.default.destroy({ where: { id } });
        if (response > 0) {
            res.json({
                status: 200,
                message: 'Covenio eliminado'
            });
        }
    }
    catch (error) {
        res.status(500).json({ status: 500, message: 'Error al intentar eliminar el convenio', devTool: error.message });
        console.log(error);
    }
});
exports.removeAgreement = removeAgreement;
//# sourceMappingURL=agreementsControllo.js.map