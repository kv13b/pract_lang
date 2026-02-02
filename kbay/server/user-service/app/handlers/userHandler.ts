import type { APIGatewayProxyEventV2 } from "aws-lambda";
import { UserService } from "../service/userService";
import { UserRepository } from "../repository/userRepository";
import { errorResponse } from "../utility/response";
import middy from "@middy/core";
import jsonBodyParser from "@middy/http-json-body-parser";
import { container } from "tsyringe";

container.register("UserRepository", { useClass: UserRepository });
const service = container.resolve(UserService);

const skipJsonParserOnGet = () => ({
    before: async (handler: any) => {
        const method = handler.event?.requestContext?.http?.method;
        if (method === "GET") {
            const headers = handler.event?.headers || {};
            // Remove any Content-Type header so the JSON parser won't reject the request
            for (const key of Object.keys(headers)) {
                if (key.toLowerCase() === "content-type") {
                    delete headers[key];
                }
            }
            handler.event.headers = headers;
            // Helpful debug log
            console.log("Skipped JSON parser for GET; headers now:", handler.event.headers);
        }
    }
});

export const signup = middy((event: APIGatewayProxyEventV2) => {
    console.log("Signup event:", event);
    return service.CreateUser(event);
}).use(jsonBodyParser());

export const login = middy((event: APIGatewayProxyEventV2) => {
    console.log("Login event:", event);
    return service.userLogin(event);
}).use(jsonBodyParser());

export const verify = middy((event: APIGatewayProxyEventV2) => {
    const httpMethod = event.requestContext.http.method;
    if (httpMethod === "POST") {
        return service.VerifyUser(event);
    } else if (httpMethod === "GET") {
        return service.GetVerification(event);
    } else {
        return service.ResonseWithError(event);
    }

}).use({
    before: async (request) => {
        const method = request.event.requestContext.http.method;
        if (method !== "GET") {
            await jsonBodyParser().before!(request);
        }
    }
});

export const profile = middy((event: APIGatewayProxyEventV2) => {
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
}).use({
    before: async (request) => {
        const method = request.event.requestContext.http.method;
        if (method !== "GET") {
            await jsonBodyParser().before!(request);
        }
    }
});

export const cart = middy((event: APIGatewayProxyEventV2) => {
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
}).use(skipJsonParserOnGet()).use(jsonBodyParser());
export const payment = middy((event: APIGatewayProxyEventV2) => {
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
}).use(skipJsonParserOnGet()).use(jsonBodyParser());