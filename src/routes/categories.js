"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const categoriesController_1 = require("../controllers/categoriesController");
const router = (0, express_1.Router)();
router.get('/all-categories', categoriesController_1.getAllCategories);
router.post('/save-category', categoriesController_1.saveCategory);
router.patch('/update-category/:id', categoriesController_1.updateCategory);
router.delete('/remove-category/:id', categoriesController_1.removeCategory);
module.exports = router;
//# sourceMappingURL=categories.js.map