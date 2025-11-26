import productsReducer from './slices/productsReducer'
import cartReducer from './slices/CartReducer'
import wishListReducer from './slices/wishListReducer'
import { configureStore } from '@reduxjs/toolkit'
import { apimiddleware } from './api/log'
import { func } from './api/func'

export const store = configureStore({
  reducer: {
    products: productsReducer,
    cartItems: cartReducer,
    wishList: wishListReducer,
  },
  // middleware:[apimiddleware],
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apimiddleware,func),
})