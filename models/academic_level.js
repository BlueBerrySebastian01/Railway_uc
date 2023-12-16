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
const sequelize_1 = require("sequelize");
const config_1 = __importDefault(require("../src/database/config"));
const user_1 = __importDefault(require("./user"));
const categories_1 = __importDefault(require("./categories"));
class AcademicLevel extends sequelize_1.Model {
}
AcademicLevel.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    level: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: false
    },
    id_user: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    country: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: true
    },
}, {
    sequelize: config_1.default,
    tableName: 'academic_levels',
});
(() => __awaiter(void 0, void 0, void 0, function* () {
    yield config_1.default.sync();
    AcademicLevel.hasMany(categories_1.default, { foreignKey: 'id_level' });
    AcademicLevel.belongsTo(user_1.default, { foreignKey: 'id_user' });
}))();
exports.default = AcademicLevel;
//# sourceMappingURL=academic_level.js.map