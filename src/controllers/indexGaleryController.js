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
exports.updateImage = exports.deleteIndexGalery = exports.addIndexGalery = exports.addIndex = exports.getIndexGalery = exports.getIndex = void 0;
const models_1 = __importDefault(require("../../models"));
const index_galery_1 = __importDefault(require("../../models/index_galery"));
const fs = require('fs');
const path = require('path');
const routeStorage = '../../public/storage';
const getIndex = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const IndexGalery = yield models_1.default.findOne({});
    res.json(IndexGalery);
});
exports.getIndex = getIndex;
const getIndexGalery = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const IndexGalery = yield index_galery_1.default.findAll({});
    res.json(IndexGalery);
});
exports.getIndexGalery = getIndexGalery;
const addIndex = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { video_loop, title_regular, title_bold, about_us, scholarships } = req.body;
        const files = req.files;
        const video_loopData = files['video_loop'] ? files['video_loop'][0] : undefined;
        const serverUrl = `${req.protocol}://${req.get('host')}`;
        if (video_loopData) {
            const serverUrl = `${req.protocol}://${req.get('host')}`;
            const indexData = yield models_1.default.findOne({
                where: {
                    id: id,
                },
            });
            const textoModificado = indexData === null || indexData === void 0 ? void 0 : indexData.video_loop.replace(`${serverUrl}/storage`, '');
            const rutaCompleta = path.join(__dirname, routeStorage, textoModificado);
            if (fs.existsSync(rutaCompleta)) {
                fs.unlinkSync(rutaCompleta);
                console.log(`La imagen ${rutaCompleta} ha sido eliminada correctamente.`);
            }
            else {
                console.log(`La imagen ${rutaCompleta} no existe en la ruta especificada.`);
            }
        }
        const body = {
            video_loop: video_loopData ? `${serverUrl}/storage/${video_loopData.filename}` : video_loop,
            title_regular: title_regular,
            title_bold: title_bold,
            about_us: about_us,
            scholarships: scholarships,
        };
        const IndexGalery = yield models_1.default.update(body, {
            where: {
                id: id,
            },
        });
        res.json({ status: 200 });
    }
    catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.addIndex = addIndex;
const addIndexGalery = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { alt_image, key_video } = req.body;
        const files = req.files;
        const imageData = files['image'] ? files['image'][0] : undefined;
        if (!imageData) {
            // Respondemos con un estado 400 (Bad Request) indicando que faltan datos de imagen
            return res.status(400).json({ error: 'Missing image data' });
        }
        const serverUrl = `${req.protocol}://${req.get('host')}`;
        const body = {
            image: `${serverUrl}/storage/${imageData.filename}`,
            id_index: parseInt(id),
            alt_image: alt_image,
            key_video: key_video,
        };
        const IndexGalery = yield index_galery_1.default.create(body);
        res.json({ status: 200 });
    }
    catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.addIndexGalery = addIndexGalery;
const deleteIndexGalery = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const serverUrl = `${req.protocol}://${req.get('host')}`;
        const indexData = yield index_galery_1.default.findOne({
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
        const result = yield index_galery_1.default.destroy({
            where: {
                id: id,
            },
        });
        if (result === 1) {
            res.json({ status: 200, message: `Testimonio con ID ${id} eliminado correctamente` });
        }
        else {
            res.json({ status: 500, message: `No se encontró una ventaja con ID ${id}` });
        }
    }
    catch (error) {
        console.error('Error al eliminar el nivel académico', error);
        res.status(500).json({ status: 500, message: 'Error interno del servidor' });
    }
});
exports.deleteIndexGalery = deleteIndexGalery;
const updateImage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { alt_image, key_video, image } = req.body;
        const files = req.files;
        const imageData = files['image'] ? files['image'][0] : undefined;
        const serverUrl = `${req.protocol}://${req.get('host')}`;
        const body = {
            image: imageData ? `${serverUrl}/storage/${imageData.filename}` : image,
            alt_image: alt_image,
            key_video: key_video,
        };
        const IndexGalery = yield index_galery_1.default.update(body, {
            where: { id: id },
        });
        console.log(body);
        res.json({ status: 200 });
    }
    catch (error) {
        res.status(500).json({ status: 500, message: '', devTool: error.message });
        console.log(error);
    }
});
exports.updateImage = updateImage;
//# sourceMappingURL=indexGaleryController.js.map