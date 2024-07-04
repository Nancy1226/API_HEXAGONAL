"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.profileRouter = void 0;
// infrastructure/publication-router.ts
const express_1 = __importDefault(require("express"));
const dependencies_profile_1 = require("../dependencies-profile");
const local_file_storage_1 = require("../adapters/storages/local-file-storage");
const profileRouter = express_1.default.Router();
exports.profileRouter = profileRouter;
profileRouter.get("/getAll", dependencies_profile_1.profileController.getAll.bind(dependencies_profile_1.profileController));
profileRouter.post("/create", local_file_storage_1.upload.single('image'), dependencies_profile_1.profileController.create.bind(dependencies_profile_1.profileController));
profileRouter.get("/:id", dependencies_profile_1.profileController.getById.bind(dependencies_profile_1.profileController));
profileRouter.put('/:id', local_file_storage_1.upload.single('image'), dependencies_profile_1.profileController.update.bind(dependencies_profile_1.profileController));
profileRouter.delete('/:id', dependencies_profile_1.profileController.delete.bind(dependencies_profile_1.profileController));
