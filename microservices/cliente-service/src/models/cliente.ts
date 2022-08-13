import mongoose, { Mongoose } from "mongoose";
import { ICliente } from "../interfaces/ICliente";
const {Schema, model} = mongoose;

const ClienteSchema : mongoose.Schema = new Schema<ICliente>({

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

})

const Cliente = mongoose.model<ICliente>('Cliente', ClienteSchema);

export {Cliente}