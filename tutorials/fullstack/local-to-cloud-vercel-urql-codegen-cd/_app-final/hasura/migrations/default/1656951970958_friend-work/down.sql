
alter table "public"."friend" alter column "name" drop not null;
alter table "public"."friend" add column "name" text;

alter table "public"."friend" alter column "password" drop not null;

alter table "public"."friend" alter column "username" drop not null;

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "public"."friend" add column "password" text
--  null;

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "public"."friend" add column "username" text
--  null unique;
