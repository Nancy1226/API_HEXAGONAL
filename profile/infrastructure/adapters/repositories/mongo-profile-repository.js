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
exports.MongoProfileRepository = void 0;
const profile_1 = require("../../../domain/profile");
const profile_schema_1 = require("../../profile-schema");
class MongoProfileRepository {
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const profiles = yield profile_schema_1.ProfileModel.find();
            return profiles.map(pub => new profile_1.Profile(pub.id, pub.name, pub.lastname, pub.image, pub.image_s3));
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const profile = yield profile_schema_1.ProfileModel.findById(id);
            return profile ? new profile_1.Profile(profile.id, profile.name, profile.lastname, profile.image, profile.image_s3) : null;
        });
    }
    create(profile) {
        return __awaiter(this, void 0, void 0, function* () {
            const newProfile = new profile_schema_1.ProfileModel(profile);
            const savedProfile = yield newProfile.save();
            return new profile_1.Profile(savedProfile.id, savedProfile.name, savedProfile.lastname, savedProfile.image, savedProfile.image_s3);
        });
    }
    update(id, profile) {
        return __awaiter(this, void 0, void 0, function* () {
            const updatedProfile = yield profile_schema_1.ProfileModel.findByIdAndUpdate(id, profile, { new: true });
            return updatedProfile ? new profile_1.Profile(updatedProfile.id, updatedProfile.name, updatedProfile.lastname, updatedProfile.image, updatedProfile.image_s3) : null;
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield profile_schema_1.ProfileModel.findByIdAndDelete(id);
            return result !== null;
        });
    }
}
exports.MongoProfileRepository = MongoProfileRepository;
