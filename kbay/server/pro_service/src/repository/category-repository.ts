import { CategoryInput } from "../dto/category-input";
import { categories, CategoryDoc } from "../models/category-model";

export class CategoryRepository {
    constructor() { }

    async createCategory({ name, parentId }: CategoryInput) {
        const newCategory = await categories.create({
            name,
            parentId,
            subCategory: [],
            products: []
        });
        if(parentId){
            const parentCategory=(await categories.findById(parentId))as CategoryDoc;
            parentCategory.subCategories=[
                ...parentCategory.subCategories,
                newCategory,
            ];
            await parentCategory.save();
        }
        return newCategory;
    }
}