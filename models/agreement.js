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
class Agreement extends sequelize_1.Model {
    static associate(models) {
        Agreement.belongsTo(user_1.default, { foreignKey: 'id_user' });
    }
}
Agreement.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    id_user: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    image: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
}, {
    sequelize: config_1.default,
    tableName: 'agreements',
});
(() => __awaiter(void 0, void 0, void 0, function* () {
    yield config_1.default.sync();
    Agreement.belongsTo(user_1.default, { foreignKey: 'id_user' });
}))();
exports.default = Agreement;
//# sourceMappingURL=agreement.js.map