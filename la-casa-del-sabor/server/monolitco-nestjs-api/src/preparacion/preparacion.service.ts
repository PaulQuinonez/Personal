import { Injectable } from '@nestjs/common';
import { CreatePreparacionDto } from './dto/create-preparacion.dto';
import { UpdatePreparacionDto } from './dto/update-preparacion.dto';

@Injectable()
export class PreparacionService {
  create(createPreparacionDto: CreatePreparacionDto) {
    return 'This action adds a new preparacion';
  }

  findAll() {
    return `This action returns all preparacion`;
  }

  findOne(id: number) {
    return `This action returns a #${id} preparacion`;
  }

  update(id: number, updatePreparacionDto: UpdatePreparacionDto) {
    return `This action updates a #${id} preparacion`;
  }

  remove(id: number) {
    return `This action removes a #${id} preparacion`;
  }
}
