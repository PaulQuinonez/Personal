import mongoose, { Mongoose } from "mongoose";
import { IVenta } from "../interface/IVenta";
const {Schema, model} = mongoose;

const VentaSchema : mongoose.Schema = new Schema<IVenta>({

    idcliente: { type: mongoose.Schema.Types.ObjectId, ref: 'cliente' },
    iduser: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    fecha: { type: Date, default: Date.now }
})

const Venta = mongoose.model<IVenta>('venta', VentaSchema);

export {Venta}