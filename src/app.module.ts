import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConsumoAguaModule } from './consumo_agua/consumo_agua.module';

@Module({
  imports: [ConsumoAguaModule, MongooseModule.forRoot('mongodb+srv://scheerjoana:12345@cluster0.jetnu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
