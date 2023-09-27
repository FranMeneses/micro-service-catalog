import { Test, TestingModule } from "@nestjs/testing"
import { ProductService } from "../product.service"
import { Product } from "../schemas/product.schema"
import { getModelToken } from "@nestjs/mongoose"
import mongoose, { Model } from "mongoose"
import { BadRequestException, NotFoundException } from "@nestjs/common"
import { NotFoundError } from "rxjs"

describe('ProductService', () => {
    let productService: ProductService
    let model: Model<Product>

    const mockProduct = {
        _id: '650f654c4c3e4121ae5788bc',
        name: 'vino gato',
        price: 1200,
        description: 'vino de calidah',
        category: 'vino tinto',
        status: 'PENDING'
    }

    const mockProductService = {
        findById: jest.fn()
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ProductService,
                {
                    provide: getModelToken(Product.name),
                    useValue: mockProductService
                }
            ]
        }).compile();

        productService = module.get<ProductService>(ProductService)
        model = module.get<Model<Product>>(getModelToken(Product.name))
    });

    describe('findById', () => {
        it('should find and return a product by ID', async () => {
            jest.spyOn(model, 'findById').mockResolvedValue(mockProduct)

            const result = await productService.findById(mockProduct._id);

            expect(model.findById).toHaveBeenCalledWith(mockProduct._id)
            expect(result).toEqual(mockProduct);
        });

        it('should throw BadRequestException if invalid ID is provided', async () => {
            const id = 'invalid-id';
            const isValidObjectIdMock = jest.spyOn(mongoose, 'isValidObjectId').mockReturnValue(false);

            await expect(productService.findById(id)).rejects.toThrow(BadRequestException);

            expect(isValidObjectIdMock).toHaveBeenCalledWith(id);
            isValidObjectIdMock.mockRestore();
        });

        it('should throw NotFoundException if product is not found', async () => {
            jest.spyOn(model, 'findById').mockResolvedValue(null)

            await expect(productService.findById(mockProduct._id)).rejects.toThrow(NotFoundException);

            expect(model.findById).toHaveBeenCalledWith(mockProduct._id)
        });
    })
})