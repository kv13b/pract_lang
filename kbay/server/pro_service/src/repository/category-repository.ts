import path from "path";
import { AddItemInput, CategoryInput } from "../dto/category-input";
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
    async getTopCategories() {
        return categories.find({ parentId: { $ne: null } },
            {
                products: { $slice: 10 }
            }
        ).populate({
            path: "products",
            model: "Products"
        }).sort({ displayOrder:"descending" }).limit(10);
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
    async addItem({ id, products }: AddItemInput) {
        let category = (await categories.findById(id)) as CategoryDoc;
        category.products = [...category.products, ...products];
        return category.save();
    }
    async removeItem({ id, products }: AddItemInput) {
        let category = (await categories.findById(id)) as CategoryDoc;
        const excludeProducts = category.products.filter(
            (item) => !products.includes(item.toString())
        )
        category.products = excludeProducts;
        return category.save();
    }
}