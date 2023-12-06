import { Controller } from '@nestjs/common';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { ProductService } from '../product/product.service';

@Controller()
export class RabbitMQController {
  constructor(private readonly productService: ProductService) {}

  @EventPattern('catalog_queue')
  async processRabbitMQMessage(@Ctx() context: RmqContext, @Payload() message: { action: string, product: any }) {
    try {
      const { action, product } = message;
      await this.productService.processRabbitMQMessage({ action, product });
      const channel = context.getChannelRef();
      const originalMsg = context.getMessage();
      channel.ack(originalMsg);
    } catch (error) {
      console.error('Error processing message in RabbitMQ controller: ', error);
    }
  }
}