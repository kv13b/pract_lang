import path from "path";
import { CategoryInput } from "../dto/category-input";
import { categories, CategoryDoc } from "../models/category-model";
import { products } from "../models/product-model";

export class CategoryRepository {
    constructor() { }

    async createCategory({ name, parentId }: CategoryInput) {
        const newCategory = await categories.create({
            name,
            parentId,
            subCategory: [],
            products: []
        });
        if (parentId) {
            const parentCategory = (await categories.findById(parentId)) as CategoryDoc;
            parentCategory.subCategories = [
                ...parentCategory.subCategories,
                newCategory,
            ];
            await parentCategory.save();
        }
        return newCategory;
    }
    async getAllCategories(offset = 0, perpage?: number) {
        return await categories.find({ parentId: null }).populate({
            path: "subCategories",
            model: "Categories",
            populate: {
                path: "subCategories",
                model: "Categories"
            }
        }).skip(offset).limit(perpage ? perpage : 100);
    }
    async getCategoryById(id: string, offset = 0, perpage?: number) {
        return categories.findById(id, {
            products: { $slice: [offset, perpage ? perpage : 100] }
        }).populate({
            path: "subCategories",
            model: "Categories",
        });
    }
    async updateCategory({ id, name, displayOrder }: CategoryInput) {
        const category = await categories.findById(id) as CategoryDoc;
        category.name = name;
        category.displayOrder = displayOrder;
        return category.save();
    }
    async deleteCategory(id: string) {
        return categories.deleteOne({ _id: id });
    }
}