import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";

export enum ProductStatus{
    PENDING = 'PENDING',
    IN_PROGRESS = 'IN_PROGRESS',
    COMPLETED = 'COMPLETED',
}

@Schema()
export class Product {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    price: number;

    @Prop()
    description: string;

    @Prop()
    category: string;

    @Prop({ default: ProductStatus.PENDING })
    status: ProductStatus;
}

export const ProductSchema = SchemaFactory.createForClass(Product);