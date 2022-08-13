"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cliente = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema, model } = mongoose_1.default;
const ClienteSchema = new Schema({
    nombres: {
        type: String,
        require: [true, 'El nombre del cliente es obligatorio'],
    },
    cedula: {
        type: String,
        require: [true, 'La cédula del cliente es obligatorio'],
    },
    correo: {
        type: String,
        require: [true, 'El correo del cliente es obligatorio'],
    },
    puntos: {
        type: Number,
        require: [true, 'El nombre del cliente es obligatorio'],
    },
});
const Cliente = mongoose_1.default.model('Cliente', ClienteSchema);
exports.Cliente = Cliente;
