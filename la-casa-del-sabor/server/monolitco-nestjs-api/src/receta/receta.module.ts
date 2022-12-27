import { Module } from '@nestjs/common';
import { RecetaService } from './receta.service';
import { RecetaController } from './receta.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Receta, RecetaSchema } from './schema/receta.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Receta.name,
        schema: RecetaSchema
      }
    ])
  ],
  controllers: [RecetaController],
  providers: [RecetaService]
})
export class RecetaModule {}
