---
title: 'Create Command Permissions'
metaTitle: 'Create permissions for related tables | Hasura v3 Tutorial'
metaDescription:
  'Here, we cover how to set up permissions for the orders and notifications tables for select operations.'
---

In Hasura, commands are backed by functions or procedures declared in a `DataSource`. This allows you to utilize
user-defined functions (UDFs) or stored procedures (SPs) in your database to perform complex operations and expose them
to your GraphQL API.

## Create a new function

In our database, we'll need to create a new function that will return all orders for a given user. We'll create a
function called `get_orders_by_user_id` that will do this for us:

```sql
CREATE OR REPLACE FUNCTION public.get_order_ids_by_user(input_user_id UUID)
RETURNS SETOF UUID AS
$$
BEGIN
  RETURN QUERY SELECT id FROM orders WHERE user_id = input_user_id;
END;
$$
LANGUAGE plpgsql;
```

You can add this to your database using the `psql` CLI or by using the SQL editor in your hosted database.

We can then import this function into our Hasura metadata automatically by refreshing our data source and then checking
for any new functions. In the command palette, run the `Hasura: Refresh Data Sources` command.

Then, in the `Hasura: Track Function from Data Source` command. You should see the new function added to your metadata
as `kind: Command`:

```yaml
kind: Command
name: get_order_ids_by_user
arguments:
  - name: input_user_id
    type: uuid
outputType: userOrders
source:
  dataSource: default
  function: get_order_ids_by_user
  typeMappings:
    userOrders:
      fieldMappings:
        id:
          column: id
  argumentMappings:
    input_user_id: id
graphql:
  rootFieldName: getOrderByUserId
  rootFieldKind: Query
```

## Create the permission
