---
title: 'Apply a build'
metaTitle: 'Apply a build | Hasura v3 Tutorial'
metaDescription: 'Learn how to apply a build in Hasura v3.'
---

Applying a build means that it's being promoted to your project's production endpoint. This is a new concept in Hasura
which allows you to quickly iterate — and, if needed, roll back — your project's metadata to all of your users,
worldwide.

## Apply a build

You can apply a build by running the following command:

```bash
hasura3 cloud build apply --project-id <PROJECT_ID> --build-id <BUILD_ID>
```

When you run this command, the selected build will be promoted to production and accessible via your project's endpoint
and is available near-instantly to your users 🚀

If you want to test it out, head to your project's Console, refresh the page, and switch the endpoint to the build you
just applied:

![An applied build on Hasura DDN Console](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/backend-stack/v3/console-applied.png)
