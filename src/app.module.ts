import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { RabbitmqModule } from './rabbitmq/rabbitmq.module';
import * as dotenv from 'dotenv';
import { RabbitMQController } from './rabbitmq/rabbitmq.controller';

dotenv.config();
@Module({
  imports: [MongooseModule.forRoot(process.env.MONGO_URI), ProductModule, RabbitmqModule],
  controllers: [AppController, RabbitMQController],
  providers: [AppService],
})
export class AppModule {}
