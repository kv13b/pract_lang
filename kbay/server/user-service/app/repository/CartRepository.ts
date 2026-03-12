import type { UserModel } from "../models/UserModel";
import { injectable } from "tsyringe";
import { DBOperations } from "./dbOperations";
import type { ProfileInput } from "../models/dto/AddressInput";
import type { AddressModel } from "../models/AddressModel";
import type { ShoppingCartModel } from "../models/ShoppingCartModel";
@injectable()
export class CartRepository extends DBOperations {
  constructor() {
    super();
  }
  async findShoppingCart(userId: number) {
    const queryString = "SELECT cart_id FROM shopping_cart WHERE user_id = ?";
    const result = await this.executeQurery(queryString, [userId]);
    return result.rowCount != null && result.rowCount > 0
      ? (result.rows[0] as ShoppingCartModel)
      : false;
  }
  async createShoppingCart() {}
  async findCartItemById() {}
  async findCartItemByProductId() {}
  async findCartItems() {}
  async createCartItem() {}
  async updateCartItemById(ItemId: number, qty: number) {}
  async updateCartItemByProductId(productId: number, qty: number) {}
  async deleteCartItemById(ItemId: number) {}
}
