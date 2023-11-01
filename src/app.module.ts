import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { RabbitMQController } from './rabbitmq.controller';
import * as dotenv from 'dotenv';

dotenv.config();
@Module({
  imports: [MongooseModule.forRoot(process.env.MONGO_URI), ProductModule],
  controllers: [AppController, RabbitMQController],
  providers: [AppService],
})
export class AppModule {}
