import { ProductRepository } from "../repository/product-repository";
import { successResponse } from "../utility/response";

export class ProductService {
    _repository: ProductRepository;
    constructor(repository: ProductRepository) {
        this._repository = repository;
    }
    async createProduct() {
        return successResponse({ message: "product created successfully" });
    }

    async getSingleProduct() {
        return successResponse({ message: "product fetched successfully" });
    }
    async getProducts() {
        return successResponse({ message: "products fetched successfully" });
    }
    async updateProduct() {
        return successResponse({ message: "product updated successfully" });
    }
    async deleteProduct() {
        return successResponse({ message: "product deleted successfully" });
    }

}