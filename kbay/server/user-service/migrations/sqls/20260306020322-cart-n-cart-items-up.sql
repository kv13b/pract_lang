CREATE TABLE "shopping_cart" (
    "Cart_id" bigserial PRIMARY KEY,
    "User_id" bigint NOT NULL,
    "created_at" timestamp with time zone NOT NULL DEFAULT now()
);

CREATE TABLE "cart_items" (
    "item_id" bigserial PRIMARY KEY,
    "cart_id" bigint NOT NULL,
    "product_id" bigint NOT NULL,
    "name" varchar(255) NOT NULL,
    "price" numeric(10, 2) NOT NULL,
    "image_url" varchar(255) NOT NULL,
    "item-qty" integer NOT NULL,
    "created_at" timestamp with time zone NOT NULL DEFAULT now()
);

CREATE INDEX on "cart_items" ("product_id");

ALTER TABLE "cart_items" ADD FOREIGN KEY ("cart_id") REFERENCES "shopping_cart" ("Cart_id") ON DELETE CASCADE;
ALTER TABLE "shopping_cart" ADD FOREIGN KEY ("User_id") REFERENCES "users" ("user_id") ON DELETE CASCADE;