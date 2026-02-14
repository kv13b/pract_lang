import { APIGatewayEvent } from "aws-lambda";
import { ProductRepository } from "../repository/product-repository";
import { errorResponse, successResponse } from "../utility/response";
import {  plainToInstance } from "class-transformer";
import { ProductInput } from "../dto/product-input";
import { appValidationError } from "../utility/error";

export class ProductService {
    _repository: ProductRepository;
    constructor(repository: ProductRepository) {
        this._repository = repository;
    }
    async createProduct(event: APIGatewayEvent) {
        const input=plainToInstance(ProductInput, JSON.parse(event.body!));
        const error=await appValidationError(input);
        if(error) return errorResponse(404, { message: "validation error", error });
        const data=await this._repository.createProducts(input);
        return successResponse({ message: "product created successfully", data });
    }

    async getSingleProduct(event: APIGatewayEvent) {
        return successResponse({ message: "product fetched successfully" });
    }
    async getProducts(event: APIGatewayEvent) {
        return successResponse({ message: "products fetched successfully" });
    }
    async updateProduct(event: APIGatewayEvent) {
        return successResponse({ message: "product updated successfully" });
    }
    async deleteProduct(event: APIGatewayEvent) {
        return successResponse({ message: "product deleted successfully" });
    }

}