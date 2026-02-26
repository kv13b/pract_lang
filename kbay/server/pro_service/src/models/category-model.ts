import mongoose from "mongoose";

type CategoryMode = {
    name: string;
    nameTranslations: string;
    parentId?: string;
    subCategories: string[];
    products: string[];
    displayOrder: number;
    imageUrl: string;
}
export type CategoryDoc = mongoose.Document & CategoryMode & {
    __v?: number;
    _createdAt?: Date;
    _updatedAt?: Date;
};
const categorySchema = new mongoose.Schema({
    name: String,
    nameTranslations: { en: { type: String }, de: { type: String } },
    parentId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "categories",
    }],
    subCategories: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "categories",
    }],
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "products"
    }],
    displayOrder: { type: Number, default: 1},
    imageUrl: String,
},
    {
        toJSON: {
            transform(doc, ret: any, options) {
                delete ret.__v;
                delete ret._createdAt;
                delete ret._updatedAt;
            },
        },
        timestamps: true,
    }
);
const categories = mongoose.models.categories
    || mongoose.model<CategoryDoc>("categories", categorySchema);

export { categories };