import { Module } from '@nestjs/common';
import { PreparacionService } from './preparacion.service';
import { PreparacionController } from './preparacion.controller';

@Module({
  controllers: [PreparacionController],
  providers: [PreparacionService]
})
export class PreparacionModule {}
