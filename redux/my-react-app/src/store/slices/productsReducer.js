import { createSlice } from '@reduxjs/toolkit'
import { productsList } from '../ProductList'
import { Link } from 'react-router-dom';

// export default function productsReducer(state = productsList) {
//   return state
// }
const slice = createSlice({
  name: 'product',
  initialState: {
    loading: false,
    list: [],
    error: ''
  },
  reducers: {
    fetchProducts(state) {
      state.loading = true;
    },
    fetchProductsError(state, action) {
      state.loading = false,
        state.error = action.payload || 'Something went wrong'
    },
    updateAllProducts(state, action) {
      state.loading = false;
      state.list = action.payload;
      state.error = ''
    }
  }
})

export const { updateAllProducts, fetchProducts, fetchProductsError } = slice.actions;
export default slice.reducer;