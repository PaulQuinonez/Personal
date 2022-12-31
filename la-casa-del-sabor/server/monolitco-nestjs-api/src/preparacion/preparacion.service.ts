import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePreparacionDto } from './dto/create-preparacion.dto';
import { UpdatePreparacionDto } from './dto/update-preparacion.dto';
import { Preparacion, PreparacionDocument } from './schemas/preparacion.schema';

@Injectable()
export class PreparacionService {

  constructor(
    @InjectModel(Preparacion.name) private preparacionModel: Model<PreparacionDocument>
  ){}

  async create(createPreparacionDto: CreatePreparacionDto) {
    const preparacionCreate = await this.preparacionModel.create(createPreparacionDto)
    return preparacionCreate;
  }

  async findAll() {
    const findPreparaciones = await this.preparacionModel.find({})
    return findPreparaciones;
  }

  async findByPreparacion(id: string) {
    const findPreparacion = await this.preparacionModel.findById(id)
    return findPreparacion;
  }

  async update(id: string, updatePreparacionDto: UpdatePreparacionDto) {
    const updatePreparacion = await this.preparacionModel.findByIdAndUpdate(id, updatePreparacionDto)
    return updatePreparacion;
  }

  async remove(id: string) {
    const deletePreparacion = await this.preparacionModel.findByIdAndDelete(id)
    return deletePreparacion;
  }
}
