"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tarea = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema, model } = mongoose_1.default;
const TareaSchema = new Schema({
    titulo: {
        type: String,
        require: [true, 'El titulo de la tarea es obligatorio'],
    },
    descripcion: {
        type: String,
        require: [true, 'La descripción de la tarea es obligatoria'],
    },
    iduser: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'user' },
    idcliente: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'cliente' },
});
const Tarea = mongoose_1.default.model('Tarea', TareaSchema);
exports.Tarea = Tarea;
