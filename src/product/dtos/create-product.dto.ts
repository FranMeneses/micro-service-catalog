import { IsNotEmpty, IsString, IsNumber, IsEnum, IsOptional } from "class-validator";

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

    @IsString()
    @IsOptional()
    image?: string;
}