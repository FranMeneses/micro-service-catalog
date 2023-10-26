import { IsNotEmpty, IsString, IsNumber, IsEnum, IsOptional } from "class-validator";

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

    @IsString()
    @IsOptional()
    image?: string;
}