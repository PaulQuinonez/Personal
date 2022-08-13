"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Categoria = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema, model } = mongoose_1.default;
const CategoriaSchema = new Schema({
    titulo: {
        type: String,
        require: [true, 'El nombre de la categoria es obligatorio'],
    },
    descripcion: {
        type: String,
        require: [true, 'La descripción de la categoria es obligatorio'],
    }
});
const Categoria = mongoose_1.default.model('Categoria', CategoriaSchema);
exports.Categoria = Categoria;
