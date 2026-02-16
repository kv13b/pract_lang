import { ProductInput } from "../dto/product-input";
import { products } from "../models/product-model";

export class ProductRepository {
    constructor() { }

    async createProducts({ name, description, category_id, image_url, price, availability }:
        ProductInput) {
        return products.create({
            name, description,
            category_id, image_url, price, availability
        })
    };

    async getAllProducts(offset = 0, pages?: number) {
        return products.find().skip(offset).limit(pages ? pages : 500);
    };

    async getProductById(id: string) {
        return products.findById(id);
    };

    async updateProduct({ name, description, category_id, image_url, price, availability }:
        ProductInput) {

        let existingProduct = await products.findById(category_id);
        if (!existingProduct) return null;
        existingProduct.name = name;
        existingProduct.description = description;
        existingProduct.category_id = category_id;
        existingProduct.image_url = image_url;
        existingProduct.price = price;
        existingProduct.availability = availability;
        return existingProduct.save();
    };

    async deleteProduct(id: string) { 
        return products.deleteOne({ _id: id });
    };
}