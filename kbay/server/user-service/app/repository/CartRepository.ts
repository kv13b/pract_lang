import type { UserModel } from "../models/UserModel";
import { injectable } from "tsyringe";
import { DBOperations } from "./dbOperations";
import type { ProfileInput } from "../models/dto/AddressInput";
import type { AddressModel } from "../models/AddressModel";
import type { ShoppingCartModel } from "../models/ShoppingCartModel";
import type { CartItemModel } from "../models/CartItemModel";
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
  async createShoppingCart(userId: number) {
     const queryString = "INSERT INTO shopping_cart (user_id) VALUES (?) RETURNING cart_id";
    const result = await this.executeQurery(queryString, [userId]);
    return result.rowCount != null && result.rowCount > 0
      ? (result.rows[0] as ShoppingCartModel)
      : false;
  }
  async findCartItemById() {}
  async findCartItemByProductId(productId:string) {
    const queryString="SELECT product_id,name,price,quantity FROM cart_items WHERE product_id = $1"
    const values=[productId]
    const result=await this.executeQurery(queryString,values)
    return result.rowCount != null && result.rowCount > 0
      ? (result.rows[0] as CartItemModel)
      : false;
  }
  async findCartItems() {}
  async createCartItem({cart_id, product_id, name, price, item_quantity,image_url}: CartItemModel) {
    const queryString = "INSERT INTO cart_items (cart_id, product_id, name, price, quantity, image_url) VALUES (?, ?, ?, ?, ?, ?) RETURNING item_id";
    const result = await this.executeQurery(queryString, [cart_id, product_id, name, price, item_quantity, image_url]);
    return result.rowCount != null && result.rowCount > 0
      ? (result.rows[0] as ShoppingCartModel)
      : false;
  }
  async updateCartItemById(ItemId: number, qty: number) {}
  async updateCartItemByProductId(productId: string, qty: number) {
    const queryString = "UPDATE cart_items SET quantity = ? WHERE product_id = ? RETURNING item_id";
    const result = await this.executeQurery(queryString, [qty, productId]);
    return result.rowCount != null && result.rowCount > 0
      ? (result.rows[0] as ShoppingCartModel)
      : false;
  }
  async deleteCartItemById(ItemId: number) {}
}
