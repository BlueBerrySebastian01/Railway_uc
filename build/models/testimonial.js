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
const academic_offer_1 = __importDefault(require("./academic_offer"));
class Testimonial extends sequelize_1.Model {
}
Testimonial.init({
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: sequelize_1.DataTypes.INTEGER,
    },
    name: {
        allowNull: false,
        type: sequelize_1.DataTypes.STRING,
    },
    collage_career: {
        allowNull: false,
        type: sequelize_1.DataTypes.STRING,
    },
    image: {
        allowNull: false,
        type: sequelize_1.DataTypes.STRING,
    },
    content: {
        allowNull: true,
        type: sequelize_1.DataTypes.TEXT,
    },
    id_offer: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "academic_offers",
            key: "id",
        },
        onDelete: 'CASCADE',
    },
    createdAt: {
        allowNull: false,
        type: sequelize_1.DataTypes.DATE,
    },
    updatedAt: {
        allowNull: false,
        type: sequelize_1.DataTypes.DATE,
    },
}, {
    sequelize: config_1.default,
    modelName: 'testimonials',
});
(() => __awaiter(void 0, void 0, void 0, function* () {
    yield config_1.default.sync();
    Testimonial.belongsTo(academic_offer_1.default, { foreignKey: 'id_offer' });
}))();
exports.default = Testimonial;
//# sourceMappingURL=testimonial.js.map