---
title: "Connect Hasura to YugabyteDB"
metaTitle: "Connect Hasura to YugabyteDB | YugabyteDB Tutorial"
metaDescription: "In this section, we will learn how to connect Hasura to YugabyteDB and setup the backend for generating GraphQL APIs"
---

Hasura natively supports and is optimized for PostgreSQL deployments. As long as YugabyteDB is the PostgreSQL-compliant distributed database, you can use a standard PostgreSQL driver to interconnect Hasura with YugabyteDB.

## Add Hasura to YugabateDB White List

Your YugabyteDB cluster instance requires you to specify the IP addresses of applications accessing the database. In this tutorial, your applications will connect to YugabyteDB through Hasura.

Add **Hasura Cloud IP** to the **Allow IP List** on Yugabyte Cloud’s end:

![](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/database-yugabyte/hasura-cloud-ip.gif)

- Copy the Hasura Cloud IP from your Hasura’s project screen.
- Navigate to Yugabyte Cloud’s screen with your demo-cluster.
- Click the Add IP Allow List link and add a record for storing the Hasura Cloud IP.

## Establish Connection 

After granting Hasura access to the YugabyteDB instance, you need to establish a connection between the two services. It involves several steps:

1. Open Yugabyte Cloud and copy a connection URL:

![](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/database-yugabyte/establish-yugabyte-connection.gif)

  - Click the Connect button and select the Connect to your Application option.
  - Check the Optimize for Hasura property.
  - Copy your unique connection URL for YSQL (Yugabyte SQL).
  - Make sure to replace DB USER and DB PASSWORD with the credentials that you downloaded during the Start Free Yugabyte Cluster step.

2. Go back to Hasura Cloud and open Data & Schema Management screen:

![](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/database-yugabyte/hasura-cloud-data-management.gif)

  - Click the Launch Console button.
  - Locate and click the Data & Schema Management icon.

3. Provide YugabyteDB connection parameters and establish a connection:

![](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/database-yugabyte/yugabyte-connection.gif)

  - Database Display Name - a name for your database connection. Set to yugabyte-cloud.
  - Database URL - add the connection URL that you prepared at step 1 above.
  - Click the Connect Database button leaving other parameters unchanged.

Upon a successful connection, you should see a screen similar to the following:

![](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/database-yugabyte/hasura-console-data.png)
