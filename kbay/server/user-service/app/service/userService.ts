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
export class UserService {
    repository: UserRepository;
    constructor(repository?: UserRepository) {
        this.repository = repository || new (require('../repository/userRepository').UserRepository)();
    }
    async ResonseWithError(event: APIGatewayProxyEventV2) {
        return errorResponse(404, "request not found");
    }
    async CreateUser(event: APIGatewayProxyEventV2) {
        try {
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
            const salt = await getSalt();
            const hashedPassword = await hashPassword(input.password, salt);
            const data = await this.repository.CreateAccount({
                email: input.email,
                password: hashedPassword,
                phone: input.phone,
                salt: salt,
                userType: "BUYER"
            });
            return successResponse(data as Object);//data
        } catch (err) {
            return errorResponse(500, err);
        }
    }
    async userLogin(event: APIGatewayProxyEventV2) {
        try {
            console.log("CreateUser event body:", event.body);
            if (!event.body) {
                return errorResponse(400, "Request body is required");
            }
            const payload =
                typeof event.body === "string"
                    ? JSON.parse(event.body)
                    : event.body;
            const input = plainToInstance(LoginInput, payload);
            const errors = await appValidationError(input);
            if (errors) return errorResponse(404, errors)
            const data = await this.repository.GetUserByEmail(input.email);
            if (data instanceof Error) {
                return errorResponse(404, data.message);
            }
            const verified = await validatePassword(input.password, data.password);
            if (!verified) {
                return errorResponse(401, "Invalid password");
            }
            const token = GetToken(data);
            return successResponse({ token: token });
        } catch (err) {
            return errorResponse(500, err);
        }
    }
    async GetVerification(event: APIGatewayProxyEventV2) {
        const authHeader =
            event.headers.authorization || event.headers.Authorization;
        if (!authHeader) {
            return {
                statusCode: 401,
                body: JSON.stringify({ message: "Authorization header missing" }),
            };
        }
        console.log(authHeader, "this is the auth header");
        const token = authHeader.replace("Bearer ", "").trim();
        const payload = await VerifyToken(token!);
        if (!payload) {
            return errorResponse(403, "authorization failed");
        }
        console.log("Payload from token:", payload);
        const { code, expiry } = GenerateAccessCode();
        await this.repository.UpdateVerificationCode(payload.user_id!, code, expiry);
        console.log(expiry, code);
        // const response = await SendVerification(code, payload.phone);
        return successResponse({ message: "Verification code sent successfully!" });
    }
    async VerifyUser(event: APIGatewayProxyEventV2) {
        const authHeader =
            event.headers.authorization || event.headers.Authorization;
        if (!authHeader) {
            return {
                statusCode: 401,
                body: JSON.stringify({ message: "Authorization header missing" }),
            };
        }
        const token = authHeader.replace("Bearer ", "").trim();
        const payload = await VerifyToken(token!);
        if (!payload) {
            return errorResponse(403, "authorization failed");
        }
        if (!event.body) {
            return errorResponse(400, "Request body is required");
        }
        const body =
            typeof event.body === "string"
                ? JSON.parse(event.body)
                : event.body;
        const input = plainToInstance(VerifyInput, body);
        console.log(input, "this is the input");
        const errors = await appValidationError(input);
        if (errors) return errorResponse(404, errors);
        const data = await this.repository.GetUserByEmail(payload.email);
        console.log(data, "this is the data of verify user");
        if (data instanceof Error) {
            return errorResponse(404, data.message);
        }
        const { verification_code, expiry } = data;
        console.log(verification_code, input.code, expiry, "this is the data");
        if (verification_code == parseInt(input.code)) {
            const current_time = new Date();
            const diff = TimeDifference(expiry!.toString(), current_time.toISOString(), "m");
            if (diff > 0) {
                await this.repository.UpdateVerifiedUser(data.user_id!);
                console.log("User verified");
            } else {
                return errorResponse(403, "Verification code expired");
            }
        }
        return successResponse({ message: "User verified successfully!" });
    }
    //profile related methods
    async CreateProfile(event: APIGatewayProxyEventV2) {
        try {
            const authHeader = event.headers.authorization || event.headers.Authorization;
            if (!authHeader) {
                return errorResponse(401, "Authorization header missing");
            }
            const token = authHeader.replace("Bearer ", "").trim();
            const tokenPayload = await VerifyToken(token!);
            if (!tokenPayload) {
                return errorResponse(403, "authorization failed");
            }
            const userId = tokenPayload.user_id;

            if (!event.body) {
                return errorResponse(400, "Request body is required");
            }
            const payload =
                typeof event.body === "string"
                    ? JSON.parse(event.body)
                    : event.body;
            const input = plainToInstance(ProfileInput, payload, { excludeExtraneousValues: true });
            const errors = await appValidationError(input);
            if (errors) return errorResponse(404, errors);
            console.log("Payload for creating profile:", payload, "userId:", userId);
            const result = await this.repository.CreateProfile(userId!, input);
            console.log(result, "this is the result of create profile");
            return successResponse({ message: "User profile created successfully!" });
        } catch (err) {
            return errorResponse(500, err);
        }
    }
    async GetProfile(event: APIGatewayProxyEventV2) {
        try {
            const authHeader = event.headers.authorization || event.headers.Authorization;
            if (!authHeader) {
                return errorResponse(401, "Authorization header missing");
            }
            const token = authHeader.replace("Bearer ", "").trim();
            const tokenPayload = await VerifyToken(token!);
            if (!tokenPayload) {
                return errorResponse(403, "authorization failed");
            }
            const userId = tokenPayload.user_id;
            const result = await this.repository.GetProfile(userId!);
            return successResponse({ message: "User profile retrieved successfully!", data: result });
        } catch (err) {
            return errorResponse(500, err);
        }
    }
    async EditProfile(event: APIGatewayProxyEventV2) {
        try {
            const authHeader = event.headers.authorization || event.headers.Authorization;
            if (!authHeader) {
                return errorResponse(401, "Authorization header missing");
            }
            const token = authHeader.replace("Bearer ", "").trim();
            const tokenPayload = await VerifyToken(token!);
            if (!tokenPayload) {
                return errorResponse(403, "authorization failed");
            }
            const userId = tokenPayload.user_id;

            if (!event.body) {
                return errorResponse(400, "Request body is required");
            }
            const payload =
                typeof event.body === "string"
                    ? JSON.parse(event.body)
                    : event.body;
            const input = plainToInstance(ProfileInput, payload, { excludeExtraneousValues: true });
            const errors = await appValidationError(input);
            if (errors) return errorResponse(404, errors);
            console.log("Payload for updating profile:", payload, "userId:", input);
            const result = await this.repository.UpdateProfile(userId!, input);
            console.log(result, "this is the result of update profile");
            return successResponse({ message: "User profile updated successfully!" });
        } catch (err) {
            return errorResponse(500, err);
        }
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
