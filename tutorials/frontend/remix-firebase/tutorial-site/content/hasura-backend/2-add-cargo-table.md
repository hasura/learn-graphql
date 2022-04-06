---
title: "Add the Cargo Table to Hasura"
metaTitle: "Add the Cargo Table to Hasura | Remix Fullstack GraphQL Tutorial"
metaDescription: "Now we setup the cargo table in our database"
---

1. In the Hasura Console click the Data tab and click `Create Table` under the default database.

2. Table name is `cargo`

3. Click `Frequently used columns` and select the id one with UUID

4. Add four other columns

- launch_id - text
- name - text
- user_id - text
- weight - integer

1. Add the table. You should now be on the modify page of the table.

2. Under configure fields for both launch_id and user_id we need to edit the GraphQL Field Name option to the JavaScript naming convention of camelCase instead of the Postgres naming convention of underscores.

- launch_id -> launchId
- user_id -> userId

1. Click on the permissions table and enter a new role of `user`

1. Keep the insert permissions as disabled, we want to do our own validation on our server before inserting

1. For select permissions we allow with custom check of user_id \_eq `X-Hasura-User-Id`, allow user to access all columns, and allow them to make aggregation queries.

1. For update permissions the pre-update check will be the same as `select` and allow them only to update the `name` column.

1. Finally, for delete allow with the same custom check as `select`

For homework, send an email via Sendgrid whenever a new cargo is added using [Hasura's Data Hub](https://hasura.io/data-hub/rest-connectors-events/sendgrid-email/)
