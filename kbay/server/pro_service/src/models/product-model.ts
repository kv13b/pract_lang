import mongoose from "mongoose";
type ProductModel = {
    name: string;
    description: string;
    category_id: string;
    image_url: string;
    price: number;
    availability: boolean;
}
export type ProductDoc = mongoose.Document & ProductModel & {
    __v?: number;
    _createdAt?: Date;
    _updatedAt?: Date;
};
const productSchema = new mongoose.Schema({
    name: String,
    description: String,
    category_id: String,
    image_url: String,
    price: Number,
    availability: Boolean,
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