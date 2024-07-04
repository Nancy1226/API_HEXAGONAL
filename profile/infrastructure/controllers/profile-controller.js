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
Object.defineProperty(exports, "__esModule", { value: true });
const local_file_storage_1 = require("../adapters/storages/local-file-storage");
const s3_file_storage_1 = require("../adapters/storages/s3-file-storage");
const localFileStorage = new local_file_storage_1.LocalFileStorage();
const s3FileStorage = new s3_file_storage_1.S3FileStorage();
class ProfileController {
    constructor(getProfileListUseCase, createProfileUseCase, getProfileByID, updateProfileUseCase, deleteProfileUseCase) {
        this.getProfileListUseCase = getProfileListUseCase;
        this.createProfileUseCase = createProfileUseCase;
        this.getProfileByID = getProfileByID;
        this.updateProfileUseCase = updateProfileUseCase;
        this.deleteProfileUseCase = deleteProfileUseCase;
    }
    create(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const profilePayload = req.body;
                const file = req.file;
                if (!file) {
                    return res.status(400).send('No file uploaded');
                }
                // Guardar archivo localmente
                const localFilePath = yield localFileStorage.uploadFile(file);
                // Subir imagen a S3
                const s3FilePath = yield s3FileStorage.uploadFile(file);
                const profileData = Object.assign(Object.assign({}, profilePayload), { image: localFilePath, image_s3: s3FilePath });
                const profile = yield this.createProfileUseCase.execute(profileData);
                res.status(201).json(profile);
            }
            catch (error) {
                next(error);
            }
            finally {
                if (req.file) {
                    console.log("Perfil creado con exitosamente");
                }
            }
        });
    }
    getAll(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const profiles = yield this.getProfileListUseCase.execute();
                res.json(profiles);
            }
            catch (error) {
                next(error);
            }
        });
    }
    getById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const profile = yield this.getProfileByID.run(req.params.id);
                res.json(profile);
            }
            catch (error) {
                next(error);
            }
        });
    }
    update(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const profileId = req.params.id;
                const profilePayload = req.body;
                const file = req.file;
                // Obtener la publicación existente
                const existingProfile = yield this.getProfileByID.run(profileId);
                if (!existingProfile) {
                    return res.status(404).send('Profile not found');
                }
                // Eliminar imagen antigua si existe una nueva
                if (file) {
                    yield localFileStorage.deleteFile(existingProfile.image);
                    yield s3FileStorage.deleteFile(existingProfile.image_s3);
                    // Guardar archivo localmente
                    const localFilePath = yield localFileStorage.uploadFile(file);
                    // Subir imagen a S3
                    const s3FilePath = yield s3FileStorage.uploadFile(file);
                    profilePayload.image = localFilePath;
                    profilePayload.image_s3 = s3FilePath;
                }
                const updatedProfile = yield this.updateProfileUseCase.execute(profileId, profilePayload);
                res.json(updatedProfile);
            }
            catch (error) {
                next(error);
            }
            finally {
                if (req.file) {
                    console.log("Perfil creado con exitosamente");
                }
            }
        });
    }
    delete(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const profileId = req.params.id;
                // Obtener la publicación existente
                const existingProfile = yield this.getProfileByID.run(profileId);
                if (!existingProfile) {
                    return res.status(404).send('Profile not found');
                }
                // Eliminar imagen de S3
                yield s3FileStorage.deleteFile(existingProfile.image_s3);
                // Eliminar imagen del almacenamiento local
                yield localFileStorage.deleteFile(existingProfile.image);
                const result = yield this.deleteProfileUseCase.execute(profileId);
                res.status(result ? 200 : 404).json({ success: result });
            }
            catch (error) {
                next(error);
            }
            finally {
                if (req.file) {
                    console.log("Perfil creado con exito");
                }
            }
        });
    }
}
exports.default = ProfileController;
