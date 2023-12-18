import { Controller } from '@nestjs/common';
import { ProductService } from '../product/product.service';
import { RabbitmqService } from './rabbitmq.service';
import { EventPattern, Payload } from '@nestjs/microservices';

@Controller()
export class RabbitMQController {
    constructor(
        private readonly productService: ProductService,
        private readonly rabbitmqService: RabbitmqService,
    ) {}

    @EventPattern('catalog_queue')
    async processRabbitMQMessage(@Payload() message: { action: string, product?: any }) {
        try {
            const { action, product } = message;
            switch (action) {
                case 'getAll':
                    const allProducts = await this.productService.findAll();
                    await this.rabbitmqService.sendProducts(allProducts);
                    break;
                case 'getById':
                    if (typeof product.id === 'string') {
                        const productById = await this.productService.findById(product.id);
                        await this.rabbitmqService.sendProducts([productById]);
                    }
                    break;
                default:
                    await this.productService.processRabbitMQMessage({ action, product });
                    break;
          }
      } catch (error) {
          console.error('Error processing message in RabbitMQ controller: ', error);
      }
  }
}