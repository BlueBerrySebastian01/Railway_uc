"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthenticated = void 0;
const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        // validateToke(req, res, next);
        return next();
    }
    // res.redirect('/login');
    res.render('login');
};
exports.isAuthenticated = isAuthenticated;
//# sourceMappingURL=authValidate.js.map