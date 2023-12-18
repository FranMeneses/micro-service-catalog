import { Controller } from '@nestjs/common';
import { ProductService } from '../product/product.service';
import { EventPattern, Payload } from '@nestjs/microservices';

@Controller()
export class RabbitMQController {
  constructor(private readonly productService: ProductService) {}

  @EventPattern('catalog_queue')
  async processRabbitMQMessage(@Payload() message: { action: string, product: any }) {
      try {
          const { action, product } = message;
          await this.productService.processRabbitMQMessage({ action, product });
      } catch (error) {
          console.error('Error processing message in RabbitMQ controller: ', error);
      }
  }
}