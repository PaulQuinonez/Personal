import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CocineroModule } from './cocinero/cocinero.module';
import { RecetaModule } from './receta/receta.module';
import { PreparacionModule } from './preparacion/preparacion.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/monoliticoSabor'),
    CocineroModule, 
    RecetaModule, 
    PreparacionModule, 
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
