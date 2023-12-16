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
exports.removeCategory = exports.updateCategory = exports.saveCategory = exports.getAllCategories = void 0;
const categories_1 = __importDefault(require("../../models/categories"));
const academic_level_1 = __importDefault(require("../../models/academic_level"));
const sequelize_1 = require("sequelize");
const getAllCategories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categories = yield categories_1.default.findAll({
            include: [
                {
                    model: academic_level_1.default,
                    attributes: [],
                },
            ],
            attributes: [
                ['id', 'ID'],
                ['title', 'Titulo'],
                [sequelize_1.Sequelize.literal('AcademicLevel.level'), 'Tipo'],
                ['route', 'URL'],
            ],
            raw: true,
        });
        res.json(categories);
    }
    catch (error) {
        res.status(500).json({ status: 500, message: 'Error al intentar obtener las cagorias', devTool: error.message });
        console.log(error);
    }
});
exports.getAllCategories = getAllCategories;
const saveCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        yield categories_1.default.create({
            title: data.title,
            route: data.route,
            id_level: data.id_level
        });
        res.json({
            status: 200,
            message: 'Categoría creada'
        });
    }
    catch (error) {
        res.status(500).json({ status: 500, message: 'Error al intentar agregar la cagoria', devTool: error.message });
        console.log(error);
    }
});
exports.saveCategory = saveCategory;
const updateCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const body = req.body;
        const fieldsUpdate = {};
        const objectAttributes = { "Titulo": "title", "new_url": "route", };
        Object.entries(body).forEach(([key, value]) => {
            const mappedKey = objectAttributes[key];
            if (mappedKey) {
                fieldsUpdate[mappedKey] = value;
            }
        });
        const updated = yield categories_1.default.update(fieldsUpdate, { where: { id } });
        if (updated[0] > 0) {
            res.json({
                status: 200,
                message: 'Categoría actualizada'
            });
        }
    }
    catch (error) {
        res.status(500).json({ status: 500, message: 'Error al intentar agregar la cagoria', devTool: error.message });
        console.log(error);
    }
});
exports.updateCategory = updateCategory;
const removeCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const response = yield categories_1.default.destroy({ where: { id } });
        if (response > 0) {
            res.json({
                status: 200,
                message: 'Categoría eliminada'
            });
        }
    }
    catch (error) {
        res.status(500).json({ status: 500, message: 'Error al intentar remover la cagoria', devTool: error.message });
        console.log(error);
    }
});
exports.removeCategory = removeCategory;
//# sourceMappingURL=categoriesController.js.map