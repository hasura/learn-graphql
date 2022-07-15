CREATE TABLE "public"."admin" ("id" serial NOT NULL, "created_at" timestamptz NOT NULL DEFAULT now(), "updated_at" timestamptz NOT NULL DEFAULT now(), "friend_id" integer NOT NULL, PRIMARY KEY ("id") , FOREIGN KEY ("friend_id") REFERENCES "public"."friend"("id") ON UPDATE restrict ON DELETE cascade, UNIQUE ("id"), UNIQUE ("friend_id"));
CREATE OR REPLACE FUNCTION "public"."set_current_timestamp_updated_at"()
RETURNS TRIGGER AS $$
DECLARE
  _new record;
BEGIN
  _new := NEW;
  _new."updated_at" = NOW();
  RETURN _new;
END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER "set_public_admin_updated_at"
BEFORE UPDATE ON "public"."admin"
FOR EACH ROW
EXECUTE PROCEDURE "public"."set_current_timestamp_updated_at"();
COMMENT ON TRIGGER "set_public_admin_updated_at" ON "public"."admin" 
IS 'trigger to set value of column "updated_at" to current timestamp on row update';
