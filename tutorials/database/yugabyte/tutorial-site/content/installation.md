---
title: "Setup and Installation"
metaTitle: "YugabyteDB Installation and Setup | YugabyteDB Tutorial"
metaDescription:
  "In this section, we will learn how to setup YugabyteDB, learn more about connection string and deploy Hasura on
  Hasura Cloud"
---

In this section, we will learn how to setup YugabyteDB and Hasura on Cloud.

## Provision a YugabyteDB Cloud Cluster

The easiest way to get started with YugabyteDB is by provisioning a free cluster instance:

1. Create or sign in to your Yugabyte Cloud account: https://cloud.yugabyte.com/.
2. Provision a free YugabyteDB cluster:

![](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/database-yugabyte/create-yugabyte-cluster.gif)

- Click the "Create a free cluster" button and select the "Yugabyte Cloud Free" instance type.
- Name the instance as "demo-cluster" and pick a cloud region that is nearest to you.
- Download your credentials for future reference and click Next to create the cluster.

3. While the cluster is being prepared (may take several minutes), feel free to proceed with the next section of this
   tutorial by creating a Hasura backed-as-a-service (BaaS).

## Deploy Hasura BaaS

Next, provision a free GraphQL BaaS using Hasura Cloud:

1. Create or sign in to your [Hasura Cloud](https://cloud.hasura.io?skip_onboarding=true) account.
2. Create a free Hasura project:

![](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/database-yugabyte/deploy-hasura-baas.gif)

3. Click the Create a project button and select the Free Tier option.
4. Name the project as hasura-yugabyte-demo and click Save.

Your GraphQL BaaS is now ready for usage and can be accessed through the endpoint provided in the GraphQL API section of
the project’s settings screen.

![](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/database-yugabyte/hasura-cloud-endpoint.png)
