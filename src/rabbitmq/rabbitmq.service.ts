import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateProductDto } from '../product/dtos/create-product.dto';

@Injectable()
export class RabbitmqService {
  constructor(@Inject('RABBITMQ_SERVICE') private client: ClientProxy) {}

  async sendMessage(createProductDto: CreateProductDto) {
    const pattern = 'catalog_queue';
    const payload = { action: 'create', product: createProductDto };
    return this.client.emit(pattern, payload).toPromise();
  }
}