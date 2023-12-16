"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// category.js
const sequelize_1 = require("sequelize");
const config_1 = __importDefault(require("../src/database/config"));
const academic_offer_1 = __importDefault(require("./academic_offer"));
const academic_level_1 = __importDefault(require("./academic_level"));
class Category extends sequelize_1.Model {
}
Category.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    title: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: true,
    },
    id_level: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    route: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: true,
    },
}, {
    sequelize: config_1.default,
    tableName: 'categories',
});
(() => __awaiter(void 0, void 0, void 0, function* () {
    yield config_1.default.sync();
    Category.hasMany(academic_offer_1.default, { foreignKey: 'id_category' });
    Category.belongsTo(academic_level_1.default, { foreignKey: 'id_level' });
}))();
exports.default = Category;
//# sourceMappingURL=categories.js.map