"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = exports.storage = void 0;
const fs_1 = __importDefault(require("fs"));
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const destinationPath = path_1.default.join(__dirname, '../../public/storage');
// Asegúrate de que el directorio de destino exista
const createDestinationDir = () => {
    if (!fs_1.default.existsSync(destinationPath)) {
        fs_1.default.mkdirSync(destinationPath, { recursive: true });
    }
};
exports.storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        createDestinationDir();
        cb(null, destinationPath);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path_1.default.extname(file.originalname));
    },
});
const upload = (0, multer_1.default)({
    storage: exports.storage, // Proporciona la configuración de almacenamiento aquí
    limits: {
        fileSize: 50 * 1024 * 1024, // 50MB límite de tamaño del archivo
    },
    fileFilter: (req, file, cb) => {
        const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif', 'video/mp4', 'video/quicktime', 'application/pdf'];
        if (allowedMimeTypes.includes(file.mimetype)) {
            cb(null, true);
        }
        else {
            cb(new Error('Invalid file type. Only JPEG, PNG, GIF images, MP4, MOV videos, and PDF files are allowed.'));
        }
    },
});
exports.upload = upload;
//# sourceMappingURL=storage.js.map