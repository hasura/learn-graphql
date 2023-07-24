---
title: "Simple query"
metaTitle: "Query data | Fullstack VectorDB Tutorial"
metaDescription: "A fullstack VectorDB tutorial using Next.js, React, TypeScript, and Hasura"
---

Now that we have our database set up, tables tracked and remote relationship defined, we are ready to start querying.
This is where we start to see power of the Hasura integration.

Let's say I wanted to access `Resumes` and search over the vectorized `near_text` property. I can do this easily with
Hasura's GraphQL API. Head to the `API` tab and run this query:

```gql
query SimpleQuery {
  Resume(where: { vector: { near_text: "marketing experience" } }) {
    application_id
    content
    vector
  }
}
```

![Simple query](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-vectordb/simple_query_image.png)

You should see a list of results come through as a response on the right-hand side of the explorer. The `near_text`
property is a vectorized field. Vector databases, such as Weaviate, store information as vectors in what are called
embeddings. These embeddings are a mathematical representation of the data. This allows us to perform similarity
searches over the data. In this case, we are searching for resumes that are similar to the phrase "marketing
experience".

Our vector database is literally storing similar information near each other in the database!
