import { ProductInput } from "../dto/product-input";

export class ProductRepository {
    constructor() { }

    async createProducts({ name, description, category_Id, image_url, price, avliability }:
        ProductInput) {
            
    };

    async getAllProducts(offset = 0, pages?: number) { };

    async getProductById(id: string) { };

    async updateProduct({ name, description, category_Id, image_url, price, avliability }:
        ProductInput) { };

    async deleteProduct(id: string) { };
}