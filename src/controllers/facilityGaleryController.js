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
exports.removeImage = exports.updateImage = exports.saveImage = exports.getImage = exports.getGalery = void 0;
const fs = __importStar(require("fs/promises"));
const path = __importStar(require("path"));
const facilities_galery_1 = __importDefault(require("../../models/facilities_galery"));
const getGalery = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const galery = yield facilities_galery_1.default.findAll({
            where: {
                id_facility: id
            },
            attributes: [
                ['id', 'ID'],
                ['image', 'Imagen'],
            ]
        });
        res.json(galery);
    }
    catch (error) {
        res.status(500).json({ status: 500, message: 'Error al intentar obtener la galería', devTool: error.message });
        console.log(error);
    }
});
exports.getGalery = getGalery;
const getImage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const image = yield facilities_galery_1.default.findAll({
            where: {
                id_facility: id
            },
            attributes: ['id', 'image']
        });
        res.json(image);
    }
    catch (error) {
        res.status(500).json({ status: 500, message: 'Error al intentar obtener la imagen', devTool: error.message });
        console.log(error);
    }
});
exports.getImage = getImage;
const saveImage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        try {
            const { id_facility, name, title } = req.body;
            const file = req.files;
            const _image = file['image'] ? file['image'][0] : undefined;
            if (_image) {
                const serverUrl = `${req.protocol}://${req.get('host')}`;
                const image = `${serverUrl}/storage/${_image === null || _image === void 0 ? void 0 : _image.filename}`;
                const workshop = yield facilities_galery_1.default.create({
                    id_facility,
                    image,
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
            res.status(500).json({ status: 500, message: '', devTool: error.message });
            console.log(error);
        }
    }
    catch (error) {
        res.status(500).json({ status: 500, message: '', devTool: error.message });
        console.log(error);
    }
});
exports.saveImage = saveImage;
const updateImage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
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
                    const fileFields = ['image'];
                    const serverUrl = `${req.protocol}://${req.get('host')}`;
                    const fileUrls = {};
                    for (const field of fileFields) {
                        const file = files[field] ? files[field][0] : undefined;
                        const currentFile = yield facilities_galery_1.default.findByPk(id, {
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
                yield facilities_galery_1.default.update(body, {
                    where: { id: id },
                });
                res.json({
                    status: 200,
                    message: 'Seccion actualizada'
                });
            }
        }
        catch (error) {
            res.status(500).json({ status: 500, message: 'Error al imagend de la galería', devTool: error.message });
            console.log(error);
        }
    }
    catch (error) {
        res.status(500).json({ status: 500, message: '', devTool: error.message });
        console.log(error);
    }
});
exports.updateImage = updateImage;
const removeImage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const response = yield facilities_galery_1.default.destroy({ where: { id } });
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
exports.removeImage = removeImage;
//# sourceMappingURL=facilityGaleryController.js.map