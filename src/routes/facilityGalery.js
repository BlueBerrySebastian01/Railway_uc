"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const storage_1 = require("../helpers/storage");
const multer_1 = __importDefault(require("multer"));
const facilityGaleryController_1 = require("../controllers/facilityGaleryController");
const upload = (0, multer_1.default)({ storage: storage_1.storage });
const router = (0, express_1.Router)();
router.get('/get-galery/:id', facilityGaleryController_1.getGalery);
router.get('/get-image/:id', facilityGaleryController_1.getImage);
router.post('/save-image', upload.fields([
    { name: 'image', maxCount: 1 },
]), facilityGaleryController_1.saveImage);
router.patch('/update-image/:id', upload.fields([
    { name: 'image', maxCount: 1 },
]), facilityGaleryController_1.updateImage);
router.delete('/remove-image/:id', facilityGaleryController_1.removeImage);
module.exports = router;
//# sourceMappingURL=facilityGalery.js.map