---
title: "Multi-tenant Permissions"
metaTitle: "Multi-tenant Permissions | Hasura GraphQL Advanced Authorization Tutorial"
metaDescription: ""
---

Multi-tenancy is an architecture where a software instance is designed to serve multiple tenants/entities. Typically the requirements of this architecture include security as the priority since data privacy and sharing of data with the right access control is one of the top concerns.

There are challenges in data modeling and how you deal with access credentials. For example, if you are using a PostgreSQL database, 

- You could model the different tenants each having their own database. Credentials are unique and separate.
- You could model the different tenants with same database but in different schemas in Postgres.
- You could model the different tenants with same table(s) but with right access control rules to expose the relevant data.

![Multi-tenancy by database](https://hasura.io/blog/content/images/2021/09/CleanShot-2021-09-08-at-10.12.32@2x.png)

Each has its own operational concerns and security convenience. In this series, we will look at different examples of handling Multi-tenant permissions with Hasura as the GraphQL layer providing Authorization logic built-in.

Some of the examples we will go over:
- Multi-tenancy Authorization via Postgres Dynamic Routing
- Authorization in team based, organization based apps
- Google Drive Style Hierarchical Authorization
- Google Cloud Multi-tenant Authorization
