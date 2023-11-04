import { Injectable } from '@nestjs/common';
import { ClientProxyFactory, Transport, ClientProxy } from '@nestjs/microservices';
import { CreateProductDto } from '../product/dtos/create-product.dto';

@Injectable()
export class RabbitmqService {
  private client: ClientProxy;

  constructor() {
    this.client = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: [process.env.AMQP_URL],
        queue: 'catalog_queue',
        queueOptions: {
          durable: false
        },
      },
    });
  }

  async sendMessage(createProductDto: CreateProductDto) {
    const pattern = { cmd: 'createProduct' };
    const payload = createProductDto;
    return this.client.send(pattern, payload).toPromise();
  }
}