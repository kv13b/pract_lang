import { combineReducers, createStore } from 'redux'

import productsReducer from './slices/productsReducer'
import cartReducer from './slices/CartReducer'
import wishListReducer from './slices/wishListReducer'

const reducer = combineReducers({
  products: productsReducer,
  cartItems: cartReducer,
  wishList: wishListReducer,
})

export const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__?.()
)