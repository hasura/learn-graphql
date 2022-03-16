---
title: "Create a Sample Database"
metaTitle: "Create a sample Yugabtye database | YugabyteDB Tutorial"
metaDescription: "In this section, we will learn how to create a sample Yugabyte database"
---

Up to now, Hasura and YugabyteDB services are running in AWS, but there is no data to experiment with. In this section, we’ll use Yugabyte CloudShell to create a sample database that stores Todos assigned to specific Users. You might already be familiar with this sample database if you’ve ever completed Hasura tutorials designed for PostgreSQL.

Follow the steps below to create the Todos and Users table in YugabyteDB:

1. Open Yugabyte Cloud and Launch the Cloud Shell:

![](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/database-yugabyte/yugabyte-cloud-shell.png)

2. Once in the Shell, create the Users table:

![](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/database-yugabyte/create-table-users.png)

3. Create the Todos table:

![](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/database-yugabyte/create-todos-table.png)

4. Initialize the Users table with two records:

![](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/database-yugabyte/insert-users.png)

5. Execute `SELECT * FROM Users` and confirm the following output:

```bash
 id | name  |         created_at         | last_seen 
----+-------+----------------------------+-----------

  1 | Mark  | 2022-02-02 18:49:45.092247 | 

  2 | Jenny | 2022-02-02 18:49:45.092247 | 

(2 rows)
```
