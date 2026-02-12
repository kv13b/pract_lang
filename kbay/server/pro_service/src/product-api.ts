import { APIGatewayEvent, APIGatewayProxyResult, Context } from "aws-lambda";
import { errorResponse } from "./utility/response";
import { ProductService } from "./service/product-service";
import { ProductRepository } from "./repository/product-repository";

const service = new ProductService(new ProductRepository());
export const handler = async (event: APIGatewayEvent,
    Context: Context): Promise<APIGatewayProxyResult> => {
    console.log(`Received event: ${JSON.stringify(event)}`);
    console.log(`Context: ${JSON.stringify(Context)}`);

    const isRoot = event.pathParameters === null;
    switch (event.httpMethod.toLowerCase()) {
        case "post":
            if (isRoot) {
                return service.createProduct();
            }
            break;
        case "get":
            isRoot ? service.getProducts() : service.getSingleProduct();
            break;

        case "put":
            if (!isRoot) {
                return service.updateProduct();
            }
            break;
        case "delete":
            if (!isRoot) {
                return service.deleteProduct();
            }
        default:
            break;
    }
    return errorResponse(400, "Unsupported method");
}
