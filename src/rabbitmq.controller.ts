import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class RabbitMQController {
  @MessagePattern('catalog_queue')
  async processRabbitMQMessage(message: { action: string, data: any }) {
    // Procesa el mensaje de RabbitMQ según la acción
  }
}