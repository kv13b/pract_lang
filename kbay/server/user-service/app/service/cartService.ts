import type { APIGatewayProxyEventV2 } from "aws-lambda";
import { errorResponse, successResponse } from "../utility/response";
import type { UserRepository } from "../repository/userRepository";
import { autoInjectable } from "tsyringe";
import { plainToClass, plainToInstance } from "class-transformer";
import { SignUpInput } from "../models/dto/SignUpInput";
import { appValidationError } from "../utility/error";
import { getSalt, GetToken, hashPassword, validatePassword, VerifyToken } from "../utility/password";
import { LoginInput } from "../models/dto/LoginInput";
import { GenerateAccessCode, SendVerification } from "../utility/notification";
import { VerifyInput } from "../models/dto/UpdateInput";
import { TimeDifference } from "../utility/datehelper";
import { ProfileInput } from "../models/dto/AddressInput";

@autoInjectable()
export class CartService {
    repository: UserRepository;
    constructor(repository?: UserRepository) {
        this.repository = repository || new (require('../repository/userRepository').UserRepository)();
    }
    async ResonseWithError(event: APIGatewayProxyEventV2) {
        return errorResponse(404, "request not found");
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
    async DeleteCart(event: APIGatewayProxyEventV2) {
        return successResponse({ message: "Cart deleted successfully!" });
    }
}
