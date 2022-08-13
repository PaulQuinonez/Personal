"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createToken = void 0;
const jwt_simple_1 = __importDefault(require("jwt-simple"));
const moment_1 = __importDefault(require("moment"));
//Llave del token
const secret = 'polito';
//Generación de tokens por usuario
const createToken = function (user) {
    const payload = {
        sub: user._id,
        nombres: user.nombres,
        apellidos: user.apellidos,
        cedula: user.cedula,
        email: user.email,
        role: user.role,
        iat: (0, moment_1.default)().unix(),
        exp: (0, moment_1.default)().add(30, 'days').unix()
    };
    return jwt_simple_1.default.encode(payload, secret);
};
exports.createToken = createToken;
