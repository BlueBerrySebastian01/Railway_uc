"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const storage_1 = require("../helpers/storage");
const multer_1 = __importDefault(require("multer"));
const workshoController_1 = require("../controllers/workshoController");
const upload = (0, multer_1.default)({ storage: storage_1.storage });
const router = (0, express_1.Router)();
router.get('/all-workshops', workshoController_1.getWorkshops);
router.get('/get-workshop/:id', workshoController_1.getWorkshop);
router.get('/workshopsbytitle/:title', workshoController_1.getWorkshopbyTitle);
router.post('/save-workshop', upload.fields([
    { name: 'card_background', maxCount: 1 },
    { name: 'background', maxCount: 1 }
]), workshoController_1.saveWorkshop);
router.patch('/update-workshop/:id', upload.fields([
    { name: 'card_background', maxCount: 1 },
    { name: 'background', maxCount: 1 }
]), workshoController_1.updateWorkshop);
router.delete('/remove-workshop/:id', workshoController_1.removeWorkshop);
module.exports = router;
//# sourceMappingURL=workshops.js.map