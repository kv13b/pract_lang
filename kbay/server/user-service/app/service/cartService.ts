import type { APIGatewayProxyEventV2 } from "aws-lambda";
import { errorResponse, successResponse } from "../utility/response";
import { autoInjectable } from "tsyringe";
import { plainToInstance } from "class-transformer";
import { appValidationError } from "../utility/error";
import { VerifyToken } from "../utility/password";
import type { CartRepository } from "../repository/CartRepository";
import { CartInput } from "../models/dto/cartInput";

@autoInjectable()
export class CartService {
  repository: CartRepository;
  constructor(repository?: CartRepository) {
    this.repository =
      repository ||
      new (require("../repository/CartRepository").CartRepository)();
  }
  async ResonseWithError(event: APIGatewayProxyEventV2) {
    return errorResponse(404, "request not found");
  }
  //cart related methods
  async CreateCart(event: APIGatewayProxyEventV2) {
    try {
      const authHeader =
        event.headers.authorization || event.headers.Authorization;
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
        typeof event.body === "string" ? JSON.parse(event.body) : event.body;
      const input = plainToInstance(CartInput, payload, {
        excludeExtraneousValues: true,
      });
      const errors = await appValidationError(input);
      if (errors) return errorResponse(404, errors);

      return successResponse({ message: "User profile updated successfully!" });
    } catch (err) {
      return errorResponse(500, err);
    }
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
