import React from 'react'
import { Link } from 'react-router-dom'
import CartIcon from '../assets/cart-icon.svg'
import Heart from "../assets/heart.svg"
import { useSelector } from 'react-redux'
import "../App.css"

export default function Header() {
  const cartItems = useSelector((state) => state.cartItems)
  console.log(cartItems)
  const wishItem=useSelector((state)=>state.wishList);
  console.log(wishItem,"wish");
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