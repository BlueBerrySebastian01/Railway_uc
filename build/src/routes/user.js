"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
const authValidate_1 = require("../middleware/Auth/authValidate");
const router = (0, express_1.Router)();
router.get('/all-users', [
    authValidate_1.isAuthenticated,
], userController_1.getUsers);
router.get('/all-users-portal', userController_1.getUsersPortal);
router.post('/save-user', userController_1.saveUser);
router.patch('/update-user/:id', userController_1.updateUser);
router.delete('/remove-user/:id', userController_1.removeUser);
module.exports = router;
//# sourceMappingURL=user.js.map