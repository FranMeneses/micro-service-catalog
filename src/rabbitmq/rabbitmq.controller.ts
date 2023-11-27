import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { ProductService } from '../product/product.service';

@Controller()
export class RabbitMQController {
  constructor(private readonly productService: ProductService) {}

  @EventPattern('catalog_queue')
  async processRabbitMQMessage(message: { action: string, data: any }) {
    return this.productService.processRabbitMQMessage(message);
  }
}