"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RepositoryFactory = void 0;
const mongo_profile_repository_1 = require("./mongo-profile-repository");
const mysql_profile_repository_1 = require("./mysql-profile-repository");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const db_type = process.env.DB_TYPE; // memoria
class RepositoryFactory {
    static createProfileRepository() {
        if (db_type === 'mysql') {
            console.log("Conexion con mysql");
            return new mysql_profile_repository_1.MySQLProfileRepository();
        }
        else if (db_type === 'mongo') {
            console.log("Conexion con mongo");
            return new mongo_profile_repository_1.MongoProfileRepository();
        }
        throw new Error('Unsupported database type');
    }
}
exports.RepositoryFactory = RepositoryFactory;
