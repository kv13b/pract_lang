import type { APIGatewayProxyEventV2 } from "aws-lambda";
import { successResponse } from "../utility/response";

export class UserService {
    constructor() { }

    async CreateUser(event: APIGatewayProxyEventV2) {
        return successResponse({ message: "User created successfully!" });
    }
    async userLogin(event: APIGatewayProxyEventV2) {
        return successResponse({ message: "User logged in successfully!" });
    }
    async VerifyUser(event: APIGatewayProxyEventV2) {
        return successResponse({ message: "User verified successfully!" });
    }
}