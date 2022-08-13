import mongoose, { Mongoose } from "mongoose";
import { ITarea } from "../interfaces/ITarea";
const {Schema, model} = mongoose;

const TareaSchema : mongoose.Schema = new Schema<ITarea>({

    titulo: {
        type: String,
        require: [true, 'El titulo de la tarea es obligatorio'],
    },
    descripcion: {
        type: String,
        require: [true, 'La descripción de la tarea es obligatoria'],
    },
    iduser: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    idcliente: { type: mongoose.Schema.Types.ObjectId, ref: 'cliente' },

})

const Tarea = mongoose.model<ITarea>('Tarea', TareaSchema);

export {Tarea}