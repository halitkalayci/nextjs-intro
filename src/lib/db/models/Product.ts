import mongoose, { Document, Model, Schema } from "mongoose";

export interface IProduct extends Document
{
    name: string;
    price: number;
    description: string;
    stock: number;
}

const ProductSchema: Schema<IProduct> = new Schema(
    {
        name: {type:String,required:true, minlength:2},
        price: {type:Number, required:true, min:0},
        description: {type:String, required:false},
        stock: {type:Number, required:true, min:0}
    },
    {timestamps:true} //TODO: Üzerine konuşulacak
);

export const Product: Model<IProduct> = mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema)