"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const agreementsControllo_1 = require("../controllers/agreementsControllo");
const storage_1 = require("../helpers/storage");
const multer_1 = __importDefault(require("multer"));
const upload = (0, multer_1.default)({ storage: storage_1.storage });
const router = (0, express_1.Router)();
router.get('/all-agreements', agreementsControllo_1.getAgreements);
router.post('/save-agreement', upload.fields([
    { name: 'image', maxCount: 1 },
]), agreementsControllo_1.saveAgreement);
router.patch('/update-agreement/:id', upload.fields([
    { name: 'image', maxCount: 1 },
]), agreementsControllo_1.updateAgreement);
router.delete('/remove-agreement/:id', agreementsControllo_1.removeAgreement);
module.exports = router;
//# sourceMappingURL=agreements.js.map