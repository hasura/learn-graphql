CREATE TABLE "public"."cargo" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "launch_id" text NOT NULL, "user_id" text NOT NULL, "name" text NOT NULL, "weight" integer NOT NULL, PRIMARY KEY ("id") );
CREATE EXTENSION IF NOT EXISTS pgcrypto;
