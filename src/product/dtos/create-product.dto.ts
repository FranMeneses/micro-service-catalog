import { IsNotEmpty, IsString, IsNumber, IsEnum, IsOptional } from "class-validator";
import { ProductStatus } from "../schemas/product.schema";

export class CreateProductDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsNumber()
    price: number;

    @IsString()
    @IsOptional()
    description?: string;

    @IsString()
    @IsOptional()
    category?: string;

    @IsEnum(ProductStatus)
    @IsOptional()
    status?: ProductStatus;
}