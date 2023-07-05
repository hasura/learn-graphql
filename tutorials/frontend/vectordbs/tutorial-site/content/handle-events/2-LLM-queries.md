---
title: "Handle events | Fullstack VectorDB Tutorial"
metaTitle: "Handle events | Fullstack VectorDB Tutorial"
metaDescription: "A fullstack VectorDB tutorial using Next.js, React, TypeScript, and Hasura"
---

# Hasura's authentication and authorization feature for LLMs

You can also set up LLM queries as an Action on a remote source. This is great because we can define access control for Actions as well, and any data that we query will pass through our data access control we set up earlier.

## Step 1: Write the LLM query
We'll need the code to query for resumes. This can be found in `handlers/query_llm.py`. You'll need the `get_prompt()` function from this file.

Please note: You'll need the `OPENAI_APIKEY` environment variable set when starting `server.py` for this to work!

## Step 2: Define the API
Create a function called `query_llm()` as detailed here. Then, include a route in your Flask server to handle rqeuests to the `/query_llm` endpoint as detailed in handlers/server.py.

## Step 3: Create an Action on the Hasura Console
On the Actions page, click Create and enter the following Action Definition:
```
type Query {
  QueryLLM (user_query: string!): string
}
```
Then, clear out the Type Configuration. Finally, provide the handler via this URL:

`http://host:docker.internal:8400/query_llm`

Step 4: Execute the Action
Now you can use QueryLLM as a type in your GraphQL API 🎉

<authorized_llm_call.png>