alter table "public"."pizza_order"
  add constraint "pizza_order_order_status_fkey"
  foreign key ("order_status")
  references "public"."order_status"
  ("value") on update restrict on delete restrict;
