import React, { useEffect } from 'react'
import { data, Link } from 'react-router-dom'
import CartIcon from '../assets/cart-icon.svg'
import Heart from "../assets/heart.svg"
import { useDispatch, useSelector } from 'react-redux'
import "../App.css"
import { fetchProducts, fetchProductsError, updateAllProducts } from '../store/slices/productsReducer'
import { productsList } from '../store/ProductList'

export default function Header() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProducts())
    fetch('https://fakestoreapi.com/products')
      .then((res) => res.json())
      .then((data) => dispatch(updateAllProducts(data)))
      .catch((err) => {
        console.log(err, "Error")
        dispatch(fetchProductsError(err))
      })
  }, [])
  const cartItems = useSelector((state) => state.cartItems.list)
  const wishItem = useSelector((state) => state.wishList);
  console.log(wishItem, "wish");
  return (
    <header>
      <div className="header-contents">
        <h1>
          <Link to="/">Shopee</Link>
        </h1>
        <Link className='cart-icon' to="/wish">
          <img src={Heart} alt="cart-icon" />
          <div className="cart-items-count">
            {wishItem.reduce(
              (accumulator, currentItem) => accumulator + currentItem.quantity,
              0
            )}
          </div>
        </Link>
        <Link className="cart-icon" to="/cart">
          <img src={CartIcon} alt="cart-icon" />
          <div className="cart-items-count">
            {cartItems.reduce(
              (accumulator, currentItem) => accumulator + currentItem.quantity,
              0
            )}
          </div>
        </Link>
      </div>
    </header>
  )
}