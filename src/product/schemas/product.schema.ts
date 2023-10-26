import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";

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

    @Prop()
    image: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);