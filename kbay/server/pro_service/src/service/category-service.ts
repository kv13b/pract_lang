import { CategoryRepository } from "../repository/category-repository";
import { errorResponse, successResponse } from "../utility/response";
import { APIGatewayEvent } from "aws-lambda";
import { plainToInstance } from "class-transformer";
import { ProductInput } from "../dto/product-input";
import { appValidationError } from "../utility/error";
export class CategoryService {
    _repository: CategoryRepository;
    constructor(repository: CategoryRepository) {
        this._repository = repository;
    }
    async ResponseWithError(message: string, error: any) {
        return errorResponse(404, { message, error });
    }
    async createCategory(event: APIGatewayEvent) {
            // const input = plainToInstance(ProductInput, JSON.parse(event.body!));
            // const error = await appValidationError(input);
            // if (error) return errorResponse(404, { message: "validation error", error });
            // const data = await this._repository.createProducts(input);
            // return successResponse(data);
        }
    
        async getSingleCategory(event: APIGatewayEvent) {
            // const data = await this._repository.getCategoryById(event.pathParameters!.id!);
            // return successResponse(data);
        }
        async getCategories(event: APIGatewayEvent) {
            // const data = await this._repository.getAllCategories();
            // return successResponse(data);
        }
        async updateCategory(event: APIGatewayEvent) {
            // const categoryId = event.pathParameters!.id!;
            // if (!categoryId) return errorResponse(404, { message: "category id is required" });
            // const input = plainToInstance(ProductInput, JSON.parse(event.body!));
            // const error = await appValidationError(input);
            // if (error) return errorResponse(404, { message: "validation error", error });
            // input.id = categoryId;
            // const data = await this._repository.updateCategory(input);
            // return successResponse(data);
        }
        async deleteCategory(event: APIGatewayEvent) {
            // const data = await this._repository.deleteCategory(event.pathParameters!.id!);
            // return successResponse(data);
        }
    
}