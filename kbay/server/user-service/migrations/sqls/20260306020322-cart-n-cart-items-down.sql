ALTER TABLE "cart_items" DROP CONSTRAINT IF EXISTS "cart_items_cart_id_fkey";
ALTER TABLE "shopping_cart" DROP CONSTRAINT IF EXISTS "shopping_cart_User_id_fkey";

DROP TABLE IF EXISTS "cart_items";
DROP TABLE IF EXISTS "shopping_cart";