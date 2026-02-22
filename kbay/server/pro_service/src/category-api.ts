import { APIGatewayEvent, APIGatewayProxyResult, Context } from "aws-lambda";
import { errorResponse } from "./utility/response";
import { CategoryService } from "./service/category-service";
import { CategoryRepository } from "./repository/category-repository";
import "./utility";
import middy from "@middy/core";
import jsonBodyParser from "@middy/http-json-body-parser";

const service = new CategoryService(new CategoryRepository());
export const handler = middy((event: APIGatewayEvent,
    Context: Context): Promise<APIGatewayProxyResult> => {
    console.log(`Received event: ${JSON.stringify(event)}`);
    console.log(`Context: ${JSON.stringify(Context)}`);

    const isRoot = event.pathParameters === null;
    switch (event.httpMethod.toLowerCase()) {
        // case "post":
        //     if (isRoot) {
        //         return service.createCategory(event);
        //     }
        //     break;
        // case "get":
        //     if (isRoot) {
        //         return service.getCategories(event);
        //     } else {
        //         return service.getSingleCategory(event);
        //     }

        // case "put":
        //     if (!isRoot) {
        //         return service.updateCategory(event);
        //     }
        //     break;
        // case "delete":
        //     if (!isRoot) {
        //         return service.deleteCategory(event);
        //     }
        // default:
        //     break;
    }
    return service.ResponseWithError("Unsupported method", null);
}).use(jsonBodyParser());
