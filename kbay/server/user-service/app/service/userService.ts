import type { APIGatewayProxyEventV2 } from "aws-lambda";
import { successResponse } from "../utility/response";
import type { UserRepository } from "../repository/userRepository";
import { autoInjectable } from "tsyringe";

@autoInjectable()
export class UserService {
    repository: UserRepository;
    constructor(repository: UserRepository) {
        this.repository = repository;
    }

    async CreateUser(event: APIGatewayProxyEventV2) {
        const body=event.body;
        console.log("CreateUser body:", body);
        await this.repository.createUserOperation();
        return successResponse({ message: "User created successfully!" });
    }
    async userLogin(event: APIGatewayProxyEventV2) {
        return successResponse({ message: "User logged in successfully!" });
    }
    async VerifyUser(event: APIGatewayProxyEventV2) {
        return successResponse({ message: "User verified successfully!" });
    }
    //profile related methods
    async CreateProfile(event: APIGatewayProxyEventV2) {
        return successResponse({ message: "User profile created successfully!" });
    }
    async GetProfile(event: APIGatewayProxyEventV2) {
        return successResponse({ message: "User profile retrieved successfully!" });
    }
    async EditProfile(event: APIGatewayProxyEventV2) {
        return successResponse({ message: "User profile edited successfully!" });
    }
    //cart related methods
    async CreateCart(event: APIGatewayProxyEventV2) {
        return successResponse({ message: "Cart created successfully!" });
    }
    async UpdateCart(event: APIGatewayProxyEventV2) {
        return successResponse({ message: "Cart updated successfully!" });
    }
    async GetCart(event: APIGatewayProxyEventV2) {
        return successResponse({ message: "Cart retrieved successfully!" });
    }
    //payment related methods
    async CreatePayment(event: APIGatewayProxyEventV2) {
        return successResponse({ message: "Payment created successfully!" });
    }
    async GetPayment(event: APIGatewayProxyEventV2) {
        return successResponse({ message: "Payment retrieved successfully!" });
    }
    async UpdatePayment(event: APIGatewayProxyEventV2) {
        return successResponse({ message: "Payment updated successfully!" });
    }
}