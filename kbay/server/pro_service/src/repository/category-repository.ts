import { AddItemInput, CategoryInput } from "../dto/category-input";
import { categories, CategoryDoc } from "../models";

export class CategoryRepository {
    constructor() { }

    async createCategory({ name, parentId ,imageUrl}: CategoryInput) {
        const newCategory = await categories.create({
            name,
            parentId,
            imageUrl,
            subCategories: [],
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
            model: "categories",
            populate: {
                path: "subCategories",
                model: "categories"
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
            model: "products"
        }).sort({ displayOrder:"descending" }).limit(10);
    }
    async getCategoryById(id: string, offset = 0, perpage?: number) {
        return categories.findById(id, {
            products: { $slice: [offset, perpage || 100] },
            subCategories: { $slice: [offset, perpage || 100] }
        }).populate({
            path: "products",
            model: "products"
        }).populate({
            path: "subCategories",
            model: "categories",
        });
    }
    async updateCategory({ id, name, displayOrder, imageUrl }: CategoryInput) {
        const category = await categories.findById(id) as CategoryDoc;
        category.name = name;
        category.displayOrder = displayOrder;
        category.imageUrl = imageUrl;
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