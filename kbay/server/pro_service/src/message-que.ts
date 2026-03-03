import { APIGatewayEvent, APIGatewayProxyResult, Context } from "aws-lambda";
import { errorResponse } from "./utility/response";
import { ProductService } from "./service/product-service";
import { ProductRepository } from "./repository/product-repository";
import "./utility";
import middy from "@middy/core";
import jsonBodyParser from "@middy/http-json-body-parser";

const service = new ProductService(new ProductRepository());
export const handler = middy((event: APIGatewayEvent,
    Context: Context): Promise<APIGatewayProxyResult> => {
    console.log(`Received event: ${JSON.stringify(event)}`);
    console.log(`Context: ${JSON.stringify(Context)}`);
    return service.ResponseWithError("Method not supported", "Unsupported method");
}).use(jsonBodyParser());
