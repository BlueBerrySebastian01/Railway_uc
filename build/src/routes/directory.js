"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const directoryController_1 = require("../controllers/directoryController");
const router = (0, express_1.Router)();
router.get('/all-contacts', directoryController_1.getContacts);
router.get('/all-contacts-active', directoryController_1.getContactsActive);
router.post('/save-contact', directoryController_1.saveContact);
router.patch('/update-contact/:id', directoryController_1.updateContact);
router.delete('/remove-contact/:id', directoryController_1.removeContact);
module.exports = router;
//# sourceMappingURL=directory.js.map