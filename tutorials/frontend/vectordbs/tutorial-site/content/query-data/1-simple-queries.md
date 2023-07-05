---
title: "Query data | Fullstack VectorDB Tutorial"
metaTitle: "Query data | Fullstack VectorDB Tutorial"
metaDescription: "A fullstack VectorDB tutorial using Next.js, React, TypeScript, and Hasura"
---
# Querying based on remote relationship
Now that we have our databased setup, tables tracked and remote relationship defined, we are ready to start querying. This is where we start to see power of Hasura integration.

Let's say I wanted to access Resumes. But, I also need relevant information about Resume like Candidate and Application details. I don't have to make multiple calls. I can make one call to fetch all of the info.

<simple_query_image.png>

Here is a sample GraphQL query for you to give it a try.

```
query MyQuery {
  Resume {
    application_id
    content
    applicaiton_relationship {
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