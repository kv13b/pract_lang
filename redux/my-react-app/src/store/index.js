import productsReducer from './slices/productsReducer'
import cartReducer from './slices/CartReducer'
import wishListReducer from './slices/wishListReducer'
import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
  reducer: {
    products: productsReducer,
    cartItems: cartReducer,
    wishList: wishListReducer,
  }
})