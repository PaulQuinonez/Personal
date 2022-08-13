import mongoose from "mongoose";
import { IDetalleVenta } from "../interface/IDetalleVenta";
const {Schema, model} = mongoose;

const DetalleVentaSchema : mongoose.Schema = new Schema<IDetalleVenta>({

    idproducto: { type: mongoose.Schema.Types.ObjectId, ref: 'producto' },
    cantidad: {
        type: Number,
        require: [true, 'La cantidad es obligatoria'],
    },
    venta:{ type: mongoose.Schema.Types.ObjectId, ref: 'venta' }
})

const DetalleVenta = mongoose.model<IDetalleVenta>('detalleventa', DetalleVentaSchema);

export {DetalleVenta}