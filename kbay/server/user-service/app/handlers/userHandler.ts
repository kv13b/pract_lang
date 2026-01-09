import type { APIGatewayProxyEventV2 } from "aws-lambda";
import { UserService } from "../service/userService";
import { UserRepository } from "../repository/userRepository";
import { errorResponse } from "../utility/response";
import  middy from "@middy/core";
import jsonBodyParser from "@middy/http-json-body-parser";
import { container } from "tsyringe";

container.register("UserRepository", { useClass: UserRepository });
const service = container.resolve(UserService);

export const signup = middy((event: APIGatewayProxyEventV2) => {
    console.log("Signup event:", event);
    return service.CreateUser(event);
}).use(jsonBodyParser());

export const login = async (event: APIGatewayProxyEventV2) => {
    console.log("Login event:", event);
    return service.userLogin(event);
};

export const verify = async (event: APIGatewayProxyEventV2) => {
    console.log("Verify event:", event);
    return service.VerifyUser(event);
};

export const profile = async (event: APIGatewayProxyEventV2) => {
    const httpMethod = event.requestContext.http.method;
    if (httpMethod === "POST") {
        return service.CreateProfile(event);
    } else if (httpMethod === "GET") {
        return service.GetProfile(event);
    } else if (httpMethod === "PUT") {
        return service.EditProfile(event);
    } else {
        return errorResponse(404, "Unsupported HTTP method for profile");
    }
};
export const cart = async (event: APIGatewayProxyEventV2) => {
    const httpMethod = event.requestContext.http.method;
    if (httpMethod === "POST") {
        return service.CreateCart(event);
    } else if (httpMethod === "PUT") {
        return service.UpdateCart(event);
    } else if (httpMethod === "GET") {
        return service.GetCart(event);
    } else {
        return errorResponse(404, "Unsupported HTTP method for cart");
    }
};
export const payment = async (event: APIGatewayProxyEventV2) => {
    const httpMethod = event.requestContext.http.method;
    if (httpMethod === "POST") {
        return service.CreatePayment(event);
    } else if (httpMethod === "GET") {
        return service.GetPayment(event);
    } else if (httpMethod === "PUT") {
        return service.UpdatePayment(event);
    } else {
        return errorResponse(404, "Unsupported HTTP method for payment");
    }
};