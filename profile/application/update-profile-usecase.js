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
class UpdateProfileUseCase {
    constructor(profileRepository) {
        this.profileRepository = profileRepository;
    }
    execute(profileId, profilePayload) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.profileRepository.update(profileId, profilePayload);
            if (!result) {
                throw new Error(`Id: ${profileId} del perfil no encontrado`);
            }
            return result;
        });
    }
}
exports.default = UpdateProfileUseCase;
