import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Cocinero } from 'src/cocinero/schema/cocinero.schema';
import { Receta } from 'src/receta/schema/receta.schema';

//TODO El SCHEMA de los PREPARACION (Collection)
export type PreparacionDocument = Preparacion & Document;

@Schema()
export class Preparacion {
  @Prop()
  fecha: string;

  @Prop()
  hora: string;
  
  @Prop()
  cantidad: number;

  @Prop()
  costo: number;

  @Prop()
  tiempoEst: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref:  'Cocinero'})
  idCocinero: Cocinero;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref:  'Receta'})
  idReceta: Receta

}

export const PreparacionSchema = SchemaFactory.createForClass(Preparacion);