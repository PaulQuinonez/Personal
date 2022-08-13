"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Venta = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema, model } = mongoose_1.default;
const VentaSchema = new Schema({
    idcliente: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'cliente' },
    iduser: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'user' },
    fecha: { type: Date, default: Date.now }
});
const Venta = mongoose_1.default.model('venta', VentaSchema);
exports.Venta = Venta;
