---
title: "Setup SQL database on Azure SQL"
metaTitle: "Create single SQL database in Azure | MSSQL Tutorial"
metaDescription: "Create a single SQL database in Azure and query the database using Query editor"
---

On this page, you create a single SQL database in Azure and query the database using the query editor in the Azure portal.

Before you begin, make sure to have an active Azure subscription. [Create a free account](https://azure.microsoft.com/free/) in Azure if you do not already have one.

## What is Azure SQL

Azure SQL is a relational database-as-a-service (DBaaS) hosted in Azure.

Azure SQL has major advantages such as:
**Built-in high availability, Hyperscale model, Serverless, Intelligence, data Management, lower administration, shared lower cost, On premises/hybrid cloud, automated performance tuning, automated backup and restore, and automated apply patches**.

Azure SQL provides the following SQL deployment options:

* SQL databases
* SQL managed instances
* SQL virtual machines

![SQL deployment options](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/database-mssql/azure/sql-deployments.png)

We will adapt a single database model to get started with SQL Server concepts.

## Create a single database

1. Log-in to [Azure Portal](https://portal.azure.com/#create/Microsoft.AzureSQL).
1. Select the deployment option as **SQL databases**, select **Single database** from the **Resource type** dropdown, and select **Create**.

Follow the [MS article](https://docs.microsoft.com/en-in/azure/azure-sql/database/single-database-create-quickstart?tabs=azure-portal#create-a-single-database) to set your preferred configurations on Azure.

## Query the database

Once your database is created, you can use the Query editor (preview) in the Azure portal to connect to the database and query the data.

Run the following query in the Query editor on the sample tables:

```SQL
SELECT c.firstName, c.Title, a.CountryRegion
FROM [SalesLT].[Customer] c
JOIN [SalesLT].[Address] a
ON c.CustomerID = a.AddressID
```

![Query Editor](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/database-mssql/azure/query-editor.png)

> Although most of the concepts of SQL Server database explained in the following sections hold good for Azure SQL however; there are a few key differences as explained in the [Azure SQL Limitations](https://hasura.io/learn/database/microsoft-sql-server/azure-sql-limitations/) section.
