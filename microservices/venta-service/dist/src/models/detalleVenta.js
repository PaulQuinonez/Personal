"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DetalleVenta = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema, model } = mongoose_1.default;
const DetalleVentaSchema = new Schema({
    idproducto: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'producto' },
    cantidad: {
        type: Number,
        require: [true, 'La cantidad es obligatoria'],
    },
    venta: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'venta' }
});
const DetalleVenta = mongoose_1.default.model('detalleventa', DetalleVentaSchema);
exports.DetalleVenta = DetalleVenta;
