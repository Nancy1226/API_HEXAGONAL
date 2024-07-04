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
exports.MySQLProfileRepository = void 0;
const mysql_1 = require("../../databases/mysql");
const profile_1 = require("../../../domain/profile");
class MySQLProfileRepository {
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = 'SELECT * FROM profile';
            const rows = yield (0, mysql_1.query)(sql, []); // Ajuste de tipo aquí
            return rows.map((row) => new profile_1.Profile(row.id, row.name, row.lastname, row.image, row.image_s3));
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = 'SELECT * FROM profile WHERE id = ?';
            const params = [id];
            const rows = yield (0, mysql_1.query)(sql, params);
            console.log('Query result:', rows); // Log para depurar
            if (!rows || rows.length === 0) {
                return null;
            }
            const row = rows[0];
            return new profile_1.Profile(row.id, row.name, row.lastname, // Corrección de error tipográfico
            row.image, row.image_s3);
        });
    }
    create(profile) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = 'INSERT INTO profile (name, lastname, image, image_s3) VALUES (?, ?, ?, ?)';
            const params = [profile.name, profile.lastname, profile.image, profile.image_s3];
            const result = yield (0, mysql_1.query)(sql, params);
            return new profile_1.Profile(result.insertId, profile.name, profile.lastname, profile.image, profile.image_s3);
        });
    }
    update(id, profile) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = `UPDATE profile SET 
                 name = COALESCE(?, name), 
                 lastname = COALESCE(?, lastname), 
                 image = COALESCE(?, image), 
                 image_s3 = COALESCE(?, image_s3) 
                 WHERE id = ?`;
            const params = [
                profile.name,
                profile.lastname,
                profile.image,
                profile.image_s3,
                id
            ];
            const result = yield (0, mysql_1.query)(sql, params);
            if (result.affectedRows === 0) {
                return null;
            }
            return yield this.getById(id); // Obtener la publicación actualizada para devolverla
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = "DELETE FROM profile WHERE id = ?";
            const params = [id];
            const result = yield (0, mysql_1.query)(sql, params);
            return result.affectedRows > 0;
        });
    }
}
exports.MySQLProfileRepository = MySQLProfileRepository;
