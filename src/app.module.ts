import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb+srv://FranciscoMeneses:admin@cluster0.baupo64.mongodb.net/?retryWrites=true&w=majority'), ProductModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
