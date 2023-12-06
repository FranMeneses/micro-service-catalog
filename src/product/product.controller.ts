import { Controller, Post, Body, ValidationPipe, Put, Get, Delete, Param, Inject } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dtos/create-product.dto';
import { UpdateProductDto } from './dtos/update-product.dto';
import { ClientProxy, Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';

@Controller('product')
export class ProductController {
    constructor(
        private productService: ProductService,
        @Inject('RABBITMQ_SERVICE') private readonly client: ClientProxy,
    ) {}

    @Post()
    async create(@Body(new ValidationPipe()) createProduct: CreateProductDto) {
        const message = { action: 'create', product: createProduct };
        console.log('Emitting message:', message);
        await this.client.emit('catalog_queue', message).toPromise();
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body(new ValidationPipe()) updateProduct: UpdateProductDto) {
        const message = { action: 'update', product: { id, updateProduct } };
        await this.client.emit('catalog_queue', message).toPromise();
    }

    @Get()
    async findAll() {
        return this.productService.findAll();
    }

    @Get(':id')
    async findById(@Param('id') id: string) {
        return this.productService.findById(id);
    }

    @Delete(':id')
    async delete(@Param('id') id: string){
        const message = { action: 'delete', product: id };
        await this.client.emit('catalog_queue', message).toPromise();
    }

    /*
    @EventPattern('catalog_queue')
    async handleProductEvents(@Ctx() context: RmqContext, @Payload() message: { action: string, product: any }) {
        try {
            const { action, product } = message;
            await this.productService.processRabbitMQMessage({ action, product });
            const channel = context.getChannelRef();
            const originalMsg = context.getMessage();
            channel.ack(originalMsg);
        } catch (error) {
            console.error('Error while handling the event in product controller:', error);
        }
    }
    */
}
