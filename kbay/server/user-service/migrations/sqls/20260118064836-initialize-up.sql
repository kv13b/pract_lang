CREATE TABLE IF NOT EXISTS "users" (
    "user_id" BIGSERIAL PRIMARY KEY,
    "phone" VARCHAR NOT NULL,
    "email" VARCHAR UNIQUE NOT NULL,
    "password" VARCHAR NOT NULL,
    "salt" VARCHAR,
    "user_type" VARCHAR,
    "first_name" VARCHAR,
    "last_name" VARCHAR,
    "profile_pic" TEXT,
    "verification_code" VARCHAR,
    "expiry" TIMESTAMP,
    "verified" BOOLEAN NOT NULL DEFAULT FALSE,
    "created_at" TIMESTAMP NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS users_phone_idx ON "users" ("phone");
