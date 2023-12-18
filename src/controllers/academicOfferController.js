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
exports.getOfferByIdActive = exports.getLevelByIdActive = exports.delete_testimonials = exports.delete_graduates = exports.delete_works = exports.delete_advantage = exports.delete_academic = exports.AddTestimonial = exports.GetTestimonials = exports.AddGraduates = exports.GetOurGraduates = exports.GetKnow_where = exports.AddKnow_where = exports.GetWorks = exports.AddWork = exports.GetCurriculum = exports.TestimonialUpdate = exports.CurriculumUpdate = exports.CurriculumCreate = exports.GetAdvantage = exports.Addadvantage = exports.SeoCreate = exports.GetSeo = exports.GetContentOfferAcademic = exports.ContentOfferAcademic = exports.GetgeneralInfo = exports.generalInfo = exports.offertAcademic = exports.getCategories = exports.getOffertByCategorie = exports.getOfferById = exports.getOffers = exports.getLevels = void 0;
const academic_level_1 = __importDefault(require("../../models/academic_level"));
const categories_1 = __importDefault(require("../../models/categories"));
const academic_offer_1 = __importDefault(require("../../models/academic_offer"));
const multer_1 = __importDefault(require("multer"));
const storage_1 = require("../helpers/storage");
const general_1 = __importDefault(require("../../models/general"));
const content_1 = __importDefault(require("../../models/content"));
const seo_1 = __importDefault(require("../../models/seo"));
const advantage_1 = __importDefault(require("../../models/advantage"));
const curriculum_1 = __importDefault(require("../../models/curriculum"));
const works_1 = __importDefault(require("../../models/works"));
const know_where_1 = __importDefault(require("../../models/know_where"));
const our_graduates_1 = __importDefault(require("../../models/our_graduates"));
const testimonial_1 = __importDefault(require("../../models/testimonial"));
const fs = require('fs');
const path = require('path');
const routeStorage = '../../public/storage';
const upload = (0, multer_1.default)({ storage: storage_1.storage });
const getLevels = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const levels = yield academic_level_1.default.findAll();
        res.json(levels);
    }
    catch (error) {
        console.error('Error al consultar niveles académicos:', error);
        res.status(500).json({ error: 'Error al consultar niveles académicos' });
    }
});
exports.getLevels = getLevels;
const getOffers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const Offer = yield academic_offer_1.default.findAll({
            include: [
                {
                    model: categories_1.default,
                    include: [
                        {
                            model: academic_level_1.default,
                        },
                    ],
                },
            ],
            order: [['createdAt', 'DESC']],
        });
        res.json(Offer);
    }
    catch (error) {
        console.error('Error al consultar niveles académicos:', error);
        res.status(500).json({ error: 'Error al consultar niveles académicos' });
    }
});
exports.getOffers = getOffers;
const getOfferById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const Offer = yield academic_offer_1.default.findByPk(id, {
            include: [
                {
                    model: categories_1.default,
                    include: [
                        {
                            model: academic_level_1.default,
                        },
                    ],
                },
            ],
        });
        res.json(Offer);
    }
    catch (error) {
        console.error('Error al consultar niveles académicos:', error);
        res.status(500).json({ error: 'Error al consultar niveles académicos' });
    }
});
exports.getOfferById = getOfferById;
const getOffertByCategorie = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { category } = req.params;
        const resultados = yield academic_level_1.default.findAll({
            where: { "id": parseInt(category) },
            include: [
                { model: categories_1.default }
            ]
        });
        res.json(resultados);
    }
    catch (error) {
        throw new Error(error);
    }
});
exports.getOffertByCategorie = getOffertByCategorie;
const getCategories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const categories = yield categories_1.default.findAll({
            where: {
                id_level: id
            }
        });
        res.json(categories);
    }
    catch (error) {
        console.error('Error al consultar niveles académicos:', error);
        res.status(500).json({ error: 'Error al consultar niveles académicos' });
    }
});
exports.getCategories = getCategories;
const offertAcademic = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { titulo, crm, category } = req.body;
        const offerAcademic = yield academic_offer_1.default.create({
            title: titulo,
            crm: crm,
            id_category: category,
            status: false
        });
        res.json(offerAcademic);
    }
    catch (error) {
        console.error('Error al consultar niveles académicos:', error);
        res.status(500).json({ error: 'Error al consultar niveles académicos' });
    }
});
exports.offertAcademic = offertAcademic;
const generalInfo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, type, level, category, duration, modality, start, RVOE, crm, status } = req.body;
        const { id } = req.params;
        const result = yield general_1.default.findOne({
            where: {
                id_offer: id,
            },
        });
        const offer = yield academic_offer_1.default.findByPk(id, {
            include: [categories_1.default],
        });
        const files = req.files;
        const bannerFile = files['banner'] ? files['banner'][0] : undefined;
        const pdfFile = files['pdf'] ? files['pdf'][0] : undefined;
        const serverUrl = `${req.protocol}://${req.get('host')}`;
        const updateDataOfer = {
            title: title,
            id_category: category,
            updatedAt: new Date(),
        };
        const updateDataCategory = {
            id_level: level,
            updatedAt: new Date(),
        };
        if (result) {
            const updateData = {
                type: type,
                start: start,
                mode: modality,
                duration: duration,
                RVOE: RVOE,
                updatedAt: new Date(),
            };
            if (bannerFile) {
                const textoModificado = result.banner.replace(`${serverUrl}/storage`, '');
                const rutaCompleta = path.join(__dirname, routeStorage, textoModificado);
                if (fs.existsSync(rutaCompleta)) {
                    fs.unlinkSync(rutaCompleta);
                    console.log(`La imagen ${rutaCompleta} ha sido eliminada correctamente.`);
                }
                else {
                    console.log(`La imagen ${rutaCompleta} no existe en la ruta especificada.`);
                }
                updateData.banner = `${serverUrl}/storage/${bannerFile.filename}`;
            }
            if (pdfFile) {
                const textoModificado = result.pdf.replace(`${serverUrl}/storage`, '');
                const rutaCompleta = path.join(__dirname, routeStorage, textoModificado);
                if (fs.existsSync(rutaCompleta)) {
                    fs.unlinkSync(rutaCompleta);
                    console.log(`La imagen ${rutaCompleta} ha sido eliminada correctamente.`);
                }
                else {
                    console.log(`La imagen ${rutaCompleta} no existe en la ruta especificada.`);
                }
                updateData.pdf = `${serverUrl}/storage/${pdfFile.filename}`;
            }
            yield general_1.default.update(updateData, {
                where: {
                    id_offer: id,
                },
            });
            if (offer) {
                offer.title = title;
                offer.crm = crm;
                offer.id_category = category;
                offer.status = status;
                yield offer.save();
            }
        }
        else {
            const createData = {
                id_offer: parseInt(id),
                type: type,
                start: start,
                mode: modality,
                RVOE: RVOE,
                duration: duration,
                createdAt: new Date(),
                updatedAt: new Date(),
            };
            if (bannerFile) {
                createData.banner = `${serverUrl}/storage/${bannerFile.filename}`;
            }
            if (pdfFile) {
                createData.pdf = `${serverUrl}/storage/${pdfFile.filename}`;
            }
            yield general_1.default.create(createData);
        }
        res.json({ message: 'Operación completada con éxito.' });
    }
    catch (error) {
        console.error('Error al consultar:', error);
        res.status(500).json({ error: 'Error' });
    }
});
exports.generalInfo = generalInfo;
const GetgeneralInfo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const levelId = req.params.id;
        const result = yield general_1.default.findOne({
            where: {
                id_offer: levelId,
            },
            include: [{
                    model: academic_offer_1.default,
                    include: [
                        {
                            model: categories_1.default,
                            include: [
                                {
                                    model: academic_level_1.default,
                                },
                            ],
                        },
                    ],
                }]
        });
        res.json(result);
    }
    catch (error) {
        console.error('Error al eliminar el nivel académico', error);
        res.status(500).json({ success: false, message: 'Error interno del servidor' });
    }
});
exports.GetgeneralInfo = GetgeneralInfo;
const ContentOfferAcademic = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield content_1.default.findOne({
        where: {
            id_offer: id,
        },
    });
    if (result) {
        const ContentData = yield content_1.default.update(req.body, {
            where: {
                id_offer: id,
            },
        });
        res.json(ContentData);
    }
    else {
        const ContentData = yield content_1.default.create(req.body);
        res.json(ContentData);
    }
});
exports.ContentOfferAcademic = ContentOfferAcademic;
const GetContentOfferAcademic = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield content_1.default.findOne({
        where: {
            id_offer: id,
        },
    });
    res.json(result);
});
exports.GetContentOfferAcademic = GetContentOfferAcademic;
const GetSeo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield seo_1.default.findOne({
        where: {
            id_offer: id,
        },
    });
    res.json(result);
});
exports.GetSeo = GetSeo;
const SeoCreate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield seo_1.default.findOne({
        where: {
            id_offer: id,
        },
    });
    if (result) {
        const SeoData = yield seo_1.default.update(req.body, {
            where: {
                id_offer: id,
            },
        });
        res.json(SeoData);
    }
    else {
        const data = Object.assign({ id_offer: id }, req.body);
        const SeoData = yield seo_1.default.create(data);
        res.json(SeoData);
    }
});
exports.SeoCreate = SeoCreate;
const Addadvantage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { advantage } = req.body;
    const files = req.files;
    const IconFile = files['icon'] ? files['icon'][0] : undefined;
    const serverUrl = `${req.protocol}://${req.get('host')}`;
    const data = {
        id_offer: parseInt(id),
        advantage: advantage,
        icon: `${serverUrl}/storage/${IconFile.filename}`,
        createdAt: new Date(),
        updatedAt: new Date()
    };
    const advantagesData = yield advantage_1.default.create(data);
    const advantages = yield advantage_1.default.findAll({
        where: {
            id_offer: id,
        },
    });
    res.json(advantages);
});
exports.Addadvantage = Addadvantage;
const GetAdvantage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield advantage_1.default.findAll({
        where: {
            id_offer: id,
        },
    });
    res.json(result);
});
exports.GetAdvantage = GetAdvantage;
const CurriculumCreate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const CurriculumData = yield curriculum_1.default.create(req.body);
    res.json(CurriculumData);
});
exports.CurriculumCreate = CurriculumCreate;
const CurriculumUpdate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { section, title, content } = req.body;
        if (!id) {
            return res.status(400).json({ error: 'ID no proporcionado' });
        }
        const updateCurriculum = {
            title: title,
            section: section,
            content: content,
            updatedAt: new Date(),
        };
        const updatedRowsCount = yield curriculum_1.default.update(updateCurriculum, {
            where: { id: id },
        });
        res.json(updatedRowsCount);
    }
    catch (error) {
        console.error('Error al actualizar el curriculum:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});
exports.CurriculumUpdate = CurriculumUpdate;
const TestimonialUpdate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { name, collage_career, content, image } = req.body;
        const files = req.files;
        const IconFile = files['image'] ? files['image'][0] : undefined;
        const serverUrl = `${req.protocol}://${req.get('host')}`;
        if (!id) {
            return res.status(400).json({ error: 'ID no proporcionado' });
        }
        const updateCurriculum = {
            name: name,
            collage_career: collage_career,
            image: IconFile ? `${serverUrl}/storage/${IconFile.filename}` : image,
            content: content,
            updatedAt: new Date(),
        };
        const updatedRowsCount = yield testimonial_1.default.update(updateCurriculum, {
            where: { id: id },
        });
        res.json(updatedRowsCount);
    }
    catch (error) {
        console.error('Error al actualizar el curriculum:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});
exports.TestimonialUpdate = TestimonialUpdate;
const GetCurriculum = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield curriculum_1.default.findAll({
        where: {
            id_offer: id,
        },
    });
    res.json(result);
});
exports.GetCurriculum = GetCurriculum;
const AddWork = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { content } = req.body;
    const files = req.files;
    const IconFile = files['icon'] ? files['icon'][0] : undefined;
    const serverUrl = `${req.protocol}://${req.get('host')}`;
    const data = {
        id_offer: parseInt(id),
        content: content,
        icon: `${serverUrl}/storage/${IconFile.filename}`,
        createdAt: new Date(),
        updatedAt: new Date()
    };
    const advantagesData = yield works_1.default.create(data);
    const advantages = yield works_1.default.findAll({
        where: {
            id_offer: id,
        },
    });
    res.json(advantages);
});
exports.AddWork = AddWork;
const GetWorks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield works_1.default.findAll({
        where: {
            id_offer: id,
        },
    });
    res.json(result);
});
exports.GetWorks = GetWorks;
const AddKnow_where = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { content } = req.body;
    const result = yield know_where_1.default.findOne({
        where: {
            id_offer: id,
        },
    });
    if (!result) {
        const data = {
            id_offer: parseInt(id),
            content: content,
            createdAt: new Date(),
            updatedAt: new Date()
        };
        const Know_whereData = yield know_where_1.default.create(data);
    }
    else {
        const data = {
            id_offer: parseInt(id),
            content: content,
            updatedAt: new Date()
        };
        const Know_whereData = yield know_where_1.default.update(data, {
            where: {
                id_offer: id,
            },
        });
    }
    const Know_wheres = yield know_where_1.default.findOne({
        where: {
            id_offer: id,
        },
    });
    res.json(Know_wheres);
});
exports.AddKnow_where = AddKnow_where;
const GetKnow_where = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield know_where_1.default.findOne({
        where: {
            id_offer: id,
        },
    });
    res.json(result);
});
exports.GetKnow_where = GetKnow_where;
const GetOurGraduates = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield our_graduates_1.default.findAll({
        where: {
            id_offer: id,
        },
    });
    res.json(result);
});
exports.GetOurGraduates = GetOurGraduates;
const AddGraduates = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { alt_image, video } = req.body;
    const files = req.files;
    const IconFile = files['image'] ? files['image'][0] : undefined;
    const serverUrl = `${req.protocol}://${req.get('host')}`;
    const data = {
        id_offer: parseInt(id),
        alt_image: alt_image,
        video: video,
        image: `${serverUrl}/storage/${IconFile.filename}`,
        createdAt: new Date(),
        updatedAt: new Date()
    };
    const advantagesData = yield our_graduates_1.default.create(data);
    const advantages = yield our_graduates_1.default.findAll({
        where: {
            id_offer: id,
        },
    });
    res.json(advantages);
});
exports.AddGraduates = AddGraduates;
const GetTestimonials = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield testimonial_1.default.findAll({
        where: {
            id_offer: id,
        },
    });
    res.json(result);
});
exports.GetTestimonials = GetTestimonials;
const AddTestimonial = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { name, collage_career, content } = req.body;
    const files = req.files;
    const IconFile = files['image'] ? files['image'][0] : undefined;
    const serverUrl = `${req.protocol}://${req.get('host')}`;
    const data = {
        id_offer: parseInt(id),
        name: name,
        collage_career: collage_career,
        image: `${serverUrl}/storage/${IconFile.filename}`,
        content: content,
        createdAt: new Date(),
        updatedAt: new Date()
    };
    const advantagesData = yield testimonial_1.default.create(data);
    const advantages = yield testimonial_1.default.findAll({
        where: {
            id_offer: id,
        },
    });
    res.json(advantages);
});
exports.AddTestimonial = AddTestimonial;
const delete_academic = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const levelId = req.params.id;
        const result = yield academic_offer_1.default.destroy({
            where: {
                id: levelId,
            },
        });
        if (result === 1) {
            res.json({ success: true, message: `Oferta académica con ID ${levelId} eliminado correctamente` });
        }
        else {
            res.json({ success: false, message: `No se encontró un oferta académica con ID ${levelId}` });
        }
    }
    catch (error) {
        console.error('Error al eliminar el nivel académico', error);
        res.status(500).json({ success: false, message: 'Error interno del servidor' });
    }
});
exports.delete_academic = delete_academic;
const delete_advantage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const serverUrl = `${req.protocol}://${req.get('host')}`;
        const advantange = yield advantage_1.default.findOne({
            where: {
                id: id,
            },
        });
        const textoModificado = advantange === null || advantange === void 0 ? void 0 : advantange.icon.replace(`${serverUrl}/storage`, '');
        const rutaCompleta = path.join(__dirname, routeStorage, textoModificado);
        if (fs.existsSync(rutaCompleta)) {
            fs.unlinkSync(rutaCompleta);
            console.log(`La imagen ${rutaCompleta} ha sido eliminada correctamente.`);
        }
        else {
            console.log(`La imagen ${rutaCompleta} no existe en la ruta especificada.`);
        }
        const result = yield advantage_1.default.destroy({
            where: {
                id: id,
            },
        });
        if (result === 1) {
            res.json({ status: 200, message: `Ventaja con ID ${id} eliminado correctamente` });
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
exports.delete_advantage = delete_advantage;
const delete_works = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const serverUrl = `${req.protocol}://${req.get('host')}`;
        const work = yield works_1.default.findOne({
            where: {
                id: id,
            },
        });
        const textoModificado = work === null || work === void 0 ? void 0 : work.icon.replace(`${serverUrl}/storage`, '');
        const rutaCompleta = path.join(__dirname, routeStorage, textoModificado);
        if (fs.existsSync(rutaCompleta)) {
            fs.unlinkSync(rutaCompleta);
            console.log(`La imagen ${rutaCompleta} ha sido eliminada correctamente.`);
        }
        else {
            console.log(`La imagen ${rutaCompleta} no existe en la ruta especificada.`);
        }
        const result = yield works_1.default.destroy({
            where: {
                id: id,
            },
        });
        if (result === 1) {
            res.json({ status: 200, message: `Ventaja con ID ${id} eliminado correctamente` });
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
exports.delete_works = delete_works;
const delete_graduates = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const serverUrl = `${req.protocol}://${req.get('host')}`;
        const work = yield our_graduates_1.default.findOne({
            where: {
                id: id,
            },
        });
        const textoModificado = work === null || work === void 0 ? void 0 : work.image.replace(`${serverUrl}/storage`, '');
        const rutaCompleta = path.join(__dirname, routeStorage, textoModificado);
        if (fs.existsSync(rutaCompleta)) {
            fs.unlinkSync(rutaCompleta);
            console.log(`La imagen ${rutaCompleta} ha sido eliminada correctamente.`);
        }
        else {
            console.log(`La imagen ${rutaCompleta} no existe en la ruta especificada.`);
        }
        const result = yield our_graduates_1.default.destroy({
            where: {
                id: id,
            },
        });
        if (result === 1) {
            res.json({ status: 200, message: `Ventaja con ID ${id} eliminado correctamente` });
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
exports.delete_graduates = delete_graduates;
const delete_testimonials = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const serverUrl = `${req.protocol}://${req.get('host')}`;
        const testimonials = yield testimonial_1.default.findOne({
            where: {
                id: id,
            },
        });
        const textoModificado = testimonials === null || testimonials === void 0 ? void 0 : testimonials.image.replace(`${serverUrl}/storage`, '');
        const rutaCompleta = path.join(__dirname, routeStorage, textoModificado);
        if (fs.existsSync(rutaCompleta)) {
            fs.unlinkSync(rutaCompleta);
            console.log(`La imagen ${rutaCompleta} ha sido eliminada correctamente.`);
        }
        else {
            console.log(`La imagen ${rutaCompleta} no existe en la ruta especificada.`);
        }
        const result = yield testimonial_1.default.destroy({
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
        console.error('Error al eliminar el testimonio', error);
        res.status(500).json({ status: 500, message: 'Error interno del servidor' });
    }
});
exports.delete_testimonials = delete_testimonials;
// get endPoint
const getLevelByIdActive = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const Offer = yield academic_level_1.default.findOne({
            where: {
                id: id,
            },
            include: [
                {
                    model: categories_1.default,
                    include: [
                        {
                            model: academic_offer_1.default,
                            where: {
                                status: 1,
                            },
                        },
                    ],
                },
            ],
        });
        res.json(Offer);
    }
    catch (error) {
        console.error('Error al consultar niveles académicos:', error);
        res.status(500).json({ error: 'Error al consultar niveles académicos' });
    }
});
exports.getLevelByIdActive = getLevelByIdActive;
const getOfferByIdActive = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const Offer = yield academic_offer_1.default.findOne({
            where: {
                id: id,
                status: 1
            },
            include: [
                {
                    model: categories_1.default,
                    include: [
                        {
                            model: academic_level_1.default,
                        },
                    ],
                },
            ],
        });
        res.json(Offer);
    }
    catch (error) {
        console.error('Error al consultar niveles académicos:', error);
        res.status(500).json({ error: 'Error al consultar niveles académicos' });
    }
});
exports.getOfferByIdActive = getOfferByIdActive;
//# sourceMappingURL=academicOfferController.js.map