import mongoose from "mongoose";
type ProductModel = {
    name: string;
    description: string;
    category_Id: string;
    image_url: string;
    price: number;
    avliability: boolean;
}
export type ProductDoc = mongoose.Document & ProductModel & {
    __v?: number;
    _createdAt?: Date;
    _updatedAt?: Date;
};
const productSchema = new mongoose.Schema({
    name: String,
    description: String,
    category_Id: String,
    image_url: String,
    price: Number,
    avliability: Boolean,
},
    {
        toJSON: {
            transform(doc, ret:any, options) {
                delete ret.__v;
                delete ret._createdAt;
                delete ret._updatedAt;
            },
        },
        timestamps: true,
    }
);
const products = mongoose.models.products
    || mongoose.model<ProductDoc>("products", productSchema);

export { products };