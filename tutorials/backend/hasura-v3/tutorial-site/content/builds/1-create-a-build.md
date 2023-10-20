---
title: 'Create a build'
metaTitle: 'Create a build | Hasura v3 Tutorial'
metaDescription: 'Learn how to create a build in Hasura v3.'
---

Once you're satisfied with your metadata's state and want to test it out, you can create a build.

## Create a build

To create a build, run the following command from directory containing your metadata file:

```bash
hasura3 cloud build create --project ./hasura.yaml --description "Connect Datasource and track entities"
```

Here, we're telling the CLI to create a build for the project defined in `hasura.yaml` and to use the description
"Connect Datasource and track entities". This description will be visible in the Console and makes it clearer to you and
your team what this build is for.

The CLI will return:

```text
Build ID              <BUILD_ID>
Build Version         <BUILD_VERSION>
Project ID            <PROJECT_ID>
GraphQL API Endpoint  https://<PROJECT_NAME>-<BUILD_VERSION>.ddn.hasura.me/graphql
Console URL           https://console.arusah.com/project/<PROJECT_ID>/graphql
FQDN                  <PROJECT_NAME>-<BUILD_VERSION>.ddn.hasura.me
Environment           default
Description           Connect Datasource and track entities
```

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
