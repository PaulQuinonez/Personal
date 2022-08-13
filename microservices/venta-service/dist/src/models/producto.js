"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Producto = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema, model } = mongoose_1.default;
const ProductoSchema = new Schema({
    titulo: {
        type: String,
        require: [true, 'El nombre del producto es obligatorio'],
    },
    descripcion: {
        type: String,
        require: [true, 'La descripción del producto es obligatorio'],
    },
    imagen: {
        type: String,
        require: [true, 'La imagen del producto es obligatorio'],
    },
    precio_compra: {
        type: Number,
        require: [true, 'El precio de compra del producto es obligatorio'],
    },
    precio_venta: {
        type: Number,
        require: [true, 'El precio de venta del producto es obligatorio'],
    },
    stock: {
        type: Number,
        require: [true, 'El stock del producto es obligatorio'],
    },
    idcategoria: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'categoria' },
    puntos: {
        type: Number,
        require: [true, 'Los puntos del producto es obligatorio'],
    },
});
const Producto = mongoose_1.default.model('producto', ProductoSchema);
exports.Producto = Producto;
