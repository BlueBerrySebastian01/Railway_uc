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
const index_galery_1 = __importDefault(require("./index_galery"));
class Index extends sequelize_1.Model {
}
Index.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    id_user: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    title_regular: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    title_bold: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    video_loop: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    about_us: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false
    },
    scholarships: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false
    },
}, {
    sequelize: config_1.default,
    modelName: 'indices',
});
(() => __awaiter(void 0, void 0, void 0, function* () {
    yield config_1.default.sync();
    Index.belongsTo(user_1.default, { foreignKey: 'id_user' });
    Index.hasMany(index_galery_1.default, { foreignKey: 'id_index' });
}))();
exports.default = Index;
//# sourceMappingURL=index.js.map