import type { APIGatewayProxyEventV2 } from "aws-lambda";
import { errorResponse, successResponse } from "../utility/response";
import type { UserRepository } from "../repository/userRepository";
import { autoInjectable } from "tsyringe";
import { plainToClass, plainToInstance } from "class-transformer";
import { SignUpInput } from "../models/dto/SignUpInput";
import { appValidationError } from "../utility/error";
import { getSalt, hashPassword } from "../utility/password";

@autoInjectable()
export class UserService {
    repository: UserRepository;
    constructor(repository: UserRepository) {
        this.repository = repository;
    }

    async CreateUser(event: APIGatewayProxyEventV2) {
        console.log("CreateUser event body:", event.body);
        if (!event.body) {
            return errorResponse(400, "Request body is required");
        }
        const payload =
            typeof event.body === "string"
                ? JSON.parse(event.body)
                : event.body;
        const input = plainToInstance(SignUpInput, payload);
        const errors = await appValidationError(input);
        if (errors) return errorResponse(404, errors)
        const salt=await getSalt();
        const hashedPassword=await hashPassword(input.password, salt);
        const data=await this.repository.CreateAccount({
            email:input.email,
            password:hashedPassword,
            phone:input.phone,
            salt:salt,
            userType:"BUYER"
        });
        return successResponse(input);//data
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