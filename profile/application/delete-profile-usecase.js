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
class DeleteProfileUseCase {
    constructor(profileRepository) {
        this.profileRepository = profileRepository;
    }
    execute(profileId) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.profileRepository.delete(profileId);
            if (!result) {
                throw new Error(`No se pudo eliminar la perfil con id: ${profileId}`);
            }
            console.log(`Perfil con id: ${profileId} ha sido eliminado`);
            return result; // Devuelve un booleano
        });
    }
}
exports.default = DeleteProfileUseCase;
