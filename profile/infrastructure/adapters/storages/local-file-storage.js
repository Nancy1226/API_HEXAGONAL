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
exports.LocalFileStorage = exports.upload = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path_1.default.join(__dirname, 'uploads'));
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
exports.upload = (0, multer_1.default)({ storage: storage });
class LocalFileStorage {
    uploadFile(file) {
        return __awaiter(this, void 0, void 0, function* () {
            return file.path;
        });
    }
    deleteFile(filePath) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const fullPath = path_1.default.resolve(filePath);
                console.log('Attempting to delete file at path:', fullPath);
                if (fs_1.default.existsSync(fullPath)) {
                    fs_1.default.unlinkSync(fullPath);
                    console.log(`File deleted: ${fullPath}`);
                }
                else {
                    console.error(`File not found: ${fullPath}`);
                }
            }
            catch (error) {
                if (error instanceof Error) {
                    console.error(`Error deleting file: ${error.message}`);
                }
                else {
                    console.error('Unknown error occurred while deleting file');
                }
                throw error;
            }
        });
    }
}
exports.LocalFileStorage = LocalFileStorage;
