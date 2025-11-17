import React from 'react'
import { useSelector } from 'react-redux'
import CartItem from '../component/CartItme'

export default function Cart() {
  const cartItems = useSelector(({ products, cartItems }) => {
    return cartItems.list.map(({ productId, quantity }) => {
      const cartPro = products.list.find((pro) => (pro.id === productId))
      return { ...cartPro, quantity }
    })
  })
  console.log(cartItems, "ci");
  const cart = useSelector((state) => state);
  console.log("cart", cart)
  return (
    <div className="cart-container">
      <h2>Items in Your Cart</h2>
      <div className="cart-items-container">
        <div className="cart-header cart-item-container">
          <div className="cart-item">Item</div>
          <div className="item-price">Price</div>
          <div className="quantity">Quantity</div>
          <div className="total">Total</div>
        </div>
        {cartItems.map(
          ({ id, title, rating, price, image, quantity }) => (
            <CartItem
              key={id}
              productId={id}
              title={title}
              price={price}
              quantity={quantity}
              imageUrl={image}
              rating={rating.rate}
            />
          )
        )}
        <div className="cart-header cart-item-container">
          <div></div>
          <div></div>
          <div></div>
          <div className="total">
            $
            {cartItems.reduce(
              (accumulator, currentItem) =>
                accumulator + currentItem.quantity * currentItem.price,
              0
            )}
          </div>
        </div>
      </div>
    </div>
  )
}