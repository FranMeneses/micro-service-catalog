import { IsNotEmpty, IsString, IsNumber, IsEnum, IsOptional } from "class-validator";
import { ProductStatus } from "../schemas/product.schema";

export class UpdateProductDto {
    @IsNotEmpty()
    @IsString()
    @IsOptional()
    name?: string;

    @IsNotEmpty()
    @IsNumber()
    @IsOptional()
    price?: number;

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