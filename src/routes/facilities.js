"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const storage_1 = require("../helpers/storage");
const multer_1 = __importDefault(require("multer"));
const facilitiesController_1 = require("../controllers/facilitiesController");
const upload = (0, multer_1.default)({ storage: storage_1.storage });
const router = (0, express_1.Router)();
router.get('/all-facilities', facilitiesController_1.getFacilities);
router.get('/get-facility/:id', facilitiesController_1.getFacility);
router.post('/save-facility', upload.fields([
    { name: 'card_background', maxCount: 1 },
    { name: 'background', maxCount: 1 }
]), facilitiesController_1.saveFacility);
router.patch('/update-facility/:id', upload.fields([
    { name: 'card_background', maxCount: 1 },
    { name: 'background', maxCount: 1 }
]), facilitiesController_1.updateFacility);
router.delete('/remove-facility/:id', facilitiesController_1.removeFacility);
module.exports = router;
//# sourceMappingURL=facilities.js.map