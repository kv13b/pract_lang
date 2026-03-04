import { APIGatewayEvent } from "aws-lambda";
import { ProductRepository } from "../repository/product-repository";
import { errorResponse, successResponse } from "../utility/response";
import { plainToInstance } from "class-transformer";
import { ProductInput } from "../dto/product-input";
import { appValidationError } from "../utility/error";
import { CategoryRepository } from "../repository/category-repository";
import { ServiceInput } from "../dto/service-input";

export class ProductService {
    _repository: ProductRepository;
    constructor(repository: ProductRepository) {
        this._repository = repository;
    }
    async ResponseWithError(message: string, error: any) {
        return errorResponse(404, { message, error });
    }
    async createProduct(event: APIGatewayEvent) {
        const input = plainToInstance(ProductInput, JSON.parse(event.body!));
        const error = await appValidationError(input);
        if (error) return errorResponse(404, { message: "validation error", error });
        const data = await this._repository.createProducts(input);
        if (data) {
            await new CategoryRepository().addItem({ id: input.category_id, products: [data._id.toString()] });
        }
        return successResponse(data);
    }

    async getSingleProduct(event: APIGatewayEvent) {
        const data = await this._repository.getProductById(event.pathParameters!.id!);
        return successResponse(data);
    }
    async getProducts(event: APIGatewayEvent) {
        const data = await this._repository.getAllProducts();
        return successResponse(data);
    }
    async updateProduct(event: APIGatewayEvent) {
        const ProductId = event.pathParameters!.id!;
        if (!ProductId) return errorResponse(404, { message: "product id is required" });
        const input = plainToInstance(ProductInput, JSON.parse(event.body!));
        const error = await appValidationError(input);
        if (error) return errorResponse(404, { message: "validation error", error });
        input.id = ProductId;
        const data = await this._repository.updateProduct(input);
        return successResponse(data);
    }
    async deleteProduct(event: APIGatewayEvent) {
        const productId = event.pathParameters!.id!;
        if (!productId) return errorResponse(404, { message: "product id is required" });
        const result = await this._repository.deleteProduct(productId);
        if (!result) return errorResponse(404, { message: "product not found" });
        const { category_id, deleteResult } = result;
        await new CategoryRepository().removeItem({ id: category_id, products: [productId] });
        return successResponse(deleteResult);
    }
    async handleQueueOperation(event: APIGatewayEvent) {
        const input = plainToInstance(ServiceInput, event.body!);
        const error = await appValidationError(input);
        if (error) return errorResponse(404, { message: "validation error", error });
        console.log(input,"input")
        const { _id, name, price, image_url } = await this._repository.getProductById(input.productId) as any;
        console.log({ _id, name, price, image_url },"data")
        return successResponse({ product_id: _id, name, price, image_url })
    }
}