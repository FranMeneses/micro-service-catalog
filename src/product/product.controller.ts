import { Controller, Post, Body, ValidationPipe, Put, Get, Delete, Param, Inject } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dtos/create-product.dto';
import { UpdateProductDto } from './dtos/update-product.dto';
import { ClientProxy } from '@nestjs/microservices';

@Controller('product')
export class ProductController {
    constructor(
        private productService: ProductService,
        @Inject('PRODUCT_SERVICE') private readonly client: ClientProxy,
    ) {}

    @Post()
    async create(@Body(new ValidationPipe()) createProduct: CreateProductDto) {
        const message = { action: 'create', data: createProduct };
        await this.client.emit('product', message).toPromise();
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body(new ValidationPipe()) updateProduct: UpdateProductDto) {
        const message = { action: 'update', data: { id, updateProduct } };
        await this.client.emit('product', message).toPromise();
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
        await this.client.emit('product', message).toPromise();
    }
}
