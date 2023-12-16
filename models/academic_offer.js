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
const categories_1 = __importDefault(require("./categories"));
const general_1 = __importDefault(require("./general"));
const seo_1 = __importDefault(require("./seo"));
const content_1 = __importDefault(require("./content"));
const advantage_1 = __importDefault(require("./advantage"));
const curriculum_1 = __importDefault(require("./curriculum"));
const works_1 = __importDefault(require("./works"));
const our_graduates_1 = __importDefault(require("./our_graduates"));
const know_where_1 = __importDefault(require("./know_where"));
const testimonial_1 = __importDefault(require("./testimonial"));
class Academic_offert extends sequelize_1.Model {
}
Academic_offert.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    title: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: false,
    },
    status: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
    },
    id_category: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    crm: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: false,
    },
}, {
    sequelize: config_1.default,
    tableName: 'academic_offers',
});
(() => __awaiter(void 0, void 0, void 0, function* () {
    yield config_1.default.sync();
    Academic_offert.belongsTo(categories_1.default, { foreignKey: 'id_category' });
    Academic_offert.hasMany(general_1.default, { foreignKey: 'id_offer' });
    Academic_offert.hasMany(content_1.default, { foreignKey: 'id_offer' });
    Academic_offert.hasMany(seo_1.default, { foreignKey: 'id_offer' });
    Academic_offert.hasMany(know_where_1.default, { foreignKey: 'id_offer' });
    Academic_offert.hasMany(advantage_1.default, { foreignKey: 'id_offer' });
    Academic_offert.hasMany(curriculum_1.default, { foreignKey: 'id_offer' });
    Academic_offert.hasMany(works_1.default, { foreignKey: 'id_offer' });
    Academic_offert.hasMany(our_graduates_1.default, { foreignKey: 'id_offer' });
    Academic_offert.hasMany(testimonial_1.default, { foreignKey: 'id_offer' });
}))();
exports.default = Academic_offert;
//# sourceMappingURL=academic_offer.js.map