import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { ProductService } from '../product/product.service';

@Controller()
export class RabbitMQController {
  constructor(private readonly productService: ProductService) {}

  @MessagePattern('product')
  async processRabbitMQMessage(message: { action: string, data: any }) {
    return this.productService.processRabbitMQMessage(message);
  }
}