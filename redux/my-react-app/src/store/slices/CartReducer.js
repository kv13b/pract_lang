import { createSlice } from "@reduxjs/toolkit"

const findItemIndex = (state, action) => state.findIndex((ci) => ci.productId === action.payload.productId)
const slice = createSlice({
  name: 'cart',
  initialState: [],
  reducers: {
    addCartItem(state, action) {
      const cartItem = findItemIndex(state, action);
      if (cartItem !== -1) {
        state[cartItem].quantity += 1;
      } else {
        state.push({ ...action.payload, quantity: 1 });
      }
    },
    removeCartItem(state, action) {
      const cartItem = findItemIndex(state, action);
      console.log('Removing item at index:', cartItem); // Add log for debugging
      if (cartItem !== -1) {
        state.splice(cartItem, 1);
      }
    },
    increaseCartItemQuantity(state, action) {
      const cartItem = findItemIndex(state, action);
      state[cartItem].quantity += 1;
    }, decreaseCartItemQuantity(state, action) {
      const cartItem = findItemIndex(state, action);
      state[cartItem].quantity -= 1;
      if (state[cartItem].quantity === 0) {
        state.splice(cartItem, 1);
      }
    }

  }
})
console.log(slice, "slice");
export const { addCartItem, removeCartItem, increaseCartItemQuantity, decreaseCartItemQuantity } = slice.actions;
export default slice.reducer;