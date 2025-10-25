import React from 'react'
import { productsList } from './store/ProductList'
import Product from './component/Product'
import "./App.css"
import { useSelector } from 'react-redux'
function App() {
  const proList = useSelector((state) => state.products)
  console.log(proList)
  return (
    <div className='products-container'>
      {
        proList.map(({ id, title, rating, price, image }) =>
          <Product key={id} title={title} rating={rating.rate} price={price} imageUrl={image} />
        )
      }
    </div>
  )
}

export default App