---
title: "Connect Weaviate to Hasura"
metaTitle: "Connect Hasura | Fullstack VectorDB Tutorial"
metaDescription: "A fullstack VectorDB tutorial using Next.js, React, TypeScript, and Hasura"
---

With our local data sorted, we now need to connect our Weaviate instance to Hasura. This will allow us to query our
vectorized data.

#### Setup Weaviate agent

Back in the Hasura Console, head to `Data` and add the Weaviate agent as shown in the image.

<!-- TODO: Screenshot setup_weaviate_agent.png -->

#### Let's track our Schema

Under `Data` > `Resumes`, track the Resume table:

<!-- TODO: Screenshot track_resume_schema.png -->

All that's left is to create a remote relationship and we'll be querying our vectorized data in no time!
