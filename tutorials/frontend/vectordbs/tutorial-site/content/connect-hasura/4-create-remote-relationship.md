---
title: "Create a remote relationship"
metaTitle: "Connect Hasura | Fullstack VectorDB Tutorial"
metaDescription: "A fullstack VectorDB tutorial using Next.js, React, TypeScript, and Hasura"
---

As the name goes, by defining this relationship across databases, you'll be able to join and query the data of these
tables.

We need to define a remote relationship from our vector db to our relational database. Head to the `Data` tab and choose
the `Resume` database and, within that, the `Resume` table. Click on the `Relationships` tab and click
`Add Relationship` to enter the following information:

![Create a remote relationship](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-vectordb/create_rdb_vdb_relationship.png)

All in all, if your Console looks like this — you should be set 🎉

![Final setup](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-vectordb/final_setup_image.png)
