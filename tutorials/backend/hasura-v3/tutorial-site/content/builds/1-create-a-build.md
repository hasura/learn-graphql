---
title: 'Create a build'
metaTitle: 'Create a build | Hasura v3 Tutorial'
metaDescription: 'Learn how to create a build in Hasura v3.'
---

Once you're satisfied with your metadata's state and want to test it out, you can create a build.

## Create a build

To create a build, run the following command from directory containing your metadata file:

```bash
hasura3 cloud build create --project-id <PROJECT_ID> --metadata-file metadata.hml
```

If you don't remember your project's ID, you can run `hasura3 cloud project list` to get a list of your projects and
their IDs.

The CLI will return:

- the project ID
- a build ID
- a build Version
- a GraphQL API Endpoint for this build
- the Console URL for your project

## Test your build

Head to the [Console](https://console.hasura.io) URL returned by the CLI. You'll be prompted to log in. Once you're
logged in, you'll be taken to the GraphiQL Explorer, where you can execute queries against your API. Try running the
following:

```graphql
query OrdersQuery {
  orders {
    id
    status
    delivery_date
    user {
      id
      name
      email
    }
    product {
      id
      name
    }
  }
}
```

You should see a response like this:

![A working query in the Hasura DDN Console](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/backend-stack/v3/working-query-console.png)

From here, you can either continue to iterate on your metadata, or apply this build to your project's production
endpoint.
