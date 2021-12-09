---
title: "Regression Testing"
metaTitle: "Regression Testing | Hasura GraphQL Advanced Tutorial"
metaDescription: "Regression tests ensure continued support for operations required by your frontend apps or users"
---

Regression tests ensure continued support for operations required by your frontend apps or users i.e. validating changes to the GraphQL schema (schema integrity) against these operations to ensure that there are no breaking changes or regressions in your GraphQL API.

![Regression Testing with Hasura](https://hasura.io/blog/content/images/2020/02/regression-testing-diagram-2.png)

Your production instance should typically be configured to run regression test suites since changes to the underlying [Postgres schema](https://hasura.io/learn/database/postgresql/core-concepts/1-postgresql-schema/) and/or the Hasura configuration could potentially lead to unwanted regressions in your schema. This is crucial for iterating on new features or removing existing features.

## Create a test suite {#create-test-suite}

On Hasura Cloud console, under the Pro/Monitoring tab, head to `Regresstion Tests` at the end. Select the actions that are typically accessed from the frontend client. In our slack model, we would want to add both users and channel query that we have tried so far. Click on `Add to test suite`. Once this is added, we can now make a schema change to verify if a regression has been caught.

![Create a suite](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura-advanced/regression-test-suite.png)

Open the Hasura Console via the CLI. (`http://localhost:9695`). Now let's make a schema change to the channel table to rename the `name` column to `channel_name`.

Then run the test suite through the `Run Tests` tab. The channel query should now fail.

![Running a regression test suite](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura-advanced/regression-test-run.png)

With the following error `field "name" not found in type: 'channel'`.

This kind of tests ensure that breaking changes are not pushed to production without the relevant updates to the client.

**Note**: We can select the test suite from any other cloud project to run on the current project. This is useful when the test suite configured on production instance works on the staging environment post the schema change.
