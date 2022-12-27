import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RecetaService } from './receta.service';
import { CreateRecetaDto } from './dto/create-receta.dto';
import { UpdateRecetaDto } from './dto/update-receta.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

//TODO http://localhost:3000/receta

@ApiBearerAuth()
@ApiTags('receta')
@Controller('receta')
export class RecetaController {
  constructor(private readonly recetaService: RecetaService) {}

  @Post()
  create(@Body() createRecetaDto: CreateRecetaDto) {
    return this.recetaService.createReceta(createRecetaDto);
  }

  @Get()
  findAll() {
    return this.recetaService.findAllRecetas();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.recetaService.findByIdReceta(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRecetaDto: UpdateRecetaDto) {
    return this.recetaService.updateReceta(id, updateRecetaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.recetaService.removeReceta(id);
  }
}
