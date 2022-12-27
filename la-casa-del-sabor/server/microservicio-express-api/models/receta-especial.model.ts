import mongoose, { Mongoose } from "mongoose";
import { IRecetaEsp } from "../interfaces/receta-especial.interface";
const { Schema, model } = mongoose;

const RecetaSchema : mongoose.Schema = new Schema<IRecetaEsp>({
	nombre: {
		type: String,
		required: [true, 'El nombre del idioma es obligatorio']
	},

    nIngredientes: {
		type: String,
		required: [true, 'El nombre del idioma es obligatorio']
	},
});

export const Receta = mongoose.model<IRecetaEsp>('Receta', RecetaSchema);
