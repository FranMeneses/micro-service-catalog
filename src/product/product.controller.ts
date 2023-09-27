import { Controller, Post, Body, ValidationPipe, Put, Get, Delete, Param } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dtos/create-product.dto';
import { UpdateProductDto } from './dtos/update-product.dto';

@Controller('product')
export class ProductController {
    constructor(private productService: ProductService) {}

    @Post()
    async create(@Body(new ValidationPipe()) createProduct: CreateProductDto) {
        return this.productService.create(createProduct);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body(new ValidationPipe()) updateProduct: UpdateProductDto) {
        return this.productService.update(id, updateProduct);
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
        return this.productService.delete(id);
    }
}
