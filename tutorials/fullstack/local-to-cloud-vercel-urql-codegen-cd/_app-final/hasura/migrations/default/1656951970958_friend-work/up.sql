
alter table "public"."friend" add column "username" text
 null unique;

alter table "public"."friend" add column "password" text
 null;

alter table "public"."friend" alter column "username" set not null;

alter table "public"."friend" alter column "password" set not null;

alter table "public"."friend" drop column "name" cascade;
