import { produce } from "immer"
// Action Types
export const CART_ADD_ITEM = 'cart/addItem'
const CART_REMOVE_ITEM = 'cart/removeItem'
const CART_ITEM_INCREASE_QUANTITY = 'cart/increaseItemQuantity'
const CART_ITEM_DECREASE_QUANTITY = 'cart/decreaseItemQuantity'

// Action Creators
export function addCartItem(productData) {
  console.log(productData, "proda")
  return { type: CART_ADD_ITEM, payload: productData }
}

export function removeCartItem(productId) {
  return { type: CART_REMOVE_ITEM, payload: { productId } }
}

export function decreaseCartItemQuantity(productId) {
  return {
    type: CART_ITEM_DECREASE_QUANTITY,
    payload: { productId },
  }
}

export function increaseCartItemQuantity(productId) {
  return {
    type: CART_ITEM_INCREASE_QUANTITY,
    payload: { productId },
  }
}

// Reducer
export default function cartReducer(originalstate = [], action) {
  return produce(originalstate, (state) => {
    const cartItem = state.findIndex((ci) => ci.productId === action.payload.productId)
    switch (action.type) {
      case CART_ADD_ITEM:
        console.log(action.payload, "this is cartitem");
        if (cartItem !== -1) {
          state[cartItem].quantity += 1;
          return state;
        }
        state.push({ ...action.payload, quantity: 1 });
        return state;
      case CART_REMOVE_ITEM:
        state.splice(cartItem, 1);
        return state;
      case CART_ITEM_INCREASE_QUANTITY:
        state[cartItem].quantity += 1;
        return state;
      case CART_ITEM_DECREASE_QUANTITY:
        state[cartItem].quantity -= 1;
        if (state[cartItem].quantity === 0) {
          state.splice(cartItem, 1);
        }
        return state;
      default:
        return state
    }
  })
}