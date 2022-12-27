import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateRecetaDto } from './dto/create-receta.dto';
import { UpdateRecetaDto } from './dto/update-receta.dto';
import { Receta, RecetaDocument } from './schema/receta.schema';

@Injectable()
export class RecetaService {

  constructor(
    @InjectModel(Receta.name) private recetaModel: Model<RecetaDocument>
  ){}

  async createReceta(createRecetaDto: CreateRecetaDto) {
    const recetaCreated = await this.recetaModel.create(createRecetaDto)
    return recetaCreated;
  }

  async findAllRecetas() {
    const findRecetas = await this.recetaModel.find({})
    return findRecetas;
  }

  async findByIdReceta(id: string) {
    const findReceta = await this.recetaModel.findById(id)
    return findReceta;
  }

  async updateReceta(id: string, updateRecetaDto: UpdateRecetaDto) {
    const updateReceta = await this.recetaModel.findByIdAndUpdate(id, updateRecetaDto)
    return updateReceta;
  }

  async removeReceta(id: string) {
    const deleteReceta = await this.recetaModel.findByIdAndDelete(id)
    return deleteReceta;
  }
}
