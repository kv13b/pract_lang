import { ProductInput } from "../dto/product-input";
import { products } from "../models/product-model";

export class ProductRepository {
    constructor() { }

    async createProducts({ name, description, category_Id, image_url, price, avliability }:
        ProductInput) {
        return products.create({
            name, description,
            category_Id, image_url, price, avliability:true
        })
    };

    async getAllProducts(offset = 0, pages?: number) { };

    async getProductById(id: string) { };

    async updateProduct({ name, description, category_Id, image_url, price, avliability }:
        ProductInput) { };

    async deleteProduct(id: string) { };
}