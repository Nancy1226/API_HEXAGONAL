"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Profile = void 0;
class Profile {
    constructor(id, name, lastname, image, image_s3) {
        this.id = id;
        this.name = name;
        this.lastname = lastname;
        this.image = image;
        this.image_s3 = image_s3;
    }
}
exports.Profile = Profile;
