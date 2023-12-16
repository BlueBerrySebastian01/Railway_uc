"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const storage_1 = require("../helpers/storage");
const multer_1 = __importDefault(require("multer"));
const sectinosController_1 = require("../controllers/sectinosController");
const upload = (0, multer_1.default)({ storage: storage_1.storage });
const router = (0, express_1.Router)();
router.get('/all-sections', sectinosController_1.getSections);
router.get('/get-section/:id', sectinosController_1.getSection);
router.post('/save-section', upload.fields([
    { name: 'image', maxCount: 1 },
]), sectinosController_1.saveSections);
router.patch('/update-section/:id', upload.fields([
    { name: 'image', maxCount: 1 },
]), sectinosController_1.updateSections);
router.delete('/remove-section/:id', sectinosController_1.removeSections);
module.exports = router;
//# sourceMappingURL=sections.js.map