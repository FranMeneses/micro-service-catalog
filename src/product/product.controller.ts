import { Controller, Post, Body, ValidationPipe, Put, Get, Delete, Param, Inject } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dtos/create-product.dto';
import { UpdateProductDto } from './dtos/update-product.dto';
import { ClientProxy, EventPattern, Payload } from '@nestjs/microservices';

@Controller('product')
export class ProductController {
    constructor(
        private productService: ProductService,
        @Inject('RABBITMQ_SERVICE') private readonly client: ClientProxy,
    ) {}

    @Post()
    async create(@Body(new ValidationPipe()) createProduct: CreateProductDto) {
        const message = { action: 'create', data: createProduct };
        console.log('Emitting message:', message);
        await this.client.emit('catalog_queue', message).toPromise();
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body(new ValidationPipe()) updateProduct: UpdateProductDto) {
        const message = { action: 'update', data: { id, updateProduct } };
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
        const message = { action: 'delete', data: id };
        await this.client.emit('catalog_queue', message).toPromise();
    }

    @EventPattern('catalog_queue')
    async handleProductEvents(@Payload() message: { action: string, data: any }) {
        try {
            console.log('Received message:', message);
            return this.productService.processRabbitMQMessage(message);
        } catch (error) {
            console.error('Error while handling the event:', error);
        }
    }

    @Get('test-rabbitmq')
    async testRabbitMQ() {
        try {
            // Emitir un mensaje de prueba
            const message = { action: 'test', data: 'This is a test message' };
            await this.client.emit('test_queue', message).toPromise();
            console.log('Test message sent');
        } catch (error) {
            console.error('Error while testing RabbitMQ connection:', error);
        }
    }

    @EventPattern('test_queue')
    async handleTestEvents(@Payload() message: any) {
        try {
            console.log('Received test message:', message);
        } catch (error) {
            console.error('Error while handling the test event:', error);
        }
    }
}
