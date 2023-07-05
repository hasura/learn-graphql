---
title: "Simple query"
metaTitle: "Query data | Fullstack VectorDB Tutorial"
metaDescription: "A fullstack VectorDB tutorial using Next.js, React, TypeScript, and Hasura"
---

Now that we have our database set up, tables tracked and remote relationship defined, we are ready to start querying.
This is where we start to see power of the Hasura integration.

Let's say I wanted to access `Resumes`. But, I also need relevant information about `Resume` like the `candidate` and
`application` details. I don't have to make multiple calls. I can make one call to fetch all of the info.

<!-- TODO: Screenshot simple_query_image.png -->

Try pasting this sample GraphQL query for into your GraphiQL explorer on the Hasura Console (just click on the `API`
tab):

```
query MyQuery {
  Resume {
    application_id
    content
    application_relationship {
      hiring_manager
      resume_url
      candidate {
        name
        email
      }
    }
  }
}
```

You should see a list of results come through as a response on the right-hand side of the explorer. In this query, we're
fetching `Resume` data and the `candidate` and `application` details. This is all possible because of the remote
relationship we defined in the previous step.
