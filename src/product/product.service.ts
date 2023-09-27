import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Product } from './schemas/product.schema';
import mongoose, { Model } from 'mongoose';
import { CreateProductDto } from './dtos/create-product.dto';
import { UpdateProductDto } from './dtos/update-product.dto';

@Injectable()
export class ProductService {
    constructor(@InjectModel(Product.name) private productModel: Model<Product>) { }

    async create(product: CreateProductDto) {
        const createdProduct = new this.productModel(product);
        return createdProduct.save();
    }

    async update(id: string, product: UpdateProductDto) {
        return this.productModel.findByIdAndUpdate(id, product, {
            new: true,
        }).exec();
    }

    async findAll() {
        return this.productModel.find().exec();
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

    async delete(id: string){
        return this.productModel.findByIdAndDelete(id).exec();
    }
}
