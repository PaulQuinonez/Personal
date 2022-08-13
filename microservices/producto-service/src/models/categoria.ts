import mongoose, { Mongoose } from "mongoose";
const {Schema, model} = mongoose;
import { ICategoria } from "../interfaces/ICategoria";

const CategoriaSchema : mongoose.Schema = new Schema<ICategoria>({

    titulo: {
        type: String,
        require: [true, 'El nombre de la categoria es obligatorio'],
    },
    descripcion: {
        type: String,
        require: [true, 'La descripción de la categoria es obligatorio'],
    }
    
})

const Categoria = mongoose.model<ICategoria>('Categoria', CategoriaSchema);

export {Categoria}