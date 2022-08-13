"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema, model } = mongoose_1.default;
const UserSchema = new Schema({
    nombres: {
        type: String,
        require: [true, 'El nombre del usuario es obligatorio'],
    },
    apellidos: {
        type: String,
        require: [true, 'El apellido del usuario es obligatorio'],
    },
    cedula: {
        type: String,
        require: [true, 'La cédula del usuario es obligatorio'],
    },
    email: {
        type: String,
        require: [true, 'El correo del usuario es obligatorio'],
    },
    password: {
        type: String,
    },
    role: {
        type: String,
        require: [true, 'El rol del usuario es obligatorio'],
    }
});
const User = mongoose_1.default.model('User', UserSchema);
exports.User = User;
