import mongoose, { Mongoose } from "mongoose";
import { IActivo } from '../interfaces/activo.interface';

const {Schema, model} = mongoose;

const ActivoSchema : mongoose.Schema = new Schema<IActivo>({

    activoT: {
        type: String,
        required: [true, 'Se requiere el nombre del activo tecnológico']
    }

});

export const Activo = mongoose.model<IActivo>('Activo', ActivoSchema);