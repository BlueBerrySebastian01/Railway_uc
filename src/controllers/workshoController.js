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
exports.removeWorkshop = exports.updateWorkshop = exports.saveWorkshop = exports.getWorkshop = exports.getWorkshopbyTitle = exports.getWorkshops = void 0;
const workshop_1 = __importDefault(require("../../models/workshop"));
const user_1 = __importDefault(require("../../models/user"));
const sections_1 = __importDefault(require("../../models/sections"));
const fs = require('fs');
const path = require('path');
const routeStorage = '../../public/storage';
const getWorkshops = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const workshops = yield workshop_1.default.findAll({
            include: {
                model: user_1.default,
                attributes: []
            },
            attributes: [
                ['id', 'ID'],
                // [Sequelize.literal('User.name'), 'Usuario'],
                ['name', 'Nombre'],
                ['card_background', 'Caratula'],
                ['title', 'Titulo'],
                ['background', 'Banner'],
            ]
        });
        res.json(workshops);
    }
    catch (error) {
        res.status(500).json({ status: 500, message: 'Error al obtener los talleres', devTool: error.message });
        console.log(error);
    }
});
exports.getWorkshops = getWorkshops;
const getWorkshopbyTitle = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title } = req.params;
        console.log(title);
        let name;
        switch (title) {
            case 'arte':
                name = 'Arte y cultura';
                break;
            case 'deportes':
                name = 'Deportes';
                break;
            case 'vinculacion':
                name = 'Vinculación';
                break;
            default:
                break;
        }
        const workshop = yield workshop_1.default.findOne({
            where: { name: name },
            include: [
                {
                    model: sections_1.default,
                },
            ],
        });
        res.json(workshop);
    }
    catch (error) {
        res.status(500).json({ status: 500, message: 'Error al obtener los talleres', devTool: error.message });
        console.log(error);
    }
});
exports.getWorkshopbyTitle = getWorkshopbyTitle;
const getWorkshop = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const workshop = yield workshop_1.default.findByPk(id, {
            attributes: ['id', 'name', 'card_background', 'title', 'background']
        });
        res.json(workshop);
    }
    catch (error) {
        res.status(500).json({ status: 500, message: 'Error al obtener los talleres', devTool: error.message });
        console.log(error);
    }
});
exports.getWorkshop = getWorkshop;
const saveWorkshop = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id_user, name, title } = req.body;
        const files = req.files;
        const cardFile = files['card_background'] ? files['card_background'][0] : undefined;
        const bannerFile = files['background'] ? files['background'][0] : undefined;
        if (cardFile && bannerFile) {
            const serverUrl = `${req.protocol}://${req.get('host')}`;
            const card_background = `${serverUrl}/storage/${cardFile === null || cardFile === void 0 ? void 0 : cardFile.filename}`;
            const background = `${serverUrl}/storage/${bannerFile === null || bannerFile === void 0 ? void 0 : bannerFile.filename}`;
            const workshop = yield workshop_1.default.create({
                id_user,
                name,
                card_background,
                title,
                background
            });
            if (workshop) {
                res.json({
                    status: 200,
                    message: 'Workshop creado'
                });
            }
        }
    }
    catch (error) {
        res.status(500).json({ status: 500, message: 'Error al intentar crear el taller', devTool: error.message });
        console.log(error);
    }
});
exports.saveWorkshop = saveWorkshop;
const updateWorkshop = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
                    const currentFile = yield workshop_1.default.findByPk(id, {
                        attributes: [field],
                    });
                    const existingFileName = currentFile === null || currentFile === void 0 ? void 0 : currentFile.get(field);
                    console.log(existingFileName);
                    if (existingFileName) {
                        const fileNameFromUrl = existingFileName === null || existingFileName === void 0 ? void 0 : existingFileName.replace(`${serverUrl}/storage`, '');
                        if (fileNameFromUrl) {
                            const existingFilePath = path.join(__dirname, routeStorage, fileNameFromUrl);
                            try {
                                yield fs.unlink(existingFilePath);
                                console.log(`Archivo existente eliminado: ${existingFilePath}`);
                            }
                            catch (unlinkError) {
                                console.error('Error al eliminar el archivo existente:', existingFilePath);
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
            yield workshop_1.default.update(body, {
                where: { id: id },
            });
            res.json({
                status: 200,
                message: 'Taller actualizado'
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
        res.status(500).json({ status: 500, message: 'Error al intentar actualizar el taller', devTool: error.message });
        console.log(error);
    }
});
exports.updateWorkshop = updateWorkshop;
const removeWorkshop = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const serverUrl = `${req.protocol}://${req.get('host')}`;
        const WorkshopData = yield workshop_1.default.findOne({
            where: {
                id: id,
            },
        });
        const textoModificado = WorkshopData === null || WorkshopData === void 0 ? void 0 : WorkshopData.card_background.replace(`${serverUrl}/storage`, '');
        const textoModificado2 = WorkshopData === null || WorkshopData === void 0 ? void 0 : WorkshopData.background.replace(`${serverUrl}/storage`, '');
        const rutaCompleta = path.join(__dirname, routeStorage, textoModificado);
        const rutaCompleta2 = path.join(__dirname, routeStorage, textoModificado2);
        if (fs.existsSync(rutaCompleta)) {
            fs.unlinkSync(rutaCompleta);
            fs.unlinkSync(rutaCompleta2);
            console.log(`La imagen ${rutaCompleta} y ${rutaCompleta2} ha sido eliminada correctamente.`);
        }
        else {
            console.log(`La imagen ${rutaCompleta} y ${rutaCompleta2} no existe en la ruta especificada.`);
        }
        const response = yield workshop_1.default.destroy({ where: { id } });
        if (response > 0) {
            res.json({
                status: 200,
                message: 'Covenio eliminado'
            });
        }
    }
    catch (error) {
        res.status(500).json({ status: 500, message: 'Error al intentar elminar el taller', devTool: error.message });
        console.log(error);
    }
});
exports.removeWorkshop = removeWorkshop;
//# sourceMappingURL=workshoController.js.map