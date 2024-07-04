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
const profile_1 = require("../domain/profile");
class CreateProfileUseCase {
    constructor(profileRepository) {
        this.profileRepository = profileRepository;
    }
    execute(userPayload) {
        return __awaiter(this, void 0, void 0, function* () {
            const profile = new profile_1.Profile(null, // En MongoDB, el ID se genera automáticamente
            userPayload.name, userPayload.lastname, userPayload.image, userPayload.image_s3);
            return this.profileRepository.create(profile);
        });
    }
}
exports.default = CreateProfileUseCase;
