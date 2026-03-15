import type { APIGatewayProxyEventV2 } from "aws-lambda";
import { errorResponse, successResponse } from "../utility/response";
import { autoInjectable } from "tsyringe";
import { plainToInstance } from "class-transformer";
import { appValidationError } from "../utility/error";
import { VerifyToken } from "../utility/password";
import type { CartRepository } from "../repository/CartRepository";
import { CartInput } from "../models/dto/cartInput";
import type { CartItemModel } from "../models/CartItemModel";
import { cart } from "../handler";
import { PullData } from "../message-queue";

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
      if (!userId) {
        return errorResponse(403, "Invalid user ID in token");
      }

      if (!event.body) {
        return errorResponse(400, "Request body is required");
      }
      const payload =
        typeof event.body === "string" ? JSON.parse(event.body) : event.body;
      const input = plainToInstance(CartInput, payload, {
        excludeExtraneousValues: true,
      });
      let currentCart = await this.repository.findShoppingCart(userId);
      if (
        !currentCart ||
        typeof currentCart !== "object" ||
        !("cart_id" in currentCart)
      ) {
        currentCart = await this.repository.createShoppingCart(userId);
      }
      let currentProduct = await this.repository.findCartItemByProductId(
        input.productId,
      );
      if (currentProduct) {
        await this.repository.updateCartItemByProductId(
          input.productId,
          (currentProduct.item_quantity += input.qty),
        );
      } else {
        const {
          data: { data },
          status,
        } = await PullData({
          action: "get_product_details",
          productId: input.productId,
        });
        console.log("Response from product service:", data, "Status:", status);
        if (status !== 200) {
          return errorResponse(404, "Product not found");
        }
        let cartItem = data.data as CartItemModel;
        if (currentCart) {
          cartItem.cart_id = currentCart.cart_id;
          cartItem.item_quantity = input.qty;
          await this.repository.createCartItem(cartItem);
        }else{
          return errorResponse(404, "Cart not found");
        } 
      }
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
