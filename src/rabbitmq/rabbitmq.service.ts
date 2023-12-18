import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class RabbitmqService {
  constructor(
    @Inject('RABBITMQ_SERVICE') private client: ClientProxy,
    @Inject('RABBITMQ_RESPONSE_SERVICE') private responseClient: ClientProxy
  ) {}

  async sendProducts(products: any[]) {
    const queue = 'catalog_response_queue';
    return this.responseClient.send(queue, products).toPromise();
  }
}