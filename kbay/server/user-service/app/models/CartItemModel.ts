export interface CartItemModel {
    product_id: number;
    name: string;
    image_url: string;
    price: number;
    item_quantity: number;
    item_id?: number;
    cart_id?: number;
}