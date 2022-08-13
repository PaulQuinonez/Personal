import mongoose, { Mongoose } from "mongoose";
const {Schema, model} = mongoose;
import { IProducto } from "../interfaces/IProducto";

const ProductoSchema : mongoose.Schema = new Schema<IProducto>({

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
    idcategoria: { type: mongoose.Schema.Types.ObjectId, ref: 'categoria' },
    puntos: {
        type: Number,
        require: [true, 'Los puntos del producto es obligatorio'],
    },

})

const Producto = mongoose.model<IProducto>('Producto', ProductoSchema);

export {Producto}