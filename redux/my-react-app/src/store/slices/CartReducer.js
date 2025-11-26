import { createSelector, createSlice } from "@reduxjs/toolkit"

const findItemIndex = (state, action) => state.findIndex((ci) => ci.productId === action.payload.productId)
const slice = createSlice({
  name: 'cart',
  initialState: {
    loading: false,
    list: [],
    error: ''
  },
  reducers: {
    loadCartItems(state, action) {
      state.list = action.payload.products
    },
    addCartItem(state, action) {
      const cartItem = findItemIndex(state.list, action);
      if (cartItem !== -1) {
        state.list[cartItem].quantity += 1;
      } else {
        state.list.push({ ...action.payload, quantity: 1 });
      }
    },
    removeCartItem(state, action) {
      const cartItem = findItemIndex(state.list, action);
      console.log('Removing item at index:', cartItem); // Add log for debugging
      if (cartItem !== -1) {
        state.list.splice(cartItem, 1);
      }
    },
    increaseCartItemQuantity(state, action) {
      const cartItem = findItemIndex(state.list, action);
      state.list[cartItem].quantity += 1;
    }, decreaseCartItemQuantity(state, action) {
      const cartItem = findItemIndex(state.list, action);
      state.list[cartItem].quantity -= 1;
      if (state.list[cartItem].quantity === 0) {
        state.list.splice(cartItem, 1);
      }
    }

  }
})
console.log(slice, "slice");
export const getCartItems = createSelector(
  [(state) => state.cartItems.list, (state) => state.products.list],
  (cartItems, products) => {
    return cartItems.map(({ productId, quantity }) => {
      const product = products.find((pro) => pro.id === productId);
      return { ...product, quantity };
    });
  }
);
export const { addCartItem, removeCartItem, increaseCartItemQuantity, decreaseCartItemQuantity } = slice.actions;
export default slice.reducer;