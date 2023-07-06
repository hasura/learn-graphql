---
title: "Connect Weaviate to Hasura"
metaTitle: "Connect Hasura | Fullstack VectorDB Tutorial"
metaDescription: "A fullstack VectorDB tutorial using Next.js, React, TypeScript, and Hasura"
---

With our local data sorted, we now need to connect our Weaviate instance to Hasura. This will allow us to query our
vectorized data.

#### Add the Weaviate agent

Back in the Hasura Console, head to `Data` and click on `Manage` in the left-hand sidebar and then expand
`Data Connector Agents`. Then, add the Weaviate agent as shown in the image:

![Set up Weaviate agent](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-vectordb/weaviate-connection-details.png)

Then, click on `Connect Database` and add your Weaviate instance's connection details:

![Set up Weaviate agent](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-vectordb/vector-db-connect-db-9d1955d0227e35f371fb336ef0f2c38a.png)

You'll need to enter `Resume` for your `Database Name`, your Weaviate `apiKey`, the host of your Weaviate instance
(which is the endpoint without `https`), and the scheme which should be `https`.

#### Track our Schema

Under `Data` > `Resumes`, track the Resume table:

![Track schema](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-vectordb/track_resume_schema.png)

Like before, this will expose the `Resume` table to our GraphQL API. All that's left is to create a remote relationship
and we'll be querying our vectorized data in no time!
