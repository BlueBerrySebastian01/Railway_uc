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
exports.saveStorage = void 0;
const archiver_1 = __importDefault(require("archiver"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const saveStorage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const folderPath = path_1.default.join(__dirname, '../../public/storage/'); // Ruta de la carpeta a descargar
        const zipFilePath = path_1.default.join(__dirname, 'storage.zip');
        console.log('Ruta de la carpeta:', folderPath);
        const output = fs_1.default.createWriteStream(zipFilePath);
        const archive = (0, archiver_1.default)('zip', { zlib: { level: 9 } });
        output.on('close', () => {
            // Enviar el archivo zip como respuesta
            res.download(zipFilePath, 'storage.zip', (err) => {
                // Eliminar el archivo zip después de la descarga
                if (!err) {
                    fs_1.default.unlinkSync(zipFilePath);
                }
                else {
                    console.error('Error al eliminar el archivo zip:', err);
                }
            });
        });
        archive.on('error', (err) => {
            console.error('Error al comprimir la carpeta:', err);
            res.status(500).send('Error interno del servidor');
        });
        // El segundo argumento ('') indica que no se debe incluir la carpeta base en el archivo zip
        archive.directory(folderPath, '');
        archive.pipe(output);
        archive.finalize();
    }
    catch (error) {
        console.error('Error:', error);
        res.status(500).send('Error interno del servidor');
    }
});
exports.saveStorage = saveStorage;
//# sourceMappingURL=downloadStorage.js.map