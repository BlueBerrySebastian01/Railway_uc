"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const config_1 = __importDefault(require("../src/database/config"));
const academic_level_1 = __importDefault(require("./academic_level"));
const directory_1 = __importDefault(require("./directory"));
const agreement_1 = __importDefault(require("./agreement"));
const workshop_1 = __importDefault(require("./workshop"));
const facilities_1 = __importDefault(require("./facilities"));
const index_1 = __importDefault(require("./index"));
class User extends sequelize_1.Model {
}
User.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        },
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize: config_1.default,
    timestamps: true,
    tableName: 'users',
});
User.hasMany(academic_level_1.default, { foreignKey: 'id_user' });
User.hasMany(directory_1.default, { foreignKey: 'id_user' });
User.hasMany(agreement_1.default, { foreignKey: 'id_user' });
User.hasMany(facilities_1.default, { foreignKey: 'id_user' });
User.hasMany(workshop_1.default, { foreignKey: 'id_user' });
User.hasMany(index_1.default, { foreignKey: 'id_user' });
exports.default = User;
//# sourceMappingURL=user.js.map