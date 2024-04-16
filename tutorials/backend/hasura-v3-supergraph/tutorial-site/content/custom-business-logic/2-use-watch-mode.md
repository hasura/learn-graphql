---
title: "Use Dev Mode"
metaTitle: "Use Dev Mode | Hasura v3 Supergraph Modeling Tutorial"
metaDescription: "Use dev mode to test your supergraph in real time."
---

## Activate dev mode {#activate-dev-mode}

From the root directory of our project, run the following command to re-activate dev mode:

```bash
ddn dev
```

## Test the connector on Hasura DDN {#test-connector}

You can create the following mutation and test it out in the Console after your build completes:

```graphql
mutation app_ sample_hello {
  hello
}
```

This will return the string "hello world" as expected 🎉

You can also explore your supergraph and see the new `hello` mutation in the Explorer:

![Hello mutation](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/backend-stack/v3/supergraph-course/hello-mutation.png)
