---
title: "Track tables"
metaTitle: "Connect Hasura | Fullstack VectorDB Tutorial"
metaDescription: "A fullstack VectorDB tutorial using Next.js, React, TypeScript, and Hasura"
---

With our database connected, we need to track the tables we want to query. We'll be tracking two tables, `candidate` and
`application`. Both of these were generated when we ran our Python script. Tracking them will expose them to our GraphQL
API and allow us to query against them.

Simply head to the `Data` tab, select the `HRTool` database, `public` schema, and click the `Track All` button.

![Tracking all tables](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-vectordb/track-all-tables.png)
