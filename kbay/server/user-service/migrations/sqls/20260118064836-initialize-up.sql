create table if not exists "users"(
    "user_id" bigserial primary key,
    "phone" varchar not null,
    "email" varchar unique not null,
    "password" varchar not null,
    "salt" varchar not null,
    "user_type" varchar not null,
    "first_name" varchar not null,
    "last_name" varchar not null,
    "profile_pic" text,
    "verification_code" varchar,
    "expiry" timestamp,
    "verified" boolean not null default false,
    "created_at" timestamp not null default now()
);
create index  on "users"("phone");