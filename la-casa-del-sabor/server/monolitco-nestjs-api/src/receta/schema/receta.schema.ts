import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

//TODO El SCHEMA de los RECETAS (Collection)
export type RecetaDocument = Receta & Document;

@Schema()
export class Receta {
  @Prop()
  nombre: string;

  @Prop()
  nIngredientes: string;
}

export const RecetaSchema = SchemaFactory.createForClass(Receta);