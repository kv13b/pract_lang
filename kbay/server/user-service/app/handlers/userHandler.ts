import type { APIGatewayProxyEventV2 } from "aws-lambda";
import { UserService } from "../service/userService";

const service = new UserService();

export const signup = async (event: APIGatewayProxyEventV2) => {
    console.log("Signup event:", event);
    return service.CreateUser(event);
};

export const login = async (event: APIGatewayProxyEventV2) => {
    console.log("Login event:", event);
    return service.userLogin(event);
};

export const verify = async (event: APIGatewayProxyEventV2) => {
    console.log("Verify event:", event);
    return service.VerifyUser(event);
};

export const profile = async (event: APIGatewayProxyEventV2) => {
    console.log("Profile event:", event);
    return {
        statusCode: 200,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": true
        },
        body: JSON.stringify({
            message: "User signed up successfully!"
        })
    };
};
export const cart = async (event: APIGatewayProxyEventV2) => {
    console.log("Cart event:", event);
    return {
        statusCode: 200,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": true
        },
        body: JSON.stringify({
            message: "User signed up successfully!"
        })
    };
};
export const payment = async (event: APIGatewayProxyEventV2) => {
    console.log("Payment event:", event);
    return {
        statusCode: 200,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": true
        },
        body: JSON.stringify({
            message: "User signed up successfully!"
        })
    };
};