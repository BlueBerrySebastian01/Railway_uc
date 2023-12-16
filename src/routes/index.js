"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const storage_1 = require("../helpers/storage");
const indexGaleryController_1 = require("../controllers/indexGaleryController");
const upload = (0, multer_1.default)({ storage: storage_1.storage });
const router = (0, express_1.Router)();
router.get('/index-galery', indexGaleryController_1.getIndex);
router.get('/index-galery/get/:id', indexGaleryController_1.getIndexGalery);
router.put('/index-galery/update/:id', upload.fields([
    { name: 'video_loop', maxCount: 1 },
]), indexGaleryController_1.addIndex);
router.post('/index-galery/add/:id', upload.fields([
    { name: 'image', maxCount: 1 },
]), indexGaleryController_1.addIndex);
router.post('/index-galery/section/add/:id', upload.fields([
    { name: 'image', maxCount: 1 },
]), indexGaleryController_1.addIndexGalery);
router.delete('/delete_galery/:id', indexGaleryController_1.deleteIndexGalery);
module.exports = router;
//# sourceMappingURL=index.js.map