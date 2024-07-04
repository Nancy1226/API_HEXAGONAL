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
exports.GetProfileByID = void 0;
class GetProfileByID {
    constructor(profileRepository) {
        this.profileRepository = profileRepository;
    }
    run(profileId) {
        return __awaiter(this, void 0, void 0, function* () {
            const profile = yield this.profileRepository.getById(profileId);
            if (!profile) {
                throw new Error(`Id: ${profileId} del perfil no encontrado`); //Lanza el error
            }
            console.log(profile);
            return profile;
        });
    }
}
exports.GetProfileByID = GetProfileByID;
