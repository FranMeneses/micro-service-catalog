import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Product } from './schemas/product.schema';
import { Model } from 'mongoose';
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

    async findOne(id: string) {
        return this.productModel.findById(id).exec();
    }

    async delete(id: string){
        return this.productModel.findByIdAndDelete(id).exec();
    }
}
