"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const academicOfferController_1 = require("../controllers/academicOfferController");
const storage_1 = require("../helpers/storage");
const multer_1 = __importDefault(require("multer"));
const upload = (0, multer_1.default)({ storage: storage_1.storage });
const router = (0, express_1.Router)();
router.get('/all-levels', academicOfferController_1.getLevels);
router.get('/get-offers', academicOfferController_1.getOffers);
router.get('/get-offer/:id', academicOfferController_1.getOfferById);
//endPoints Landing
router.get('/get-level-offer/:id', academicOfferController_1.getLevelByIdActive);
router.get('/get-offer-active/:id', academicOfferController_1.getOfferByIdActive);
//
router.get('/categorie/:id', academicOfferController_1.getCategories);
router.get('/academic-offer-by-category/:category', academicOfferController_1.getOffertByCategorie);
router.get('/offer/general/:id', academicOfferController_1.GetgeneralInfo);
router.get('/offer/content/:id', academicOfferController_1.GetContentOfferAcademic);
router.get('/offer/SEO/:id', academicOfferController_1.GetSeo);
router.get('/offer/advantage/:id', academicOfferController_1.GetAdvantage);
router.get('/offer/curriculum/:id', academicOfferController_1.GetCurriculum);
router.get('/offer/work/:id', academicOfferController_1.GetWorks);
router.get('/offer/know_where/:id', academicOfferController_1.GetKnow_where);
router.get('/offer/our_graduates/:id', academicOfferController_1.GetOurGraduates);
router.get('/offer/testimonials/:id', academicOfferController_1.GetTestimonials);
router.post('/offer-academic', academicOfferController_1.offertAcademic);
router.post('/offer-academic/general/:id', upload.fields([
    { name: 'banner', maxCount: 1 },
    { name: 'pdf', maxCount: 1 },
]), academicOfferController_1.generalInfo);
router.post('/offer-academic/content/:id', academicOfferController_1.ContentOfferAcademic);
router.post('/offer-academic/SEO/:id', academicOfferController_1.SeoCreate);
router.post('/offer-academic/know_where/:id', academicOfferController_1.AddKnow_where);
router.post('/offer-academic/advantage/:id', upload.fields([
    { name: 'icon', maxCount: 1 },
]), academicOfferController_1.Addadvantage);
router.post('/offer-academic/graduates/:id', upload.fields([
    { name: 'image', maxCount: 1 },
]), academicOfferController_1.AddGraduates);
router.post('/offer-academic/work/:id', upload.fields([
    { name: 'icon', maxCount: 1 },
]), academicOfferController_1.AddWork);
router.post('/offer-academic/testimonials/:id', upload.fields([
    { name: 'image', maxCount: 1 },
]), academicOfferController_1.AddTestimonial);
router.post('/offer-academic/curriculum', academicOfferController_1.CurriculumCreate);
router.patch('/offer-academic/curriculum_edit/:id', academicOfferController_1.CurriculumUpdate);
router.put('/offer-academic/edit/testimonials/:id', upload.fields([
    { name: 'image', maxCount: 1 },
]), academicOfferController_1.TestimonialUpdate);
router.delete('/delete_academic/:id', academicOfferController_1.delete_academic);
router.delete('/delete_advantage/:id', academicOfferController_1.delete_advantage);
router.delete('/delete_work/:id', academicOfferController_1.delete_works);
router.delete('/delete_graduates/:id', academicOfferController_1.delete_graduates);
router.delete('/delete_testimonials/:id', academicOfferController_1.delete_testimonials);
module.exports = router;
//# sourceMappingURL=levels.js.map