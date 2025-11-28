import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import CartIcon from '../assets/cart-icon.svg'
import Heart from "../assets/heart.svg"
import { useDispatch, useSelector } from 'react-redux'
import "../App.css"
import { fetchProducts, fetchProductsError, fetchProItems, updateAllProducts } from '../store/slices/productsReducer'

export default function Header() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({
      type: 'api/makeCall',
      payload: {
        url: 'products',
        onStart: fetchProducts.type,
        onSuccess: updateAllProducts.type,
        onError: fetchProductsError.type
      }
    })
  }, [])
//  dispatch(fetchProItems())
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