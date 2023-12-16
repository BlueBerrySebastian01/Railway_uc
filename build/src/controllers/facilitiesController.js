"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.removeFacility = exports.updateFacility = exports.saveFacility = exports.getFacility = exports.getFacilities = void 0;
const fs = __importStar(require("fs/promises"));
const path = __importStar(require("path"));
const facilities_1 = __importDefault(require("../../models/facilities"));
const user_1 = __importDefault(require("../../models/user"));
const getFacilities = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const facilities = yield facilities_1.default.findAll({
            include: {
                model: user_1.default,
                attributes: []
            },
            attributes: [
                ['id', 'ID'],
                // [Sequelize.literal('User.name'), 'Usuario'],
                ['name', 'Usuario'],
                ['card_background', 'Caratula'],
                ['title', 'Titulo Banner'],
                ['background', 'Banner'],
            ]
        });
        res.json(facilities);
    }
    catch (error) {
        res.status(500).json({ status: 500, message: 'Error  al intentar obtener las seccions', devTool: error.message });
        console.log(error);
    }
});
exports.getFacilities = getFacilities;
const getFacility = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        console.log(id);
        const facility = yield facilities_1.default.findByPk(id, {});
        res.json(facility);
    }
    catch (error) {
        res.status(500).json({ status: 500, message: '', devTool: error.message });
        console.log(error);
    }
});
exports.getFacility = getFacility;
const saveFacility = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id_user, name, title, about_us } = req.body;
        const files = req.files;
        const cardFile = files['card_background'] ? files['card_background'][0] : undefined;
        const bannerFile = files['background'] ? files['background'][0] : undefined;
        if (cardFile && bannerFile) {
            const serverUrl = `${req.protocol}://${req.get('host')}`;
            const card_background = `${serverUrl}/storage/${cardFile === null || cardFile === void 0 ? void 0 : cardFile.filename}`;
            const background = `${serverUrl}/storage/${bannerFile === null || bannerFile === void 0 ? void 0 : bannerFile.filename}`;
            const workshop = yield facilities_1.default.create({
                id_user,
                name,
                card_background,
                title,
                background,
                about_it: about_us
            });
            if (workshop) {
                res.json({
                    status: 200,
                    message: 'Instalacion creada'
                });
            }
        }
    }
    catch (error) {
        res.status(500).json({ status: 500, message: 'Error al intentar crear la instalacion', devTool: error.message });
        console.log(error);
    }
});
exports.saveFacility = saveFacility;
const updateFacility = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const data = req.body;
        const files = req.files;
        if (Object.keys(data).length > 0 || Object.keys(files).length > 0) {
            let body = {};
            if (Object.keys(data).length > 0) {
                body = Object.assign(Object.assign({}, body), data);
            }
            if (Object.keys(files).length > 0) {
                const fileFields = ['card_background', 'background'];
                const serverUrl = `${req.protocol}://${req.get('host')}`;
                const fileUrls = {};
                for (const field of fileFields) {
                    const file = files[field] ? files[field][0] : undefined;
                    const currentFile = yield facilities_1.default.findByPk(id, {
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
            yield facilities_1.default.update(body, {
                where: { id: id },
            });
            res.json({
                status: 200,
                message: 'Instlacion actualizada'
            });
        }
        else {
            res.json({
                status: 204,
                message: 'No se encontró información para actualizar',
            });
        }
    }
    catch (error) {
        res.status(500).json({ status: 500, message: 'Error al actualizar ', devTool: error.message });
        console.log(error);
    }
});
exports.updateFacility = updateFacility;
const removeFacility = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        console.log(id);
        const response = yield facilities_1.default.destroy({ where: { id } });
        if (response > 0) {
            res.json({
                status: 200,
                message: 'Sección eliminada'
            });
        }
    }
    catch (error) {
        res.status(500).json({ status: 500, message: '', devTool: error.message });
        console.log(error);
    }
});
exports.removeFacility = removeFacility;
//# sourceMappingURL=facilitiesController.js.map