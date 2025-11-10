// Action Types
const WISHLIST_ADD_ITEM = 'wishList/addItem'
const WISHLIST_REMOVE_ITEM = 'wishList/removeItem'

// Action Creators
export function addWishListItem(productData) {
  console.log(productData,"prod wish")
  return { type: WISHLIST_ADD_ITEM, payload:productData }
}
export function removeWishListItem(productId) {
  return { type: WISHLIST_REMOVE_ITEM, payload: { productId } }
}

// Reducer
export default function wishListReducer(state = [], action) {
  switch (action.type) {
    case WISHLIST_ADD_ITEM:
      console.log(state,"wishlist")
      const wish=state.find((ci)=>ci.productId==action.payload.productId);
      if(wish){
        return state.map((ci)=>{
          if(ci.productId===wish.productId){
            return {...ci,quantity:ci.quantity+1};
          }
          return  ci;
        })
      }
      return [...state, {...action.payload,quantity:1}]

    case WISHLIST_REMOVE_ITEM:
      return state.filter(
        (wishListItem) => wishListItem.productId !== action.payload.productId
      )
    default:
      return state
  }
}