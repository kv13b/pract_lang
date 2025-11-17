import React from "react";
import { useDispatch } from "react-redux";
import { addCartItem } from "../store/slices/CartReducer";
import { addWishListItem } from "../store/slices/wishListReducer";

export default function Product({productId, title, rating, price, imageUrl }) {
  const dispatch=useDispatch();
    const handleAddToCart = () => {
    console.log("Adding product to cart:", { productId, title, rating, price, imageUrl });
    dispatch(addCartItem({ productId }));
  };
  const handleAddToWishList=()=>{
    dispatch(addWishListItem({ productId, title, rating, price, imageUrl }));
  }
  return (
    <div className="product">
      <div className="product-image">
        <img src={imageUrl} alt={title} />
      </div>
      <div className="title-container">
        <h3>
          <a href="#">{title}</a>
        </h3>
      </div>
      <div className="price-rating-container">
        <p className="rating">{+rating} ★ ★ ★ ★</p>
        <p className="price">${price}</p>
      </div>
      <div className="cta-container">
        <button
        onClick={handleAddToCart}>Add to Cart</button>
        <button onClick={handleAddToWishList}>Add to wishlist</button>
      </div>
    </div>
  );
}
