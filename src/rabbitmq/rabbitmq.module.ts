import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'RABBITMQ_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [process.env.AMQP_URL],
          queue: 'catalog_queue',
          queueOptions: {
            durable: false
          },
        },
      },
    ]),
  ],
  exports: [ClientsModule],
})
export class RabbitmqModule {}