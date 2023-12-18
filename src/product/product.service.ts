import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Product } from './schemas/product.schema';
import mongoose, { Model } from 'mongoose';
import { CreateProductDto } from './dtos/create-product.dto';
import { UpdateProductDto } from './dtos/update-product.dto';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class ProductService {
    constructor(
        @InjectModel(Product.name) private productModel: Model<Product>,
        @Inject('RABBITMQ_SERVICE') private readonly client: ClientProxy,
    ) {}

    async create(product: CreateProductDto): Promise<Product> {
        const newProduct = await this.productModel.create(product);
        return newProduct;
    }

    async update(id: string, product: UpdateProductDto): Promise<Product> {
        const updatedProduct = await this.productModel.findByIdAndUpdate(id, product, {
            new: true,
        }).exec();
        return updatedProduct;
    }

    async findAll(): Promise<Product[]>{
        const products = await this.productModel.find();
        return products;
    }

    async findById(id: string): Promise<Product> {
        const isValidId = mongoose.isValidObjectId(id);

        if (!isValidId) {
            throw new BadRequestException('Please enter a valid id.');
        }

        const product = await this.productModel.findById(id);

        if (!product) {
            throw new NotFoundException('Product not found.')
        }

        return product;
    }

    async delete(id: string): Promise<Product> {
        const deletedProduct = await this.productModel.findByIdAndDelete(id).exec();
        return deletedProduct;
    }

    async processRabbitMQMessage(message: { action: string, product: any }): Promise<Product> {
        console.log('Received message in product service:', message.action);
        const { action, product } = message;
    
        switch (action) {
            case 'create':
                return this.create(product);
            case 'update':
                return this.update(product.id, product);
            case 'delete':
                return this.delete(product);
            default:
                throw new BadRequestException('Invalid action in RabbitMQ message.');
        }
    }
}
