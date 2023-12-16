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
const sections_1 = __importDefault(require("./sections"));
class List extends sequelize_1.Model {
}
List.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
    },
    id_section: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    text: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    position: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize: config_1.default,
    modelName: 'list',
});
(() => __awaiter(void 0, void 0, void 0, function* () {
    yield config_1.default.sync();
    List.belongsTo(sections_1.default, { foreignKey: 'id_section' });
}))();
exports.default = List;
//# sourceMappingURL=list.js.map